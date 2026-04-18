export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 !bg-black !text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-sans font-bold text-2xl tracking-widest uppercase mb-2">P4P</h3>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
            Built for the Grind. Engineered for Combat.
          </p>
        </div>

        <div className="flex space-x-8 font-sans text-[10px] uppercase tracking-[0.2em] text-white/60">
          <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-sans">
          &copy; {new Date().getFullYear()} Pound 4 Pound. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
