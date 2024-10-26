const BookCard = ({ bookDetails }) => {
  if (!bookDetails) return null; // Ensure bookDetails is not null
  return (
    <div className="flex p-6 my-4 bg-white rounded-lg shadow-md">
      <div className="flex-shrink-0">
        {bookDetails.Img_url && (
          <img
            className="object-cover w-40 rounded-lg h-60"
            src={bookDetails.Img_url}
            alt={bookDetails.title}
          />
        )}
      </div>
      <div className="ml-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Book Details
        </h2>
        <div className="space-y-2">
          <div className="flex">
            <p className="w-32 font-medium text-gray-600">Title:</p>
            <p className="text-gray-800">{bookDetails.Title_name}</p>
          </div>
          <div className="flex">
            <p className="w-32 font-medium text-gray-600">Author:</p>
            <p className="text-gray-800">{bookDetails.Author_name}</p>
          </div>
          <div className="flex">
            <p className="w-32 font-medium text-gray-600">Category:</p>
            <p className="text-gray-800">{bookDetails.Category_name}</p>
          </div>
          <div className="flex">
            <p className="w-32 font-medium text-gray-600">Publisher:</p>
            <p className="text-gray-800">{bookDetails.Publisher_name}</p>
          </div>
          <div className="flex">
            <p className="w-32 font-medium text-gray-600">Pages:</p>
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
