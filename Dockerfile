# Use the official Node.js LTS image
FROM node:18-slim

WORKDIR /app

# Copy dependency definitions and install them
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (the app uses HTTPS on this port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
