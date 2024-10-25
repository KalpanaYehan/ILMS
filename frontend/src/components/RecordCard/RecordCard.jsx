const RecordCard = ({ recordDetails }) => {
  if (!recordDetails) return null; // Ensure recordDetails is not null

  // Function to handle date formatting safely
  const formatDate = (date) => {
    if (!date) return "N/A"; // Return 'N/A' if date is null or undefined
    const issuedDate = new Date(date);
    return isNaN(issuedDate)
      ? "Invalid Date"
      : issuedDate.toISOString().slice(0, 10);
  };

  return (
    <div className="flex flex-col shadow-md rounded-lg p-6 my-4 bg-white">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Record Details
      </h2>
      <div className="space-y-2">
        <div className="flex">
          <p className="text-gray-600 font-medium w-40">Record ID:</p>
          <p className="text-gray-800">{recordDetails.Issue_ID}</p>
        </div>
        <div className="flex">
          <p className="text-gray-600 font-medium w-40">Issued Date:</p>
          <p className="text-gray-800">
            {formatDate(recordDetails.Issued_Date)}
          </p>
        </div>
        <div className="flex">
          <p className="text-gray-600 font-medium w-40">Fine:</p>
          <p className="text-gray-800">{recordDetails.Fine} Rupees</p>
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
