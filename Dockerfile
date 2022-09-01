#FROM node:14-alpine AS development
#ENV NODE_ENV development
## Add a work directory
#WORKDIR /app
## Cache and Install dependencies
#COPY package.json .
#
#RUN npm install
#RUN npm fund
#RUN npm audit fix
## Copy app files
#COPY . .
## Expose port
#EXPOSE 80
## Start the app
#CMD [ "npm", "start" ]

FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM ngnix
EXPOSE 80
COPY --from=builder /app/build /usr/share/ngnix/html