FROM alpine:3.6
## Its to generate root directory ##
RUN cd /root && touch ".builded.$(date +%F_%R)" && cd / && \
    apk --update add --no-cache \
        nodejs nodejs-npm
#COPY package.json /app/package.json
#WORKDIR /app
#RUN npm install && \
    ## stylus and dependencies ##
#    npm -g install stylus && \
#    npm -g install nib && \
#    npm cache clean
#COPY . /app
#EXPOSE 8080
#CMD ["npm", "run", "start"]