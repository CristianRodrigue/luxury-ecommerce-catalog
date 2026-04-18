export default function CheckoutGatewayPlaceholder() {
  return (
    <div className="w-full mt-24 mb-16 border-t border-white/10 pt-16">
      <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">
        Premium Checkout Experience
      </h2>
      <p className="font-sans font-light text-center text-sm text-white/50 mb-12 uppercase tracking-widest">
        Powered by Enterprise Solutions
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto px-6">
        {/* Braintree / PayPal placeholder */}
        <div className="w-full flex-1 border border-white/20 p-8 flex flex-col items-center hover:border-white/50 transition-colors cursor-pointer bg-zinc-900/50 backdrop-blur-sm">
          <div className="h-12 flex items-center justify-center mb-4 text-white/80 font-sans tracking-[0.2em] text-sm uppercase">
            Braintree Vault
          </div>
          <p className="text-center font-sans text-xs text-white/40 leading-relaxed mb-6">
            Secure card processing with native Apple Pay, Google Pay, and PayPal support for frictionless global orders.
          </p>
          <button className="mt-auto font-sans text-xs uppercase bg-white text-black px-8 py-3 tracking-widest hover:bg-gray-200">
            Pay with Braintree
          </button>
        </div>

        {/* Coinbase Commerce placeholder */}
        <div className="w-full flex-1 border border-white/20 p-8 flex flex-col items-center hover:border-white/50 transition-colors cursor-pointer bg-zinc-900/50 backdrop-blur-sm">
          <div className="h-12 flex items-center justify-center mb-4 text-white/80 font-sans tracking-[0.2em] text-sm uppercase">
            Coinbase Commerce
          </div>
          <p className="text-center font-sans text-xs text-white/40 leading-relaxed mb-6">
            Embrace the future. Accept BTC, ETH, and USDC seamlessly on the blockchain with instant settlement.
          </p>
          <button className="mt-auto font-sans text-xs uppercase bg-transparent border border-white text-white px-8 py-3 tracking-widest hover:bg-white hover:text-black transition-colors">
            Pay with Crypto
          </button>
        </div>
      </div>
    </div>
  );
}
