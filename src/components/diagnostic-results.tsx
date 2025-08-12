import Image from 'next/image';
import {
  Droplets,
  Activity,
  Sparkles,
  Layers,
  Scaling,
  Barcode,
  FileText,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { DiagnosticRecord } from '@/types';

const propertyDetails = [
  { name: 'Hydration', icon: Droplets, key: 'property1' },
  { name: 'Elasticity', icon: Activity, key: 'property2' },
  { name: 'Clarity', icon: Sparkles, key: 'property3' },
  { name: 'Texture', icon: Layers, key: 'property4' },
  { name: 'Evenness', icon: Scaling, key: 'property5' },
] as const;

type DiagnosticResultsProps = {
  record: Omit<DiagnosticRecord, 'id' | 'date'>;
};

export function DiagnosticResults({ record }: DiagnosticResultsProps) {
  const { imageUrl, results, summary } = record;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-1">
          <Card className="overflow-hidden shadow-lg h-full">
            <CardHeader>
              <CardTitle>Analyzed Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative w-full rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="Analyzed skin"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Diagnostic Scores</CardTitle>
              <CardDescription>
                Your skin analysis results for 5 key properties.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {propertyDetails.map((prop) => (
                <div key={prop.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <prop.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{prop.name}</span>
                    </div>
                    <span className="text-lg font-semibold text-primary">
                      {results[prop.key]}
                    </span>
                  </div>
                  <Progress
                    value={results[prop.key]}
                    className="h-2 bg-accent/20"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <FileText className="w-6 h-6 text-primary" />
                <CardTitle>AI Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{summary}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <Barcode className="w-6 h-6 text-primary" />
                <CardTitle>Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Recommended product barcode:
                </p>
                <p className="text-lg font-mono font-semibold text-primary pt-1">
                  {results.recommendedProductId}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
