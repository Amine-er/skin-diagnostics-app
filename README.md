# SkinDeep Insights

SkinDeep Insights is an advanced, AI-powered web application designed to provide users with a comprehensive analysis of their skin health. By uploading a photo, users receive detailed diagnostic scores across five key metrics, an AI-generated summary, and a tailored product recommendation. The application is built using a modern tech stack including Next.js, Firebase, and Google's Genkit for its powerful AI capabilities.

## Features

- **AI-Powered Skin Analysis**: Leverages generative AI to analyze user-submitted photos for skin health evaluation.
- **Detailed Diagnostics**: Provides scores (1-100) for five key skin properties: Hydration, Elasticity, Clarity, Texture, and Evenness.
- **Personalized Recommendations**: Suggests a product based on the analysis results.
- **AI-Generated Summaries**: Offers a concise, easy-to-understand summary of the diagnostic results.
- **Persistent History**: Saves all past diagnostic records to Firestore, allowing users to track their skin health over time.
- **Modern UI**: A clean, responsive, and intuitive user interface built with ShadCN UI and Tailwind CSS.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI/ML**: [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Deployment**: Firebase App Hosting

## Project Structure

The project follows a standard Next.js App Router structure, with a clear separation of concerns.

```
.
├── src
│   ├── app
│   │   ├── actions.ts       # Server Actions for backend logic (diagnostics, history)
│   │   ├── globals.css      # Global styles and Tailwind CSS configuration
│   │   ├── layout.tsx       # Root application layout
│   │   └── page.tsx         # The main page component for the application
│   │
│   ├── ai
│   │   ├── flows
│   │   │   ├── diagnostic-summary.ts
│   │   │   ├── product-recommendation.ts
│   │   │   └── skin-analyzer.ts  # Genkit flows for AI interactions
│   │   ├── dev.ts             # Genkit development server entry point
│   │   └── genkit.ts          # Genkit global configuration
│   │
│   ├── components
│   │   ├── ui/                # Reusable UI components from ShadCN
│   │   ├── diagnostic-history.tsx
│   │   ├── diagnostic-results.tsx
│   │   ├── icons.tsx
│   │   └── photo-uploader.tsx
│   │
│   ├── hooks
│   │   ├── use-mobile.ts      # Custom hook for detecting mobile devices
│   │   └── use-toast.ts       # Custom hook for managing toast notifications
│   │
│   ├── lib
│   │   ├── firebase.ts      # Firebase SDK initialization and configuration
│   │   └── utils.ts         # Utility functions (e.g., `cn` for class names)
│   │
│   └── types
│       └── index.ts         # Core TypeScript type definitions for the project
│
├── .env.example             # Example environment variables file
├── next.config.ts           # Next.js configuration
├── package.json
└── tailwind.config.ts       # Tailwind CSS configuration
```

## Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- `npm`, `pnpm`, or `yarn`

### Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Amine-er/skin-diagnostics-app
    cd skin-diagnostics-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a `.env` file in the root of your project by copying the `.env.example` file.
    - You will need to create a Firebase project and get the configuration details to populate this file. See the **Firebase Setup** section below.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

### Firebase Setup

This project uses **Firebase Firestore** to store diagnostic history.

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Create a Web App**: Inside your project, create a new Web App to get your `firebaseConfig` credentials.
3.  **Enable Firestore**: In the "Build" section of the console, enable **Firestore Database**. Start it in **test mode** for initial development.
4.  **Configure Security Rules**: Navigate to the **Rules** tab in Firestore and set them up to allow reads, creates, and deletes for the `diagnostic_records` collection.
5.  **Populate `.env`**: Add your Firebase app configuration details to your `.env` file. Your API key should be kept secure.

### Genkit AI Flows

The AI functionality is managed by Genkit flows located in `src/ai/flows/`.

-   `skin-analyzer.ts`: Takes a photo Data URL and returns scores for the five key skin properties.
-   `product-recommendation.ts`: Recommends a product based on the diagnostic scores.
-   `diagnostic-summary.ts`: Creates a concise summary of the results.

To run the Genkit development server for testing or inspecting flows, use:
```bash
npm run genkit:dev
```
## Firestore Schema

The application uses a single Firestore collection to store all diagnostic records.

### `diagnostic_records`

This collection stores each analysis performed by a user. Each document represents a single diagnostic report, with the Document ID being auto-generated by Firestore.

**Collection:** `diagnostic_records`

**Document ID:** `auto-generated`

| Field      | Type   | Description                                                                                                    |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `date`       | `Timestamp` | The server-side timestamp when the diagnostic record was created. Used for sorting the history chronologically. |
| `imageUrl`   | `string`    | The Data URL of the user-submitted photo. Stored as a base64 encoded string.                                 |
| `results`    | `map`       | An object containing the raw scores and recommendation from the AI analysis.                                   |
| ↳`property1` | `number`    | Score for skin property 1 (1-100).                                                                              |
| ↳`property2` | `number`    | Score for skin property 2 (1-100).                                                                              |
| ↳`property3` | `number`    | Score for skin property 3 (1-100).                                                                              |
| ↳`property4` | `number`    | Score for skin property 4 (1-100).                                                                              |
| ↳`property5` | `number`    | Score for skin property 5 (1-100).                                                                              |
| ↳`recommendedProductId` | `string` | The barcode of the product recommended by the AI.                                                 |
| `summary`    | `string`    | A short, AI-generated text summary of the overall diagnostic results.                                      |
