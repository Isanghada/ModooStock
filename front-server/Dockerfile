FROM node:18.12.1 as build-stage
WORKDIR /var/jenkins_home/workspace/modoostock-deploy/front-server
COPY package*.json ./

# RUN npm install -g yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

RUN yarn install
COPY . .
RUN yarn build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/modoostock-deploy/front-server/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/modoostock-deploy/front-server/deploy-conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]