export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white p-10">
      <h1 className="text-3xl font-bold">Scroll Animation Lab</h1>
      <p className="mt-2 text-white/70">
        Compare scroll-linked animations across libraries.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <a className="underline" href="/framer">Framer Motion demo</a>
        <a className="underline" href="/gsap">GSAP + ScrollTrigger demo</a>
        <a className="underline" href="/anime">Anime.js demo</a>
      </div>
    </main>
  );
}
