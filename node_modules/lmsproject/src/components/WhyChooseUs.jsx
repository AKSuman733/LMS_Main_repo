const features = [
  {
    id: 1,
    title: "Project Based Learning",
    description:
      "Build real-world projects that strengthen your portfolio.",
  },

  {
    id: 2,
    title: "Industry Focused",
    description:
      "Learn skills companies actually expect from developers.",
  },

  {
    id: 3,
    title: "Lifetime Access",
    description:
      "Watch lessons anytime with unlimited course access.",
  },

  {
    id: 4,
    title: "Structured Roadmaps",
    description:
      "Follow a clear learning path without confusion.",
  },
];

function WhyChooseUs() {
  return (
    <section className="px-8 py-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-orange-400 font-semibold mb-4">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            A Learning Experience Designed For Growth
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-orange-500/40 transition duration-300"
            >

              <div className="h-14 w-14 rounded-2xl bg-brand-yellow/20 flex items-center justify-center text-2xl mb-6">
                ✦
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;