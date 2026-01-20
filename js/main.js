const valorDolarHoy = 1450; 
const tasaGestion = 1.05; 

// Categorías 
const categoriasObra = [
    { nombre: "Pintura", ofertaBase: 1000 },
    { nombre: "Editorial", ofertaBase: 1500 },
    { nombre: "Fotografía", ofertaBase: 500 },
    { nombre: "Branding", ofertaBase: 1200 },
    { nombre: "Arquitectura", ofertaBase: 2500 }
];

// selectores
const formContacto = document.getElementById("formulariocontacto");
const areaOferta = document.getElementById("contenedorOferta");

// funciones

// Calcula el total en USD aplicando el recargo
function calcularTotalUsd(monto) {
    return monto * tasaGestion;
}

// Convierte el monto de USD a Pesos Argentinos (ARS)
function convertirAPesos(montoUsd) {
    return montoUsd * valorDolarHoy;
}

// Resultados directamente en el HTML 
function mostrarEnPantalla(nombre, categorias, totalUsd, totalArs) {
    
    areaOferta.innerHTML = `
        <h3 style="font-family: 'Bebas Neue', cursive; color: #491311;">PROPUESTA PARA: ${nombre.toUpperCase()}</h3>
        <p>Hemos analizado tu interés en las categorías: <strong>${categorias.join(", ")}</strong>.</p>
        <hr style="border-color: #333;">
        <div style="display: flex; justify-content: space-between; gap: 20px;">
            <div>
                <p style="margin-bottom: 5px; color: #aaa; font-size: 0.8rem;">OFERTA EN USD</p>
                <h4 style="color: #fff;">USD $${totalUsd.toFixed(2)}</h4>
            </div>
            <div>
                <p style="margin-bottom: 5px; color: #aaa; font-size: 0.8rem;">TOTAL EN ARS</p>
                <h4 style="color: #491311;">$${totalArs.toLocaleString('es-AR')}</h4>
            </div>
        </div>
        <p style="font-size: 0.75rem; color: #666; margin-top: 15px;">
            * Los valores incluyen comisión por gestión. Tipo de cambio: 1 USD = $${valorDolarHoy} ARS.
        </p>
    `;
    
    //mostrar y animación
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

        // 
        if (acumuladoUsd > 0) {
            const finalUsd = calcularTotalUsd(acumuladoUsd);
            const finalArs = convertirAPesos(finalUsd);

            // localstorage
            const simulacion = {
                usuario: nombreArtista,
                categorias: detectadas,
                montoUsd: finalUsd,
                montoArs: finalArs,
                fecha: new Date().toLocaleDateString()
            };
            localStorage.setItem("ultimaSimulacion", JSON.stringify(simulacion));

            // salida
            mostrarEnPantalla(nombreArtista, detectadas, finalUsd, finalArs);
        } else {
            // mensaje general sin categorías
            areaOferta.innerHTML = `<p>Gracias ${nombreArtista}, recibimos tu mensaje general y te contactaremos pronto.</p>`;
            areaOferta.style.display = "block";
        }
    });
}

// verificamos persistencia
window.addEventListener('DOMContentLoaded', () => {
    const backup = localStorage.getItem("ultimaSimulacion");
    if (backup) {
        const datos = JSON.parse(backup);
        console.log("Recuperando última simulación del storage para: " + datos.usuario);
        
    }
});