# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# STAGE 1 - build the react app 
# set the base image to build from 
# This is the application image from which all other subsequent 
# applications run. Alpine Linux is a security-oriented, lightweight #(~5Mb) Linux distribution.
FROM node:14.1-alpine AS builder

# set working directory
# this is the working folder in the container from which the app.   # will be running from
WORKDIR /app

# copy package.json file to /app directory for installation prep
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2 - build the final image using a nginx web server 
# distribution and copy the react build files
FROM nginx:1.17-alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# needed this to make React Router work properly 
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf
# Containers run nginx with global directives and daemon off
# ENTRYPOINT ["nginx", "-g", "daemon off;"]