FROM node:18-alpine

# Create and use a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files and install dependencies securely
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy Prisma schema before running `prisma generate`
COPY prisma ./prisma
RUN npx prisma generate

# Copy remaining necessary files
COPY tsconfig.json ./
COPY src ./src
COPY config ./config
COPY inversify.config.ts inversify.types.ts ./

# Change ownership of the app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

EXPOSE 4000

CMD ["npm", "start"]
