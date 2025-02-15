# Base image
FROM node:20-alpine3.18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
# RUN npx prisma migrate deploy 
RUN npx prisma generate
RUN yarn build

# Make start script executable
RUN chmod +x start.sh

# Start the server using the production build
CMD [ "./start.sh" ]
