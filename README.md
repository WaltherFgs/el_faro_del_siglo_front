# 🏛️ Almanaque Franklin - Frontend

Aplicación web desarrollada en Angular para visualizar el "Almanaque Franklin".

## 🚀 Requisitos Previos

- Node.js y npm
- Angular CLI (opcional, pero recomendado)

## 🛠️ Instalación

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

## ⚙️ Configuración de Entornos (Environments)

La aplicación se conecta automáticamente a la API correcta según el modo de ejecución:

### 1. Desarrollo (Local)
Al ejecutar `npm start` o `ng serve`:
- Usa el archivo: `src/environments/environment.development.ts`
- **Apunta a:** `http://localhost:3000` (Tu backend local)

### 2. Producción (Despliegue)
Al ejecutar `npm run build`:
- Usa el archivo: `src/environments/environment.ts`
- **Apunta a:** `https://tyd-backend-url.com` (Tu backend remoto/producción)

> Si necesitas cambiar estas URLs, edita directamente los archivos en `src/environments/`.

## ▶️ Ejecución

Para iniciar el servidor de desarrollo y trabajar localmente:
```bash
npm start
```
Navega a `http://localhost:4200/`.

## 📦 Construcción (Build)

Para generar los archivos estáticos optimizados para producción:
```bash
npm run build
```
Los archivos generados se guardarán en el directorio `dist/`.
