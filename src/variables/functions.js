import Swal from "sweetalert2";

class Functions {
    static successSwal(message) {
        Swal.fire({
            icon: 'success',
            title: 'Done!',
            text: message
        }).finally(() => undefined);
    }

    static errorSwal(message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
        }).finally(() => undefined);
    }

    static errorSwalWithFooter(message, footerMessage) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            footer: '<a> '+ footerMessage +' </a>'
        }).finally(() => undefined);
    }

    static confirmSwal(confirmButtonText) {
        return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText
        });
    }

}

export default Functions;