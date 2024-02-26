FROM node:18-alpine
WORKDIR /fullstack-todo-server
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/index.js"]