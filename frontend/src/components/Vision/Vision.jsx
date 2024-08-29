import React from 'react'

const Vision = () => {
  return (
    <div className="flex flex-col justify-center px-8 mt-12">
        {/* Vision */}
        <div className="mx-5 mb-8 text-center">
          <h2 className="mb-4 text-4xl text-red-900"> Our Vision</h2>
          <p className="text-xl text-black ">
            Our vision is to revolutionize the library experience by making it
            as simple and convenient as possible, empowering readers to engage
            with the books they love, whenever and wherever they are.
          </p>
        </div>

        
        <hr className="border border-red-900 my-8 mx-auto w-[70%]" />

        {/* Mission */}
        <div className="mx-5 mt-8 mb-8 text-center">
          <h2 className="mb-4 text-4xl text-red-900"> Our Mission</h2>
          <p className="text-xl text-black ">
            Our mission is to create an accessible and efficient system that
            allows users to search, reserve, and check the availability of books
            in the library, all without needing to visit the library in person.
          </p>
        </div>

        <hr className="border border-red-900 my-8 mx-auto w-[70%]" />
      </div>

  )
}

export default Vision