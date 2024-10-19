// ShowMessage.js
import Toastify from 'toastify-js'; // Asegúrate de tener Toastify importado
import 'toastify-js/src/toastify.css'; // Importa los estilos de Toastify si es necesario

export function showMessage(message, type = "success") {
    Toastify({
        text: message,
        duration: 3000, // Duración del mensaje en milisegundos
        destination: "https://github.com/apvarun/toastify-js", // Enlace de destino (opcional)
        newWindow: true, // Si el enlace de destino debe abrirse en una nueva ventana
        close: true, // Mostrar botón para cerrar el mensaje
        gravity: "bottom", // Posición vertical del mensaje: `top` o `bottom`
        position: "right", // Posición horizontal del mensaje: `left`, `center` o `right`
        stopOnFocus: true, // Prevenir el cierre del mensaje al pasar el ratón sobre él
        style: {
            background: type === "success" ? "linear-gradient(to right, #00b09b, #96c93d)" : "red", // Color del fondo según el tipo
            borderRadius: "10px", // Bordes redondeados
            color: "#000" // Color del texto
        },
        onClick: function() {} // Callback después de hacer clic (opcional)
    }).showToast(); // Mostrar el mensaje
}

export default (showMessage);
