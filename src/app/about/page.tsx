import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fruit Amruth — our story, mission, and passion for crafting the freshest natural juices.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-cream to-orange-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-green/10 text-brand-green font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Our Story
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
            About Fruit Amruth
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Born from a love for fresh fruits and healthy living, we&apos;re on
            a mission to make natural juices accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full aspect-square bg-gradient-to-br from-brand-orange/20 to-brand-mango/20 rounded-3xl flex items-center justify-center">
                <span className="text-[140px]">🧑‍🌾</span>
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-brand-dark mb-6">
                From Farm to Glass
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fruit Amruth started in 2020 with a simple idea: everyone
                  deserves access to truly fresh, natural juice. No concentrates,
                  no added sugar, no compromises.
                </p>
                <p>
                  We partner directly with local farmers across Karnataka and
                  Kerala to source the freshest seasonal fruits. Every morning,
                  our team hand-selects the ripest produce to craft our juices.
                </p>
                <p>
                  The word &quot;Amruth&quot; means nectar — the divine elixir
                  of life. We believe that nature provides the best flavors, and
                  our job is simply to bring them to your glass, unaltered and
                  pure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark text-center mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Purity",
                desc: "100% natural ingredients. We never use concentrates, artificial flavors, or preservatives.",
              },
              {
                icon: "🤝",
                title: "Community",
                desc: "We support local farmers and believe in building strong, sustainable relationships.",
              },
              {
                icon: "♻️",
                title: "Sustainability",
                desc: "Eco-friendly packaging, zero-waste practices, and a commitment to reducing our carbon footprint.",
              },
              {
                icon: "✨",
                title: "Quality",
                desc: "Every juice undergoes rigorous quality checks. We never serve anything we wouldn't drink ourselves.",
              },
              {
                icon: "💡",
                title: "Innovation",
                desc: "We constantly experiment with new flavor combinations and health-boosting ingredients.",
              },
              {
                icon: "🎯",
                title: "Transparency",
                desc: "We list every ingredient. What you see is what you get — nothing hidden, nothing artificial.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-4xl block mb-4">{value.icon}</span>
                <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-12">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { name: "Arjun Menon", role: "Founder & CEO", emoji: "👨‍💼" },
              { name: "Priya Sharma", role: "Head of R&D", emoji: "👩‍🔬" },
              { name: "Karthik Raj", role: "Operations Lead", emoji: "👨‍🍳" },
            ].map((person) => (
              <div key={person.name} className="group">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-orange/20 to-brand-mango/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-5xl">{person.emoji}</span>
                </div>
                <h3 className="font-display font-bold text-brand-dark">
                  {person.name}
                </h3>
                <p className="text-gray-500 text-sm">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
