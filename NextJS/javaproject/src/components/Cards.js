"use client"
import Image from "next/image"

const courses = [
  {
    title: "DSA to Development: A Complete Guide",
    image:
      "https://media.geeksforgeeks.org/img-practice/prod/courses/504/Web/Content/Course_DSA_to_Dev_1720846081_1736594558.webp",
    rating: 4.4,
    interested: "488k+ interested Geeks",
    link: "https://nufaisahamed.github.io/portfolio2/",
  },
  // ... other courses remain the same
]

const Cards = () => {
  return (
    <section className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 transition-transform hover:scale-105">
            <figure className="relative">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                width={320}
                height={200}
                className="rounded-md object-cover w-full h-48"
              />
              <div className="absolute top-2 right-2 flex items-center px-2 py-1 rounded-full bg-gray-800">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium text-white ml-1">{course.rating}</span>
              </div>
            </figure>

            <div className="mt-4">
              <h2 className="text-lg font-bold line-clamp-2 h-14">{course.title}</h2>
              <p className="flex items-center gap-2 text-sm mt-3">Beginner to Advance</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <p className="text-xs">{course.interested}</p>
                </div>
                <button className="text-sm rounded bg-green-600 text-white px-3 py-1 hover:bg-green-700 transition-colors">
                  {course.link ? (
                    <a href={course.link} target="_blank" rel="noopener noreferrer">
                      Explore now
                    </a>
                  ) : (
                    "Explore now"
                  )}
                </button>
              </div>
              <button className="mt-4 bg-yellow-400 text-xs w-full rounded py-2 hover:bg-yellow-500 transition-colors">
                <span className="font-bold">Refund of 90%</span> available
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Cards

