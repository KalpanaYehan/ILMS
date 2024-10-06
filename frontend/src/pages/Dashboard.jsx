// import React from 'react';
// import Navbar from '../components/Navbar/Navbar';
// import Footer from '../components/Footer/Footer';
// import ChatBot from '../components/ChatBot/ChatBot';
// import GuideImage from '../assets/website/pic.jpeg'; // Import your image here

// const Help = () => {
//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen py-10 bg-yellow-50">
//         <div className="container px-4 mx-auto">
//           <h1 className="mb-10 text-5xl font-bold text-center">Help & Support</h1>
          
//           <section className="mb-12">
//             <h2 className="mb-4 text-3xl font-semibold">User Guide</h2>
//             <div className="flex flex-col justify-between mb-6 lg:flex-row">
//               <div className="">
//                 <p className="mb-6 text-2xl text-black">
//                   Our Interactive Library Management System is designed to be user-friendly. Here’s a quick guide to help you get started:
//                 </p>
//                 <div className='flex gap-16'>
//                   <div>
//                     <ul className="mb-6 text-xl list-disc list-inside text-blue-gray-700">
//                       <li>Register or log in to your account.</li>
//                       <li>Use the search bar to find books by title or author.</li>
//                       <li>Add books to your Wishlist or reserve them for later.</li>
//                       <li>View and manage your borrowing history in your profile.</li>
//                       <li>Leave reviews and ratings for books you’ve read.</li>
//                       <li>Admins can manage books, users, and system settings.....</li>
//                     </ul>
//                     <p className="text-lg text-black">
//                       For a detailed guide, please refer to our <a href="https://drive.google.com/file/d/1nbQc6Tsm8DR4zs6R90EovSVbT79Cxk3l/view?usp=sharing" className="text-xl text-blue-600 underline">User Manual</a>.
//                     </p>
//                   </div>

//                   <div className="">
//                     <img
//                       src={GuideImage}
//                       alt="User Guide"
//                       className="object-cover w-full h-64 max-w-2xl lg:max-w-full"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
          
//           {/* FAQ and Contact sections remain unchanged */}
//           <div className='"container flex justify-center py-8 "'>
//             <section className="p-8 mb-12 rounded-xl bg-blue-gray-100">
//               <h2 className="mb-4 text-3xl font-semibold">Frequently Asked Questions (FAQs)</h2>
//               <div className="mb-6">
//                 <h3 className="text-2xl font-medium">How do I reset my password?</h3>
//                 <p className='pl-12 text-xl'>
//                   To reset your password, click on the "Forgot Password" link on the login page, and follow the instructions.
//                 </p>
//               </div>
//               <div className="mb-6">
//                 <h3 className="text-2xl font-medium">Can I reserve a book that is currently checked out?</h3>
//                 <p className='pl-12 text-xl '>
//                   Yes, you can reserve a book that is currently checked out. You will be notified when the book becomes available.
//                 </p>
//               </div>
//               <div className="mb-6">
//                 <h3 className="text-2xl font-medium">How do I contact support?</h3>
//                 <p className='pl-12 text-xl '>
//                   You can contact our support team by emailing us at <a href="mailto:support@NexLib.com" className="text-blue-600 underline">support@librarysystem.com</a> or calling our helpline at (+94) 456-78990.
//                 </p>
//               </div>
//               <div className="mb-6">
//                 <h3 className="text-2xl font-medium">How many books can I borrow at a time?</h3>
//                 <p className='pl-12 text-xl '>
//                 You can borrow up to 3 books at a time.
//                 </p>
//               </div>
//             </section>
//           </div>

//           <section>
//             <h2 className="mb-4 text-3xl font-semibold">Contact Us</h2>
//             <p className="mb-6 text-xl">
//               If you have any further questions or need assistance, feel free to reach out to us. We're here to help!
//             </p>
//             <p className="mb-2">
//               <strong>Email:</strong> <a href="mailto:support@librarysystem.com" className="text-xl text-blue-600 underline">support@librarysystem.com</a>
//             </p>
//             <p className="flex mb-2">
//               <strong>Phone:</strong>
//                <p className='text-xl'> (+94) 456-789078   </p>
//             </p>
//             <p className="flex mb-2">
//               <strong>Address:</strong> 
//             <p className='text-xl'>  123 Galle Road, Colombo 03, Sri Lanka</p>
//             </p>
//           </section>
//         </div>
//       </div>
      
//       <ChatBot/>
//       <Footer />
//     </>
//   );
// };

// export default Help;