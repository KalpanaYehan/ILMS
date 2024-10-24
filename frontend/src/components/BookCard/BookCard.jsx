const BookCard = ({ bookDetails }) => {
  if (!bookDetails) return null; // Ensure bookDetails is not null
  return (
    <div className="flex shadow-md rounded-lg p-6 my-4 bg-white">
      <div className="flex-shrink-0">
        <img
          className="h-60 w-40 object-cover rounded-lg"
          src={bookDetails.Img_url}
          alt={bookDetails.title}
        />
      </div>
      <div className="ml-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Book Details
        </h2>
        <div className="space-y-2">
          <div className="flex">
            <p className="text-gray-600 font-medium w-32">Title:</p>
            <p className="text-gray-800">{bookDetails.Title_name}</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 font-medium w-32">Author:</p>
            <p className="text-gray-800">{bookDetails.Author_name}</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 font-medium w-32">Category:</p>
            <p className="text-gray-800">{bookDetails.Category_name}</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 font-medium w-32">Publisher:</p>
            <p className="text-gray-800">{bookDetails.Publisher_name}</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 font-medium w-32">Pages:</p>
            <p className="text-gray-800">{bookDetails.NoOfPages}</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 font-medium w-32">Availability:</p>
            <p className="text-gray-800">{bookDetails.Status ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
