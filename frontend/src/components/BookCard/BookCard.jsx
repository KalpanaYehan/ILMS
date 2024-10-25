const BookCard = ({ bookDetails }) => {
  if (!bookDetails) return null; // Ensure bookDetails is not null
  return (
    <div className="flex shadow-md rounded-lg p-6 my-4 bg-white">
      <div className="flex-shrink-0">
        {bookDetails.Img_url && (
          <img
            className="h-60 w-40 object-cover rounded-lg"
            src={bookDetails.Img_url}
            alt={bookDetails.title}
          />
        )}
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
            {bookDetails.Status ? (
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
  );
};

export default BookCard;
