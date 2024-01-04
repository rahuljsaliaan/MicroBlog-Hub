# Use a base image
FROM node:20-alpine

# Define working directory
WORKDIR /app

# Install dependencies
COPY ./package.json ./
RUN npm install

# Copy the files to container
COPY ./ ./

# Default command 
CMD ["npm", "start"]