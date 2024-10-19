import SwapPage from "./components/swap-page";

export default function Home() {
  return (
    <div className="relative min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black overflow-hidden">
      {/* Concentric Circles Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 rounded-full border border-white/10"></div>
        <div className="absolute inset-4 rounded-full border border-white/10"></div>
        <div className="absolute inset-8 rounded-full border border-white/10"></div>
        <div className="absolute inset-12 rounded-full border border-white/10"></div>
        <div className="absolute inset-16 rounded-full border border-white/20"></div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10">
        <SwapPage />
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center z-10">
        {/* Footer content here */}
      </footer>
    </div>
  );
}
