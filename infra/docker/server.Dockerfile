FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY server/src ./src

# Copy database migration and seed files
COPY server/db ./db

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]