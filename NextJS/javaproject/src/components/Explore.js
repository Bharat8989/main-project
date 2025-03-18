"use client"

const Explore = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Must Explore Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">Must Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {["Jobs for you", "Hire with us", "Advertise with Us", "Placement Training"].map((title) => (
            <div
              key={title}
              className="bg-purple-400 rounded-lg p-6 flex justify-between items-center shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
              <a
                href="#"
                className="text-white text-2xl rounded-full hover:bg-white hover:text-black w-10 h-10 flex items-center justify-center transition-colors"
              >
                →
              </a>
            </div>
          ))}
        </div>

        {/* Explore Categories */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 my-12 text-center">Explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Data Structure and Algorithm", bg: "rgb(76, 181, 155)" },
            { title: "Practice DSA", bg: "rgb(97, 101, 199)" },
            { title: "Web Development", bg: "rgb(186, 111, 110)" },
            { title: "AI ML & Data Science", bg: "rgb(129, 104, 171)" },
            { title: "System Design", bg: "rgb(217, 137, 87)" },
            { title: "DevOps", bg: "rgb(237, 114, 134)" },
          ].map((category, index) => (
            <div
              key={index}
              className="rounded-lg h-60 flex flex-col items-center justify-center p-4"
              style={{ backgroundColor: category.bg }}
            >
              <h3 className="text-white mb-4 text-xl md:text-2xl text-center">{category.title}</h3>
              <button className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-gray-800 transition-colors">
                View more <span className="font-bold">→</span>
              </button>
            </div>
          ))}
        </div>

        {/* Detailed Sections */}
        {[
          {
            title: "Web Development",
            bg: "rgb(83, 134, 189)",
            items: [
              "JavaScript",
              "HTML",
              "CSS",
              "ReactJS",
              "Node.js",
              "Django",
              "Frontend Development",
              "Backend Development",
            ],
          },
          {
            title: "AI ML & Data Science",
            bg: "rgb(174, 132, 209)",
            items: [
              "Machine Learning",
              "Data Science",
              "Data Analysis",
              "Data Visualization",
              "Deep Learning",
              "Natural Language",
              "Computer Vision",
              "Artificial Intelligence",
            ],
          },
          {
            title: "Programming Languages",
            bg: "rgb(214, 160, 90)",
            items: ["Python", "Java", "C++", "C", "R", "PHP", "Flutter", "Golang"],
          },
          {
            title: "DevOps",
            bg: "rgb(160, 184, 132)",
            items: [
              "GIT",
              "Amazon Web Services",
              "Kubernetes",
              "Docker",
              "Software Testing",
              "Product Management",
              "Project Management",
              "Excel",
            ],
          },
        ].map((section) => (
          <div key={section.title} className="my-12">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{section.title}</h3>
              <button className="border border-gray-300 rounded-lg text-sm px-4 py-2 hover:bg-gray-100">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {section.items.map((item) => (
                <div
                  key={item}
                  className="rounded-lg p-6 flex justify-between items-center shadow-md hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: section.bg }}
                >
                  <h4 className="text-lg md:text-xl font-semibold text-white">{item}</h4>
                  <a
                    href="#"
                    className="text-white text-2xl rounded-full hover:bg-white hover:text-black w-10 h-10 flex items-center justify-center transition-colors"
                  >
                    →
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Explore

