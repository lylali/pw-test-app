FROM mcr.microsoft.com/playwright:v1.45.3-jammy

USER root

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force --unsafe-perm
RUN chmod +x ./node_modules/.bin/ng
RUN npx playwright install --with-deps