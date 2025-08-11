import Swal from 'sweetalert2'; 


export default function showToast({ title, icon = "success", timer = 2000, position = "top-end" }) {
    Swal.fire({
        toast: true,
        position,
        icon,
        title,
        showConfirmButton: false,
        timer
    });
}
