import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Posts } from "../assets/Content";
import { Rating } from "@material-tailwind/react";
import Review from "../assets/Review";

function ReadonlyRating({ value }) {
  return <Rating value={value} readonly />;
}

function BookDetails() {
  const { id } = useParams();
  const book = Posts.find((post) => post.id.toString() === id);

  if (!book) {
    return <h2 className="text-center text-red-500">Book not found!</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-customYellow">
        <div className="container flex px-4 py-10 mx-auto">
          <div className="w-[30%]">
            <img
              src={book.img}
              alt={book.title}
              className="object-contain w-full h-48 rounded-lg shadow-lg"
            />
          </div>
          <div className="w-[60%] ml-6 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold">{book.title}</h1>
              <h2 className="mt-2 text-2xl text-gray-700">{book.author}</h2>
              <div className="mt-2">
                <ReadonlyRating value={book.rating} />
              </div>
              <div className="mt-2">
                {book.availability === "true" ? (
                  <span className="px-4 py-2 text-white bg-green-600 rounded-full">
                    Available
                  </span>
                ) : (
                  <span className="px-4 py-2 text-white bg-red-600 rounded-full">
                    Not available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-16 py-2 mx-16 mb-10 border border-gray-300 shadow-md rounded-3xl bg-primary/20">
          <h1 className="text-3xl font-bold">Preview</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
            congue nisi vitae suscipit tellus mauris. At erat pellentesque
            adipiscing commodo elit at imperdiet dui. Erat imperdiet sed euismod
            nisi porta lorem mollis. Senectus et netus et malesuada fames ac
            turpis egestas. Et egestas quis ipsum suspendisse ultrices gravida
            dictum fusce ut. Dictum varius duis at consectetur. Ultrices
            tincidunt arcu non sodales neque sodales. Eu tincidunt tortor
            aliquam nulla facilisi. Pharetra magna ac placerat vestibulum lectus
            mauris ultrices. Erat pellentesque adipiscing commodo elit at
            imperdiet.
          </p>
          <p>
            Montes nascetur ridiculus mus mauris vitae. Eget nunc lobortis
            mattis aliquam faucibus purus in massa tempor. Id diam vel quam
            elementum pulvinar etiam. Adipiscing enim eu turpis egestas pretium
            aenean pharetra magna. Accumsan lacus vel facilisis volutpat est
            velit egestas. Vitae purus faucibus ornare suspendisse sed nisi.
            Porta nibh venenatis cras sed felis eget velit. Porta non pulvinar
            neque laoreet suspendisse. Ultrices eros in cursus turpis massa
            tincidunt dui. Accumsan in nisl nisi scelerisque eu ultrices. In hac
            habitasse platea dictumst. Nascetur ridiculus mus mauris vitae
            ultricies leo integer. Faucibus interdum posuere lorem ipsum dolor
            sit amet consectetur. Imperdiet massa tincidunt nunc pulvinar sapien
            et. Odio aenean sed adipiscing diam donec. Cursus sit amet dictum
            sit.
          </p>
          <p className="mb-2">
            Turpis egestas sed tempus urna. Aliquet lectus proin nibh nisl
            condimentum. Suspendisse ultrices gravida dictum fusce ut. Id ornare
            arcu odio ut sem. Eu feugiat pretium nibh ipsum consequat. Proin sed
            libero enim sed faucibus turpis in. Sapien pellentesque habitant
            morbi tristique. Interdum velit laoreet id donec. Amet consectetur
            adipiscing elit duis tristique sollicitudin nibh. Quis viverra nibh
            cras pulvinar mattis nunc sed. Quisque non tellus orci ac auctor.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
            congue nisi vitae suscipit tellus mauris. At erat pellentesque
            adipiscing commodo elit at imperdiet dui. Erat imperdiet sed euismod
            nisi porta lorem mollis. Senectus et netus et malesuada fames ac
            turpis egestas. Et egestas quis ipsum suspendisse ultrices gravida
            dictum fusce ut. Dictum varius duis at consectetur. Ultrices
            tincidunt arcu non sodales neque sodales. Eu tincidunt tortor
            aliquam nulla facilisi. Pharetra magna ac placerat vestibulum lectus
            mauris ultrices. Erat pellentesque adipiscing commodo elit at
            imperdiet.
          </p>
        </div>

        <Review />
      </div>

      <Footer />
    </>
  );
}

export default BookDetails;
