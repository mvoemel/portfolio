FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./

# Omit --production flag for TypeScript devDependencies
RUN npm install

COPY . .

# Next.js telemetry (Learn more here: https://nextjs.org/telemetry), uncomment following line to disable
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

# Build Next.js
RUN npm run build

# Start Next.js
CMD npm run start