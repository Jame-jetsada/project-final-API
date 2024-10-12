FROM node:20.14.0
WORKDIR /app

COPY . .

RUN npm ci && npm cache clean --force
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]