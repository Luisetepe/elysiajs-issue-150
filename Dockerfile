FROM oven/bun:latest as base

FROM base as deps-builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --production --frozen-lockfile

FROM deps-builder as app-builder
WORKDIR /app
COPY . .
RUN bun build.ts

FROM base as app-runner
WORKDIR /app
COPY --from=app-builder /app/dist .
ENTRYPOINT [ "bun" ]
EXPOSE 8080
CMD [ "server/index.js" ]