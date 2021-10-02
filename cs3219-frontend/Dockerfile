FROM node:14.17.3-buster as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --silent
RUN npm install react-scripts -g --slient

COPY . .

RUN yarn build

# NGINX Web Server
FROM nginx:1.17.8-alpine as prod

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




# Dockerfile for React client

# # Build react client
# FROM node:14.17.0-alpine

# # Working directory be app
# WORKDIR /usr/src/app

# COPY package*.json ./

# ###  Installing dependencies

# RUN npm install --silent

# # copy local files to app folder
# COPY . .

# EXPOSE 3000

# CMD ["npm","start"]

# # NGINX Web Server
# FROM nginx:1.12-alpine as prod

# COPY --from=build /app/build /usr/share/nginx/html
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]