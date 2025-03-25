# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies, run build, and generate Prisma files in a single RUN command
RUN npm install --ignore-scripts && \
    npm run build && \
    npx prisma generate

# Copy the rest of the application code, excluding files specified in .dockerignore
COPY . .

# Expose the necessary port (assuming your app uses 4000)
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
