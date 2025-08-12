import { Logo } from '@/components/icons';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                SkinDeep Insights
              </h1>
            </div>
            New Analysis
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-start">
          <div className="lg:col-span-2 bg-card p-8 rounded-xl shadow-sm min-h-[600px] flex items-center justify-center">
            <div className="w-full max-w-lg">
              <h2 className="text-2xl font-bold text-center mb-1">
                Start Your Skin Analysis
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Upload a clear, well-lit photo of your skin.
              </p>
            </div>
          </div>
          <div className="lg:col-span-1 h-full lg:sticky top-24"></div>
        </div>
      </main>
    </div>
  );
}
