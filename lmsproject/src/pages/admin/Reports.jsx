function Reports() {
  const stats = [
    { label: 'Weekly Enrollments', value: '348', accent: 'bg-orange-500' },
    { label: 'Revenue Growth', value: '18%', accent: 'bg-green-500' },
    { label: 'Active Courses', value: '12', accent: 'bg-yellow-500' },
    { label: 'Completion Rate', value: '82%', accent: 'bg-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-orange-400 font-semibold mb-3">Admin Panel</p>
          <h1 className="text-5xl font-black">Reports & Insights</h1>
          <p className="text-gray-400 mt-2">Track course performance, revenue, and student engagement.</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {stats.map((item) => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400 text-sm mb-4">{item.label}</p>
              <h2 className="text-4xl font-black">{item.value}</h2>
              <div className={`mt-6 h-2 rounded-full ${item.accent}`} />
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-5">Enrollment Trend</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-gray-300">
                <span>Web Development</span>
                <span>128</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-orange-500 w-[65%]" />
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>UI/UX Design</span>
                <span>84</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-green-500 w-[42%]" />
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Data Structures</span>
                <span>64</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-yellow-500 w-[33%]" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-5">Course Ratings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-gray-300">
                <span>React Launchpad</span>
                <span>4.8/5</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>DSA For Placements</span>
                <span>4.6/5</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Frontend System Design</span>
                <span>4.7/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
