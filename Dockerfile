# Use an official Node.js runtime
FROM node:23-alpine

# Add CA certs (HTTPS trust) and a few basics
RUN apk add --no-cache ca-certificates && update-ca-certificates

# Set working dir & env
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
# Use npm ci when you have a package-lock.json; fallback to npm install otherwise
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# Copy the rest
COPY . .

# Expose backend port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
