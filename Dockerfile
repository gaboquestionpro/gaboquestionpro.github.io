# Node.js runtime as a parent image
FROM node:20.10.0

# Set port as ARG
ARG PORT=3000

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm i

# Install serve globally
RUN npm install -g serve

# Copy application files and directories
COPY . .

# Run build
RUN npm run build

# Expose Port
EXPOSE ${PORT}

# Initialize Frontend
CMD [ "serve", "-s", "dist" ]
