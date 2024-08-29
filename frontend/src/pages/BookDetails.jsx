import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Posts } from "../assets/Content";
import { Rating } from "@material-tailwind/react";
import Review from "../assets/Review";
import { useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

function ReadonlyRating({ value }) {
  return <Rating value={value} readonly />;
}

function BookDetails() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState([]);

  const { id } = useParams();
  const book = Posts.find((post) => post.id.toString() === id);

  if (!book) {
    return <h2 className="text-center text-red-500">Book not found!</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-10 bg-white">
        <div className="container flex px-4 py-10 mx-auto">
          <div className="grid justify-center w-full grid-cols-3 gap-4 mx-10">
            <div className="grid justify-end w-full">
              <img
                src={book.img}
                alt={book.title}
                style={{ maxWidth: "300px" }}
                className="object-contain w-full"
              />
            </div>
            <div className="flex flex-col justify-between col-span-2 mt-5 ml-10">
              <div>
                <h1 className="mb-10 text-5xl font-bold">{book.title}</h1>
                <div className="flex items-center gap-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">Author :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700"> {book.author}</h3>
                </div>

                <div className="flex items-center gap-2 mt-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">Category :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700">
                    {" "}
                    {book.category}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mt-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">Publish Date :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700">
                    {" "}
                    {book.publishDate}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mt-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">ISBN :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700"> {book.isbn}</h3>
                </div>

                <div className="my-4">
                  <ReadonlyRating value={book.rating} />
                </div>

                <div className="flex items-center gap-2 mt-2 mb-6">
                  <p className="m-0 text-md gray-700 text-">
                    {" "}
                    {book.description}
                  </p>
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
        </div>

        {/* image galary model  */}

        <ModalDialogScrollable
          showModal={showModal}
          setShowModal={setShowModal}
          image={image}
        />

        {book.subImages && book.subImages.length > 0 ? (
          <div className="container flex justify-center py-8">
            <div className="w-4/5">
              <div
                style={{ backgroundColor: "#ededede6" }}
                className="grid justify-center grid-cols-5 gap-5 px-5 py-10 rounded-lg shadow"
              >
                {book.subImages.map((image, index) => (
                  <div key={index}>
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setImage([image]);
                      }}
                      src={image}
                      alt=""
                      className="object-cover transition-transform duration-300 transform cursor-pointer w-96 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
              <div className="grid justify-center mt-4">
                <button
                  className="px-10 py-2 mt-2 ml-auto text-white transition-transform duration-300 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
                  onClick={() => {
                    setShowModal(true);
                    setImage(book.subImages);
                  }}
                >
                  Read Preview
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="container">
          <Review />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BookDetails;

function ModalDialogScrollable({ showModal, setShowModal, image }) {
  return (
    <div>
      {/* <!-- Modal --> */}
      <div>
        <TEModal show={showModal} setShow={setShowModal} scrollable>
          <TEModalDialog>
            <TEModalContent>
              {/* <!--Modal body--> */}
              <TEModalBody>
                {image &&
                  image.map((img, index) => {
                    return <img className="my-3 shadow" src={img}></img>;
                  })}
              </TEModalBody>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    </div>
  );
}
