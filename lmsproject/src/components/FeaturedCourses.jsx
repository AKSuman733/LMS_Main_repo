import { courses } from "../pages/user/courses.jsx";

function FeaturedCourses() {
  return (
    <section className="px-8 py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-14">
          <p className="text-orange-400 font-semibold mb-4">
            Featured Courses
          </p>

          <h2 className="text-4xl md:text-5xl font-black">
            Learn High Income Skills
          </h2>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 hover:border-orange-500/40 transition duration-300"
            >
              
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-60 w-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">
                  {course.title}
                </h3>

                <p className="text-gray-400 mb-6">
                  Instructor: {course.instructor}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-black">
                    {course.price}
                  </p>

                  <button className="bg-brand-green hover:bg-brand-green/90 transition px-5 py-3 rounded-xl">
                    Enroll
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default FeaturedCourses;