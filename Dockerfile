# Used a lightweight and secure Node.js base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only necessary files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of our application
COPY . .

# Build the Next.js app
RUN npm run build

# Use a smaller runtime image for the final container
FROM node:20-alpine AS runner

WORKDIR /app

# Copy the built app and production node_modules
COPY --from=builder /app ./

# Expose the default Next.js port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
