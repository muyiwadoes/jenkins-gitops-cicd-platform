# Stage 1: Build the frontend application
FROM node:22-bookworm-slim AS frontend-builder

# setup the working dir
WORKDIR /app

# Packages install
COPY package.json package-lock.json ./
RUN npm ci

# code
COPY . .

# Set the API address for the frontend build
ARG VITE_API_PATH=http://localhost:31100
ENV VITE_API_PATH=${VITE_API_PATH}

# Build the production frontend files
RUN npm run build

# Stage 2: Serve the production frontend
FROM nginx:1.28-alpine AS frontend-runtime

# copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy the built frontend files
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Port
EXPOSE 80

# App
CMD ["nginx", "-g", "daemon off;"]
