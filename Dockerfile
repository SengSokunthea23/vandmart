# Use a lightweight base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# 🔥 Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

CMD ["npm", "start"]
