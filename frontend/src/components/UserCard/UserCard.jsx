const UserCard = ({ userDetails }) => {
  if (!userDetails) return null; // Ensure userDetails is not null
  return (
    <div className="flex shadow-md rounded-lg p-6 my-4 bg-white">
      <div className="flex-shrink-0">
        {/* <img
          className="h-40 w-40 object-cover rounded-full"
          src={userDetails.img}
          alt={userDetails.First_Name + " " + userDetails.Last_Name}
        /> */}
      </div>
      <div className="ml-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          User Details
        </h2>
        <div className="space-y-2">
          <div className="flex">
            <p className="text-gray-600 font-medium w-36">User ID:</p>
            <p className="text-gray-800">{userDetails.Member_ID}</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 font-medium w-36">First Name:</p>
            <p className="text-gray-800">{userDetails.First_name}</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 font-medium w-36">Last Name:</p>
            <p className="text-gray-800">{userDetails.Last_name}</p>
          </div>
          {/* <div className="flex">
            <p className="text-gray-600 font-medium w-36">NIC:</p>
            <p className="text-gray-800">{userDetails.nic}</p>
          </div> */}
          <div className="flex">
            <p className="text-gray-600 font-medium w-36">Phone Number:</p>
            <p className="text-gray-800">{userDetails.Contact_No}</p>
          </div>
          <div className="flex">
            <p className="text-gray-600 font-medium w-36">E-mail:</p>
            <p className="text-gray-800">{userDetails.Email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
