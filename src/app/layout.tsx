import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import Layout from "@/components/Layout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Fruit Amruth — Fresh Natural Juices",
    template: "%s | Fruit Amruth",
  },
  description:
    "Discover the freshest, most delicious natural juices at Fruit Amruth. Made with 100% real fruits, no added sugar, no preservatives.",
  keywords: [
    "juice",
    "fresh juice",
    "natural juice",
    "fruit juice",
    "smoothie",
    "healthy drinks",
  ],
  openGraph: {
    title: "Fruit Amruth — Fresh Natural Juices",
    description:
      "Discover the freshest, most delicious natural juices. Made with 100% real fruits.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-white text-brand-dark antialiased">
        <AuthProvider>
          <CartProvider>
            <CheckoutProvider>
              <Layout>{children}</Layout>
            </CheckoutProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
