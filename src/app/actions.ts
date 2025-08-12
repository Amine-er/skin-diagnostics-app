'use server';

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { analyzeSkinFromPhoto } from '@/ai/flows/skin-analyzer';
import { summarizeDiagnostic } from '@/ai/flows/diagnostic-summary';
import type { DiagnosticRecord } from '@/types';

export async function runDiagnostics(
  imageDataUrl: string
): Promise<Omit<DiagnosticRecord, 'id' | 'date'>> {
  try {
    const analysis = await analyzeSkinFromPhoto({
      diagnosticPhotoUrl: imageDataUrl,
    });

    if (!analysis) {
      throw new Error('Skin analysis failed to return results.');
    }

    const summaryResult = await summarizeDiagnostic({
      property1: analysis.property1,
      property2: analysis.property2,
      property3: analysis.property3,
      property4: analysis.property4,
      property5: analysis.property5,
      productRecommendation: analysis.recommendedProductId,
    });

    if (!summaryResult || !summaryResult.summary) {
      throw new Error('Diagnostic summary failed to return a result.');
    }

    const newRecord: Omit<DiagnosticRecord, 'id' | 'date'> & { date: Date } = {
      imageUrl: imageDataUrl,
      results: analysis,
      summary: summaryResult.summary,
      date: new Date(),
    };

    const docRef = await addDoc(collection(db, 'diagnostic_records'), {
      ...newRecord,
      date: Timestamp.fromDate(newRecord.date),
    });

    console.log('Document written with ID: ', docRef.id);

    return {
      imageUrl: imageDataUrl,
      results: newRecord.results,
      summary: newRecord.summary,
    };
  } catch (error) {
    console.error('Error running diagnostics:', error);
    if (error instanceof Error) {
      throw new Error(
        `An error occurred during the diagnostic process: ${error.message}`
      );
    }
    throw new Error('An unknown error occurred during the diagnostic process.');
  }
}

export async function getHistory(): Promise<DiagnosticRecord[]> {
  try {
    const q = query(
      collection(db, 'diagnostic_records'),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const history: DiagnosticRecord[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      history.push({
        id: doc.id,
        ...data,
        date: (data.date as Timestamp).toDate().toISOString(),
      } as DiagnosticRecord);
    });
    return history;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}

export async function deleteDiagnosticRecord(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'diagnostic_records', id));
    console.log('Document with ID deleted:', id);
  } catch (error) {
    console.error('Error deleting document:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete record: ${error.message}`);
    }
    throw new Error('An unknown error occurred while deleting the record.');
  }
}
