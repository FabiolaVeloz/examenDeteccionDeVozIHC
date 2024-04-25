window.innerWidth = 800;
window.innerHeight = 600;

let recognition; // Variable para almacenar el objeto de reconocimiento de voz
let restartInterval; 

function startRecording() {
    document.getElementById('microfono-image').src = 'microfono-encendido.png';
    document.getElementById('microfono-image').style.animation = 'encender 1.3s ease-in-out infinite alternate';

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'es-ES';
    const ordenIdentificada = document.getElementById('ordenIdentificada');
    recognition.onresult = function (event) {
        // Trae la información de todo lo que estuve hablando
        const transcript = event.results[0][0].transcript;
        if (transcript.toLowerCase().includes('luna')) {

            ordenIdentificada.textContent = "Orden Identificada: " + transcript;

            switch (true) {
                case transcript.toLowerCase().includes('enciende la luz de la recámara'):
                    enviarDatosAMockAPI('enciende la luz de la recámara');
                break;
                case transcript.toLowerCase().includes('apaga la luz de la recámara'):
                    enviarDatosAMockAPI('apaga la luz de la recámara');
                break;
                case transcript.toLowerCase().includes('enciende la luz de la sala'):
                    enviarDatosAMockAPI('enciende la luz de la sala');
                break;
                case transcript.toLowerCase().includes('apaga la luz de la sala'):
                    enviarDatosAMockAPI('apaga la luz de la sala');
                break;
                case transcript.toLowerCase().includes('enciende las luces del jardín'):
                    enviarDatosAMockAPI('enciende las luces del jardín');
                break;
                case transcript.toLowerCase().includes('apaga las luces del jardín'):
                    enviarDatosAMockAPI('apaga las luces del jardín');
                break;
                case transcript.toLowerCase().includes('enciende el ventilador'):
                    enviarDatosAMockAPI('enciende el ventilador');
                break;
                case transcript.toLowerCase().includes('apaga el ventilador'):
                    enviarDatosAMockAPI('apaga el ventilador');
                break;
                case transcript.toLowerCase().includes('abre las cortinas'):
                    enviarDatosAMockAPI('abre las cortinas');
                break;
                case transcript.toLowerCase().includes('cierra las cortinas'):
                    enviarDatosAMockAPI('cierra las cortinas');
                break;
                case transcript.toLowerCase().includes('enciende las cámaras de seguridad'):
                    enviarDatosAMockAPI('cierra las cortinas');
                break;
                case transcript.toLowerCase().includes('apaga las cámaras de seguridad'):
                    enviarDatosAMockAPI('cierra las cortinas');
                break;
                case transcript.toLowerCase().includes('enciende la alarma'):
                    enviarDatosAMockAPI('cierra las cortinas');
                break;
                case transcript.toLowerCase().includes('apaga la alarma'):
                    enviarDatosAMockAPI('cierra las cortinas');
                break;
                default:
                    console.log('Instrucción no reconocida');
            }
        }
    };

    recognition.onerror = function (event) {
        console.error('Error en el reconocimiento de voz: ', event.error);
    }

    recognition.start();

    // Reinicia la grabación cada 5 segundos
    restartInterval = setInterval(function () {
        recognition.start();
    }, 2000);
}

function stopRecording() {
    if (recognition) {
        document.getElementById('microfono-image').src = 'microfono-apagado.png';
        document.getElementById('microfono-image').style.animation = 'none';
        ordenIdentificada.textContent = "Orden Identificada: ";
        recognition.stop();
        clearInterval(restartInterval); // Detiene el intervalo de reinicio
    }
}

function obtenerFechaHoraActual() {
    return new Date().toLocaleString();
}

// Función para enviar datos a MockAPI
function enviarDatosAMockAPI(instruccion) {
    const fechaHoraActual = obtenerFechaHoraActual();
    const usuario="Fabiola";
    // Datos a enviar en la solicitud POST
    const datos = {
        orden: instruccion,
        usuario: usuario,
        fechaHora: fechaHoraActual
    };

    // Opciones de la solicitud
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    // URL de MockAPI
    const urlMockAPI = 'https://660c52433a0766e85dbdebe2.mockapi.io/examen';

    // Enviar la solicitud POST
    return fetch(urlMockAPI, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud POST a MockAPI');
            }
            return response.json();
        })
        .then(data => {
            console.log('Registro exitoso en MockAPI:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
