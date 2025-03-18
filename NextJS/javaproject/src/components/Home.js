"use client"

const Home = () => {
  return (
    <section className="bg-green-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 md:mb-8">
          Hello, What Do You Want To Learn?
        </h1>
        <div className="max-w-3xl mx-auto mb-6 md:mb-8">
          <div className="relative">
            <input
              className="w-full h-12 md:h-14 p-4 pl-5 pr-12 border border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              type="text"
              placeholder="Data science"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition-colors">
            Master DS & ML
          </button>
          <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            Courses @90% Refund
          </button>
          <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition-colors">
            Full Stack Live Classes
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 md:mt-12 px-4 md:px-0 gap-4">
          <p className="text-xl md:text-2xl font-bold">Courses</p>
          <button className="border border-gray-300 rounded-lg text-sm px-4 py-2 hover:bg-gray-100 w-full sm:w-auto">
            View All
          </button>
        </div>
      </div>
    </section>
  )
}

export default Home

