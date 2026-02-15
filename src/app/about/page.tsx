import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fruit Amruth — our story, mission, and passion for crafting the freshest natural juices and exotic fruit bowls sourced globally.",
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
            Fruit Amruth brings the world’s <span className="font-bold">rarest and healthiest fruits</span> to your glass and bowl, blending <span className="font-bold">locally sourced seasonal produce</span> with <span className="font-bold">premium imported fruits</span> for maximum nutrition and flavor.
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
                From Global Farms to Your Table
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, Fruit Amruth is dedicated to delivering <span className="font-bold">fresh, nutrient-rich juices and Fruit Bowl Luxe creations</span>. We combine the best seasonal fruits from local farms in Karnataka and Kerala with ultra-exotic imported varieties from <span className="font-bold">Thailand (Rambutan, Mangosteen)</span>, <span className="font-bold">Japan (Yuzu, White Peach)</span>, <span className="font-bold">Costa Rica (Golden Passion Fruit)</span>, <span className="font-bold">New Zealand (Feijoa)</span>, and <span className="font-bold">South Africa (Kiwano Horned Melon)</span>.
                </p>
                <p>
                  Every morning, our team hand-selects the ripest and most vibrant fruits to ensure <span className="font-bold">optimal nutrition, flavor, and freshness</span>. We believe nature provides the ultimate health benefits, and our mission is to bring them directly to your glass and bowl, <span className="font-bold">pure and unaltered</span>.
                </p>
                <p>
                  The word &quot;Amruth&quot; means nectar — the divine elixir of life. Our offerings are crafted to <span className="font-bold">nourish your body, boost immunity, and support a healthy lifestyle</span>, while celebrating the richness of both local and international fruits.
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
                desc: "100% natural ingredients sourced from local farms and trusted international orchards — <span className='font-bold'>no concentrates, artificial flavors, or preservatives</span>.",
              },
              {
                icon: "🤝",
                title: "Global & Local Partnerships",
                desc: "We collaborate with <span className='font-bold'>local farmers and international suppliers</span> to bring the highest quality and rarest fruits to your table.",
              },
              {
                icon: "♻️",
                title: "Sustainability",
                desc: "<span className='font-bold'>Eco-friendly packaging and zero-waste practices</span>, minimizing environmental impact throughout our supply chain.",
              },
              {
                icon: "✨",
                title: "Health & Quality",
                desc: "Every juice and fruit bowl is crafted to preserve <span className='font-bold'>nutrients, vitamins, and antioxidants</span> for optimal well-being.",
              },
              {
                icon: "💡",
                title: "Innovation",
                desc: "Blending <span className='font-bold'>exotic international fruits</span> with seasonal local produce to create unique, nutrient-rich combinations.",
              },
              {
                icon: "🎯",
                title: "Transparency",
                desc: "Every ingredient is listed. What you see is what you get — <span className='font-bold'>wholesome, natural, and pure</span>.",
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
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: value.desc }}
                />
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
              { name: "Akshay", role: "Founder", emoji: "👨‍💼" },
              { name: "Kalyan Pilli", role: "CTO", emoji: "👨‍💼" },
              { name: "Arun Kumar Pilli", role: "Operations Lead & Co founder", emoji: "👨‍🍳" },
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
