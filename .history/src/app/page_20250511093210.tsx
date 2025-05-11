import BreadcrumbHeader from './components/breadcrumbHeader';
import SkipSelector from './components/SkipSelector';
import BottomBar from './components/BottomBar';

export default function SkipPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-24">
      <BreadcrumbHeader />
      <main className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold px-4 pt-6 pb-2">Choose your skip size</h1>
        <p className="text-zinc-400 px-4 mb-4 text-sm">
          Select the size that best suits your needs. Prices include VAT.
        </p>
        <SkipSelector />
      </main>
      <BottomBar />
    </div>
  );
}
