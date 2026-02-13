const valorDolarHoy = 1450; 
const tasaGestion = 1.05; 
let categoriasObra = []; 

// selectores
const formContacto = document.getElementById("formulariocontacto");
const areaOferta = document.getElementById("contenedorOferta");
const formSuscripcion = document.getElementById("formSuscripcion");
const inputEmail = document.getElementById("emailSuscripcion"); 

// traemos el json con fetch
const pedirCategorias = async () => {
    // Solo actuamos si estamos en la página que tiene el formulario de contacto
    if (formContacto) {
        const posiblesRutas = [
            '../js/categorias.json',
            '../../js/categorias.json',
            './js/categorias.json'
        ];

        let encontrado = false;

        for (let ruta of posiblesRutas) {
            try {
                const respuesta = await fetch(ruta);
                if (respuesta.ok) {
                    categoriasObra = await respuesta.json();
                    encontrado = true;
                    break; 
                }
            } catch (error) {
            
            }
        }

        if (!encontrado) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las categorías',
                confirmButtonColor: "#491311"
            });
        }
    }
};

/*admito que esto me ayude un poquito con IA porque me aparecia el error de que no encontraba las categorias en los otros hTMl*/

pedirCategorias();

// funciones
function calcularTotalUsd(monto) {
    return monto * tasaGestion;
}

function convertirAPesos(montoUsd) {
    return montoUsd * valorDolarHoy;
}

// funcion para separar el render del html 
function mostrarPropuesta(nombre, categorias, totalUsd, totalArs) {
    areaOferta.innerHTML = `
        <div style="padding: 20px;">
            <h3 style="font-family: 'Bebas Neue', cursive; color: #ffffff; letter-spacing: 1px;">PROPUESTA PARA: ${nombre.toUpperCase()}</h3>
            <p style="color: #eeeeee; font-size: 1.1rem;">Hemos analizado tu interés en las categorías: <strong>${categorias.join(", ")}</strong>.</p>
            <p style="color: #eeeeee;">Te estaremos contactando a la brevedad.</p>
            
            <hr style="border-color: #555555; margin: 20px 0;">
            
            <div style="display: flex; justify-content: space-between; gap: 20px;">
                <div>
                    <p style="margin-bottom: 5px; color: #aaaaaa; font-size: 0.8rem;">OFERTA EN USD</p>
                    <h4 style="color: #ffffff; font-size: 1.5rem;">USD $${totalUsd.toFixed(2)}</h4>
                </div>
                <div>
                    <p style="margin-bottom: 5px; color: #aaaaaa; font-size: 0.8rem;">TOTAL EN ARS</p>
                    <h4 style="color: #ffffff; font-size: 1.5rem;">$${totalArs.toLocaleString('es-AR')}</h4>
                </div>
            </div>
            
            <p style="font-size: 0.75rem; color: #888888; margin-top: 15px;">
                * Los valores incluyen comisión por gestión. Tipo de cambio: 1 USD = $${valorDolarHoy} ARS.
            </p>
        </div>
    `;
    
    areaOferta.style.display = "block";
    areaOferta.classList.add("aparecer"); 
}

// funcion para renderizar si no detecta categorias
function mostrarMensajeGeneral(nombre) {
    areaOferta.innerHTML = `
        <div style="padding: 20px;">
            <p style="color: #eeeeee;">Gracias ${nombre}, recibimos tu mensaje general y te estaremos contactando a la brevedad.</p>
        </div>
    `;
    areaOferta.style.display = "block";
    areaOferta.classList.add("aparecer");
}

// eventos
if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
        e.preventDefault(); 

        // entrada
        const nombreArtista = document.getElementById("nombreInput").value;
        const mensajeArtista = document.getElementById("mensajeInput").value.toLowerCase();

        let acumuladoUsd = 0;
        let detectadas = [];

        // ciclos
        for (const obra of categoriasObra) {
            if (mensajeArtista.includes(obra.nombre.toLowerCase())) {
                acumuladoUsd += obra.ofertaBase;
                detectadas.push(obra.nombre);
            }
        }

        if (acumuladoUsd > 0) {
            const finalUsd = calcularTotalUsd(acumuladoUsd);
            const finalArs = convertirAPesos(finalUsd);

            // lo puse solo para demostrar el localstorage
            const simulacion = {
                usuario: nombreArtista,
                categorias: detectadas,
                montoUsd: finalUsd,
                montoArs: finalArs,
                fecha: new Date().toLocaleDateString()
            };
            localStorage.setItem("ultimaSimulacion", JSON.stringify(simulacion));

            // salida llamando a la funcion de render
            mostrarPropuesta(nombreArtista, detectadas, finalUsd, finalArs);

            // alerta
            Swal.fire({
                title: "¡Presupuesto generado!",
                text: "Cierra para ver el detalle de la propuesta.",
                icon: "success",
                confirmButtonColor: "#491311"
            });

        } else {
            mostrarMensajeGeneral(nombreArtista);
        }
    });
}

// verificamos persistencia
window.addEventListener('DOMContentLoaded', () => {
    const backup = localStorage.getItem("ultimaSimulacion");
    if (backup) {
        const datos = JSON.parse(backup);
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: `Última simulación: ${datos.usuario}`,
            showConfirmButton: false,
            timer: 3000
        });
    }
});

// evento suscripcion
if (formSuscripcion) {
    formSuscripcion.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const emailUsuario = inputEmail.value;

        localStorage.setItem("suscriptorRojoCarmin", emailUsuario);

        Swal.fire({
            title: "¡Suscripción exitosa!",
            text: `Registramos tu correo: ${emailUsuario}. Te llegarán todas nuestras últimas novedades.`,
            icon: "success",
            confirmButtonColor: "#491311", 
            confirmButtonText: "¡Genial!"
        });

        formSuscripcion.reset();
    });
}