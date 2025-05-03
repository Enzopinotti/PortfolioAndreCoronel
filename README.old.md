# 🌐 Portfolio André Coronel

Este proyecto es un portfolio profesional desarrollado en **React.js**, diseñado para mostrar proyectos, habilidades y contacto de forma dinámica y autogestionable. Utiliza **Google Sheets como base de datos** y **Google Apps Script como backend serverless**, lo que permite editar la información desde una hoja de cálculo, sin necesidad de un backend tradicional.

---

## 🚀 Tecnologías utilizadas

- React.js (Create React App)
- Sass (`@use` para organización modular)
- Google Sheets (como base de datos editable)
- Google Apps Script (API custom sin servidores)
- FileZilla + DonWeb (para deploy estático)
- GitHub (control de versiones)

---

## 📁 Estructura del proyecto

src/
├─ assets/ → Imágenes, fuentes
├─ components/ → Componentes reutilizables
├─ pages/ → Secciones principales (Home, Projects, Contact)
├─ hooks/ → Hooks personalizados
├─ utils/ → Funciones generales
├─ styles/ → Sass modular con variables y mixins
├─ App.js
└─ index.js

## 📄 Cómo correr el proyecto localmente

```bash
git clone https://github.com/Enzopinotti/PortfolioAndreCoronel.git
cd PortfolioAndreCoronel
npm install
npm start

## ☁️ Deploy

Este proyecto está pensado para ser subido directamente a un hosting estático, como los ofrecidos por planes de revendedor en DonWeb:

```bash
npm run build
# Luego subir el contenido de /build a public_html usando FileZilla

## ☁️ Deploy

Este proyecto está pensado para ser subido directamente a un hosting estático, como los ofrecidos por planes de revendedor en DonWeb:

```bash
npm run build
# Luego subir el contenido de /build a public_html usando FileZilla

## 👨‍💻 Sobre el autor

**Enzo Daniel Pinotti**  
📍 La Plata, Buenos Aires  
📧 [enzopinottii@gmail.com](mailto:enzopinottii@gmail.com)  
🌐 [enzopinotti.dev](https://enzopinotti.dev)  
🔗 [LinkedIn](https://www.linkedin.com/in/en-zo-daniel-pinotti-667270179/)  
🐙 [GitHub](https://github.com/Enzopinotti)

Soy Ingeniero Industrial con formación en Ingeniería en Sistemas (UTN FRLP) y experiencia como **desarrollador full-stack**, trabajando con tecnologías como **React, Node.js, MongoDB y MySQL**. Me destaco por integrar soluciones eficientes en equipo con diseño, marketing y data, aportando enfoque técnico y estratégico con mentalidad ágil.
