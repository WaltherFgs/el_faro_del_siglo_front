# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Install all dependencies (including devDependencies for building)
RUN npm install
COPY . .
# Build the application for production
RUN npm run build

# Stage 2: Serve the application with Node.js
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Install only production dependencies (express, etc.)
RUN npm install --only=production
# Copy the built artifacts from the build stage
COPY --from=build /app/dist ./dist
COPY server.js .

EXPOSE 3000
CMD ["node", "server.js"]
