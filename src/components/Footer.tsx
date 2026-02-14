import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍊</span>
              <span className="font-display text-xl font-bold">
                Fruit <span className="text-brand-orange">Amruth</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fresh, natural juices crafted with love. Every sip is a burst of
              nature&apos;s finest flavors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-brand-mango mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display font-semibold text-brand-mango mb-4">
              Hours
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Mon - Fri: 7AM - 9PM</li>
              <li>Saturday: 8AM - 10PM</li>
              <li>Sunday: 8AM - 8PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-brand-mango mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>MLA Colony, Banjara Hills</li>
              <li>Hyderabad, TG 560034</li>
              <li>+91 89191 12551</li>
              <li>ArunKumarPilli@fruitamruth.com</li>
              <li>Akshay@fruitamruth.com</li>
              <li>KalyanPilli@fruitamruth.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Fruit Amruth. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            {["Instagram", "Facebook", "Twitter"].map((social) => (
              <span
                key={social}
                className="text-gray-500 hover:text-brand-orange transition-colors text-sm cursor-pointer"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
