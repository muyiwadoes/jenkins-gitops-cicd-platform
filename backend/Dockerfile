# Stage 1: Install production dependencies
FROM node:22-bookworm-slim AS backend-production-deps

# setup the working dir
WORKDIR /app

# production packages install
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Stage 2: Build the production runtime image
FROM node:22-bookworm-slim AS backend-runtime

# setup the working dir
WORKDIR /app
ENV NODE_ENV=production

# copy production dependency packages
COPY --from=backend-production-deps --chown=node:node /app/node_modules ./node_modules

# Copy app files with non-root ownership.
COPY --chown=node:node package.json ./
COPY --chown=node:node server.js ./
COPY --chown=node:node config ./config
COPY --chown=node:node controllers ./controllers
COPY --chown=node:node models ./models
COPY --chown=node:node routes ./routes
COPY --chown=node:node services ./services
COPY --chown=node:node utils ./utils

# Run as the unprivileged Node.js user rather than root.
USER node

# Port to be used by the Express application
EXPOSE 8080

# Start the APP directly; Nodemon is not needed in production.
# Inject environment variables at runtime through Compose or Kubernetes.
CMD ["node", "server.js"]
