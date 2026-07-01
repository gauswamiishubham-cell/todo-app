# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN printf 'server {\nlisten 80;\nroot /usr/share/nginx/html;\nindex index.html;\nlocation / {\ntry_files $uri $uri/ /index.html;\n}\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
