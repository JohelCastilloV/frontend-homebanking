FROM node:alpine as frontend-build
ARG API_URL 
ARG GOOGLE_MAP_KEY 
ENV REACT_APP_API_URL $API_URL
ENV REACT_APP_GOOGLE_MAP_KEY $GOOGLE_MAP_KEY
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build


FROM nginx:alpine
COPY --from=frontend-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
