//import {X} from react-feather;
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';

const DeleteModal = ({open,onclose,bookId,refreshBooks}) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

  // Function to handle the delete operation
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Call the backend API to delete the book by ID
      const res = await axios.delete(`https://ilms.vercel.app/books/books/${bookId}`);
      if (res.data.message === 'Book deleted successfully.') {
        enqueueSnackbar('Book deleted successfully.', { variant: 'success' });
      }else if (res.data.message === 'Book not found.') {
        enqueueSnackbar('Book not found.', { variant: 'error' });
      }
      // Refresh the book list after successful deletion
      refreshBooks();

      // Close the modal after deletion
      onclose();
    } catch (error) {
      console.error("Error deleting book:", error.message);
      enqueueSnackbar("Failed to delete the Book.", { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
}

    return(
        //backdrop
        <div onClick={onclose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
            {/*model*/}
            <div onClick={(e)=>e.stopPropagation} className={`bg-white rounded-xl shadow p-6 transition-all${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onclose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                    
                </button>
                <div className="text-center w-56">
                {/* <Trash size={56} className="mx-auto text-red-500" /> */}
                <div className="mx-auto my-4 w-48">
                    <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
                    <p className="text-sm text-gray-500">
                    Are you sure you want to delete this item?
                    </p>
                </div>
                <div className="flex gap-4">
                <div className="flex gap-4">
                    <button
                        className="btn btn-danger w-full"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                    <button
                        className="btn btn-light w-full"
                        onClick={onclose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default DeleteModal