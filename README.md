# 🌐 Portfolio André Coronel

Portfolio profesional desarrollado para **André Coronel**, construido con **React.js** y diseñado para mostrar proyectos, habilidades y contacto de manera clara, moderna y autogestionable.

La particularidad del proyecto es su arquitectura liviana: utiliza **Google Sheets como fuente de datos editable** y **Google Apps Script como backend serverless**, permitiendo actualizar contenido sin necesidad de un panel tradicional ni de un servidor dedicado.

---

## 🚀 Características principales

- **Interfaz moderna y responsive**: Una experiencia visual limpia y profesional.
- **Estructura orientada a portfolio**: Secciones optimizadas para proyectos, habilidades y contacto.
- **Contenido editable**: Gestión dinámica mediante Google Sheets.
- **Backend Serverless**: Integración con Google Apps Script.
- **Arquitectura liviana**: Fácil de mantener y rápida de cargar.
- **Deploy estático**: Compatible con cualquier hosting tradicional.

---

## 🧰 Tecnologías utilizadas

- **React.js**
- **React Router DOM**
- **Sass**
- **Google Sheets**
- **Google Apps Script**
- **GitHub**
- **FileZilla**
- **DonWeb**

---

## 🏗️ Arquitectura del proyecto

El frontend fue desarrollado en **React.js**, mientras que la capa de datos se resolvió con una arquitectura serverless basada en herramientas de Google:

- **Google Sheets** funciona como base de datos editable.
- **Google Apps Script** expone los datos mediante una API personalizada.
- **React** consume esa información y renderiza el contenido dinámicamente.

Este enfoque permite modificar textos, proyectos o información de contacto sin tocar directamente el código del sitio.

---

## 📁 Estructura del proyecto

```bash
src/
├─ assets/        # Imágenes, íconos y recursos gráficos
├─ components/    # Componentes reutilizables
├─ pages/         # Secciones principales del sitio
├─ hooks/         # Hooks personalizados
├─ utils/         # Funciones auxiliares
├─ styles/        # Sass modular con variables y mixins
├─ App.js
└─ index.js
```

---

## ▶️ Cómo correr el proyecto localmente

```bash
git clone https://github.com/Enzopinotti/PortfolioAndreCoronel.git
cd PortfolioAndreCoronel
npm install
npm start
```

Luego abrí el navegador en: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuración del contenido dinámico

El proyecto está pensado para consumir datos desde una hoja de cálculo de Google mediante un endpoint generado con Google Apps Script.

**Flujo general:**

1.  Crear o duplicar la hoja de Google Sheets.
2.  Configurar las columnas necesarias para proyectos, habilidades y datos de contacto.
3.  Publicar un script en Google Apps Script como Web App.
4.  Usar esa URL como endpoint de consulta desde el frontend.

> [!TIP]
> Según la implementación actual, es posible que debas ajustar la URL del endpoint en el código fuente antes de ejecutar o desplegar el proyecto.

---

## ☁️ Deploy

Este proyecto está preparado para deploy estático en servicios de hosting tradicionales.

### 🛠️ Build de producción

```bash
npm run build
```

### 🚀 Subida al hosting

Subir el contenido generado en la carpeta `build/` al directorio público del hosting, por ejemplo: `public_html/`.

**Herramientas utilizadas en este proyecto:**

- **FileZilla** para la transferencia de archivos.
- **DonWeb** como proveedor de hosting.

---

## ✅ Casos de uso del proyecto

Este portfolio fue pensado para profesionales que necesitan:

- Mostrar sus trabajos de forma clara y moderna.
- Actualizar contenido sin depender de un desarrollador.
- Evitar la complejidad de un backend tradicional.
- Mantener una solución económica y fácil de desplegar.

---

## 👨‍💻 Desarrollo

**Desarrollado por Enzo Daniel Pinotti**

- 🌐 **Portfolio**: [enzopinotti.dev](https://enzopinotti.dev)
- 📧 **Email**: enzopinottii@gmail.com
- 💼 **LinkedIn**: [Enzo Daniel Pinotti](https://linkedin.com/in/enzopinotti)
- 🐙 **GitHub**: [Enzopinotti](https://github.com/Enzopinotti)

---

## 📌 Nota

Este repositorio contiene el desarrollo técnico del portfolio de André Coronel.
La implementación fue realizada con foco en simplicidad operativa, mantenimiento ágil y una experiencia visual profesional.
