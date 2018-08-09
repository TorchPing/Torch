FROM alpine:3.8 as builder
ADD . /app
RUN apk --no-cache add nodejs yarn && \
    cd /app && yarn && yarn run build
 
FROM alpine:3.8
RUN apk --no-cache add ca-certificates nodejs
COPY --from=builder /app/dist /app

EXPOSE 3000
WORKDIR /app
CMD node /app/bin/run.js
