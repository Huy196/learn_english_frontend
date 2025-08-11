import Swal from 'sweetalert2'; 

const confirmAlert = async ({ title, text, icon = "warning", confirmText = "OK", cancelText = "Cancel" }) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });

  return result.isConfirmed;
};

export default confirmAlert;
