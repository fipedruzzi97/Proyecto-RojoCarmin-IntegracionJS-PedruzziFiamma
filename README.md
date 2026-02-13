# Rojo Carmín - Proyecto Final Integrador JS

Este proyecto es la entrega final del curso de **JavaScript** en Coderhouse. Consiste en un simulador interactivo integrado en el sitio web de "Rojo Carmín", una plataforma dedicada al diseño editorial, arquitectura y arte. Dentro del formulario de contacto puedes solicitar un presupuesto para poder presentar tu proyecto (*Pintura, Editorial, Fotografía, Branding, Arquitectura*). Pueden visualizarlo 
en la siguiente página:  https://fipedruzzi97.github.io/Proyecto-RojoCarmin-IntegracionJS-PedruzziFiamma/


*El desarrollo de la interfaz (HTML y CSS) corresponde al proyecto final del curso de Desarrollo Web y se puede visualizar aquí:* https://github.com/fipedruzzi97/Entrega-Final-CH-PedruzziFiamma

---

## Funcionalidad Principal

El simulador (ubicado en la pestaña de **CONTACTO**) permite a los artistas presentar su obra y recibir una oferta estimada de forma automática.

1. **Entrada:** El usuario completa su nombre y un mensaje detallando su obra.
2. **Proceso:** El sistema analiza palabras clave en el mensaje (*Pintura, Editorial, Fotografía, Branding, Arquitectura*), obtiene los valores base desde una base de datos local (JSON), calcula el valor en USD, aplica una comisión de gestión y lo convierte a Pesos Argentinos (ARS).
3. **Salida:** Se renderiza una propuesta dinámica directamente en el DOM con los valores finales. Si no se detectan categorías, se emite un mensaje de recepción general.

*Además, el proyecto incluye un sistema de **Suscripción al Newsletter** en el footer, funcional en todas las páginas del sitio.*

---

## Tecnologías y Conceptos Aplicados

Para cumplir con la rúbrica del proyecto final, se aplicaron los siguientes conceptos:

* **Arquitectura de Código:** Separación estricta de responsabilidades (Lógica de negocio vs. Lógica de renderizado en el DOM).
* **Asincronía y Fetch:** Consumo de datos desde un archivo estático (`categorias.json`) simulando una petición a una API o base de datos externa. Incluye un rastreador de rutas dinámico para funcionar en distintos niveles de carpetas.
* **Librerías Externas:** Integración de **SweetAlert2** para el manejo de alertas personalizadas, confirmaciones de presupuesto y notificaciones de suscripción.
* **DOM & Eventos:** Captura de datos mediante formularios (`submit`), prevención de recargas automáticas (`preventDefault`) y actualización dinámica del HTML.
* **LocalStorage y JSON:** Persistencia de datos. Se guarda tanto la última cotización generada como el correo de los nuevos suscriptores, recuperando la información al recargar el sitio.

---

## Cómo probar el proyecto

> **IMPORTANTE:** Debido al uso de peticiones asincrónicas (`fetch`) para leer el archivo JSON, el proyecto **debe ser ejecutado a través de un servidor local** (como la extensión *Live Server* de VS Code). Si se abre el archivo HTML directamente en el navegador, las políticas de seguridad bloquearán la carga de las categorías.


1. Clona este repositorio o descárgalo en formato ZIP.
2. Abre la carpeta en Visual Studio Code.
3. Haz clic derecho sobre el archivo `index.html` o `contacto.html` y selecciona **"Open with Live Server"**.
4. Navega a la sección de **Contacto**.
5. En el formulario, asegúrate de incluir una de las siguientes palabras clave en tu mensaje: *Pintura, Editorial, Fotografía, Branding o Arquitectura*.
6. Haz clic en **Enviar** y observa la alerta de SweetAlert confirmando la creación de la propuesta y el renderizado en pantalla.
7. También puedes probar el formulario de **Suscripción** en el pie de página de cualquier sección del sitio.

Desarrollado por Fiamma Pedruzzi 
