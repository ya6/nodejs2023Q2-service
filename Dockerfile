FROM node:18-alpine as build

RUN apk add curl bash
#
RUN apk update  &&  apk upgrade  && rm -rf /tmp/npm*


# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN  npm i -g @nestjs/cli

RUN npm run build

# run node prune
RUN /usr/local/bin/node-prune

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map



FROM node:18-alpine AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json /usr/src/app/
COPY --from=build /usr/src/app/dist/ /usr/src/app/dist/
COPY --from=build /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=build /usr/src/app/.env /usr/src/app/



CMD [ "node", "dist/main.js" ]
