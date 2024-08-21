import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const Books = () => {
  return (
    <>
      <Navbar/>
      <div className ='min-h-screen bg-customYellow'>
      
  <section
    id="features"
    className="relative block px-6 py-10 md:py-20 md:px-10 "
  >
    
    <div className="relative mx-auto max-w-5xl text-center">
      <span className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent  text-4xl sm:text-4xl ">
        Manage Your Library
      </span>
      <h2 className="w-full text-gray-700 my-3 flex items-center justify-center font-medium text-xl tracking-wider ">
        Effortlessly organize and maintain your collection with intuitive tools
      </h2>
    </div>

    

    <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
      {/*<div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">*/}
      <a href='/books/add' className='hover:text-white hover:scale-110 duration-200'>
                <div
                  
                  className="flex flex-col gap-4 shadow-lg py-4 px-0 mx-4 rounded-xl  bg-primary/20 relative"
                >
                  <div className="  mb-1">
                    <img
                      src='https://ucare.inhersight.com/336ace3d-f01b-403d-b9d4-ef455bee9ef4/-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/800x/'
                      alt=""
                      className="rounded-xl w-[90%] h-70 mx-auto"
                    />
                  </div>
                  {/* content section */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3 px-3">
                      <h1 className="text-2xl text-center font-bold text-black/80  font-cursive2">
                        Add Book
                      </h1>
                      <p className="text-sm text-center text-gray-600">Quickly add new books to your library with all the essential details, ensuring your collection stays up-to-date.</p>
                    </div>
                  </div>
                  
                
             {/*</div>*/}
      </div>
     </a>
     <a href='/books/remove' className='hover:text-white hover:scale-110 duration-200'>
      <div
                  
                  className="flex flex-col gap-4 shadow-lg py-4 px-0 mx-4 rounded-xl  bg-primary/20 relative"
                >
                  <div className="  mb-1">
                    <img
                      src='https://cdn.absolutemgmt.com/wp-content/uploads/2022/09/Woman-Packing-Box.webp'
                      alt=""
                      className="rounded-xl w-[90%] h-70 mx-auto"
                    />
                  </div>
                  {/* content section */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3 px-3">
                      <h1 className="text-2xl text-center font-bold text-black/80  font-cursive2">
                        Remove Book
                      </h1>
                      <p className="text-sm text-center text-gray-600">Easily remove books from your library to keep your collection organized and relevant.</p>
                    </div>
                  </div>
                  
                
             {/*</div>*/}
      </div>
      </a>
      <a href='/books/search' className='hover:text-white hover:scale-110 duration-200'>
      <div
                  
                  className="flex flex-col gap-4 shadow-lg py-4 px-0 mx-4 rounded-xl  bg-primary/20 relative"
                >
                  <div className="  mb-1">
                    <img
                      src='https://www.usedbooksearch.net/wp-content/uploads/2020/10/used-book-search-online.png'
                      alt=""
                      className="rounded-xl w-[90%] h-70 mx-auto"
                    />
                  </div>
                  {/* content section */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3 px-3">
                      <h1 className="text-2xl text-center font-bold text-black/80  font-cursive2">
                        Search Book
                      </h1>
                      <p className="text-sm text-center text-gray-600">Quickly find any book in your collection with our efficient search feature.</p>
                    </div>
                  </div>
                  
                
             {/*</div>*/}
      </div>
      </a>



    </div>
  </section>

</div>


         
      <Footer/>
    </>
  )
}

export default Books


