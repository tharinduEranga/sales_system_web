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


}

export default Functions;