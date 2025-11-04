import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  Truck,
  Shield,
  Headphones,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Shop: ["New Arrivals", "Best Sellers", "Sale", "Gift Cards"],
    Categories: ["Electronics", "Fashion", "Home", "Beauty", "Sports"],
    Support: ["Help Center", "Track Order", "Shipping Info", "Returns"],
    Company: ["About Us", "Careers", "Press", "Sustainability"],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Features */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Truck size={32} className="text-indigo-500 mb-2" />
            <p className="font-semibold">Free Shipping</p>
            <p className="text-sm">On orders over $50</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield size={32} className="text-indigo-500 mb-2" />
            <p className="font-semibold">Secure Payment</p>
            <p className="text-sm">100% safe transactions</p>
          </div>
          <div className="flex flex-col items-center">
            <CreditCard size={32} className="text-indigo-500 mb-2" />
            <p className="font-semibold">Easy Returns</p>
            <p className="text-sm">30-day return policy</p>
          </div>
          <div className="flex flex-col items-center">
            <Headphones size={32} className="text-indigo-500 mb-2" />
            <p className="font-semibold">24/7 Support</p>
            <p className="text-sm">Dedicated team</p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">ShopFlow</h2>
            <p className="text-sm leading-relaxed">
              Your one-stop shop for everything awesome. Quality products, fast
              delivery, happy customers.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-indigo-400 transition"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {year} ShopFlow. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
