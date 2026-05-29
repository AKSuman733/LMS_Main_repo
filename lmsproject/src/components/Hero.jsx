function Hero() {
  return (
    <section className="px-8 py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side */}
        <div>
          <p className="text-orange-400 font-semibold mb-4">
            Learn Modern Skills Faster
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Build Skills.
            <br />
            Build Projects.
            <br />
            Build Your Career.
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-xl">
            Master development and placement-ready skills with premium
            courses designed for real-world success.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="bg-orange-600 hover:bg-orange-500 transition px-8 py-4 rounded-2xl font-bold">
              Explore Courses
            </button>

            <button className="border border-white/10 hover:border-white/30 transition px-8 py-4 rounded-2xl">
              Watch Preview
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            alt="hero"
            className="rounded-3xl shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;