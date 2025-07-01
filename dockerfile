#FROM cgr.dev/chainguard/node:latest-dev AS build
FROM node:lts-bookworm-slim
WORKDIR /app
COPY . /app
USER root
RUN npm install
VOLUME ["/app/data"]
EXPOSE 3000
CMD ["npm", "start"]

# FROM cgr.dev/chainguard/node:latest
# COPY --from=build /app /usr/src/app
# WORKDIR /usr/src/app
# #RUN chown root:root /usr/src/app/data.json
# #RUN chmod 644 /usr/src/app/data.json
# USER root
# EXPOSE 3000
# CMD ["server.js"]