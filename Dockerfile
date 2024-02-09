FROM  node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev init

EXPOSE 5000
CMD ["npm", "run", "start"]
