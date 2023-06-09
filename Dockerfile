# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build chat-backend`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t chat-backend`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system chat-backend && \
          adduser --system -G chat-backend chat-backend

COPY dist/chat-backend chat-backend
RUN chown -R chat-backend:chat-backend .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix chat-backend --omit=dev -f install

CMD [ "node", "chat-backend" ]
