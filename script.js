let recognition; // Variable para almacenar el objeto de reconocimiento de voz
let restartInterval; 
const usuarios = [
    { nombre: 'Fabiola', clave: 'luna 4213' },
    { nombre: 'Mariana', clave: 'luna 9876' }
];

function startRecording() {
    // Decir "Por favor, identifícate con los 4 dígitos"
    const mensajeInicio = new SpeechSynthesisUtterance("Por favor, identifícate con la clave de 4 dígitos");
    mensajeInicio.onend = function() {
        // Inicializar el reconocimiento de voz después de que se haya completado la síntesis del habla
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'es-ES';
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            console.log(transcript);
            const usuario = usuarios.find(u => transcript.toLowerCase().endsWith(u.clave));
            if (usuario) {
                const mensajeInicio = new SpeechSynthesisUtterance("Bienvenida " + usuario.nombre);
                console.log("Bienvenida" + usuario.nombre);
                window.speechSynthesis.speak(mensajeInicio);
                stopRecording();
                ejecutarComando(usuario.nombre);
            } else {
                const mensajeInicio = new SpeechSynthesisUtterance("Usuario no reconocido");
                window.speechSynthesis.speak(mensajeInicio);
                stopRecording();
            }
        };

        recognition.onerror = function (event) {
            console.error('Error en el reconocimiento de voz: ', event.error);
        }

        // Iniciar el reconocimiento de voz después de inicializarlo
        restartInterval = setInterval(function () {
            recognition.start();
        }, 2000);
    };
    window.speechSynthesis.speak(mensajeInicio);

    document.getElementById('microfono-image').src = 'microfono-encendido.png';
    document.getElementById('microfono-image').style.animation = 'encender 1.3s ease-in-out infinite alternate';
}

function ejecutarComando(usuarioNombre) {
    document.getElementById('microfono-image').src = 'microfono-encendido.png';
    document.getElementById('microfono-image').style.animation = 'encender 1.3s ease-in-out infinite alternate';
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'es-ES';
    const ordenIdentificada = document.getElementById('ordenIdentificada');
    recognition.onresult = function (event) {
        // Trae la información de todo lo que estuve hablando
        const transcript = event.results[0][0].transcript;
        console.log(transcript);
        if (transcript.toLowerCase().includes('luna')) {
            switch (true) {
                case transcript.toLowerCase().includes('enciende la luz de la recámara'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende la luz de la recámara', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga la luz de la recámara'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga la luz de la recámara', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('enciende la luz de la sala'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende la luz de la sala', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga la luz de la sala'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga la luz de la sala', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('enciende las luces del jardín'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende las luces del jardín', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga las luces del jardín'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga las luces del jardín', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('enciende el ventilador'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende el ventilador', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga el ventilador'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga el ventilador', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('abre las cortinas'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('abre las cortinas', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('cierra las cortinas'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('cierra las cortinas', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('enciende las cámaras de seguridad'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende las cámaras de seguridad', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga las cámaras de seguridad'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga las cámaras de seguridad', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('desactiva la alarma de la casa'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga la alarma', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('activa la alarma de la casa'):
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende la alarma', usuarioNombre);
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

    // Reinicia la grabación
    restartInterval = setInterval(function () {
        recognition.start();
    }, 2000);
}


function stopRecording() {
    if (recognition) {
        document.getElementById('microfono-image').src = 'microfono-apagado.png';
        document.getElementById('microfono-image').style.animation = 'none';
        recognition.stop();
        clearInterval(restartInterval); 
    }
}

function obtenerFechaHoraActual() {
    return new Date().toLocaleString();
}

// Función para enviar datos a MockAPI
function enviarDatosAMockAPI(instruccion,nombreUsuario) {
    const fechaHoraActual = obtenerFechaHoraActual();
    const usuario=usuarios.nombre;
    // Datos a enviar en la solicitud POST
    const datos = {
        orden: instruccion,
        usuario: nombreUsuario,
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




