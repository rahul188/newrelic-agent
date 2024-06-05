*!*README.md** 
=============== 
🎉 Welcome to New Relic Copilot Agent 🎉 
This is a Node.js application that uses the OpenAI API to enhance the functionality of the New Relic Copilot.

*!*Deployment Guide** 
----

### Step 1: Create a Dockerfile 🐳
Create a new file named `Dockerfile` in the root of your project with the following content:
```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./  
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
CMD ["node", "index.js"]
```
### Step 2: Build and Push Docker Image to Azure Container Registry 🚀

Build your Docker image by running the following command:
```bash
docker build -t <registry-name>.azurecr.io/newrelic-agent .
```
Replace `<registry-name>` with the name of your Azure Container Registry.

Push the image to your registry:
```bash
docker push <registry-name>.azurecr.io/newrelic-agent
```

### Step 3: Create an Azure Container App 🌐

Create a new Azure Container App using the following command:
```bash
az containerapp create \
  -name <app-name>  -resource-group <resource-group> \
  -image <registry-name>.azurecr.io/newrelic-agent \
  -environment-variables "OPENAI_API_KEY=<your-openai-api-key>"
```
Replace `<app-name>` with the desired name for your container app, `<resource-group>` with the resource group where you want to create the app, `<registry-name>` with the name of your Azure Container Registry, and `<your-openai-api-key>` with your actual OpenAI API key.

### Step 4: Configure Environment Variables (Optional) 🌈

If you want to set default values for environment variables in your Docker image, update `Dockerfile` accordingly:
```dockerfile
FROM node:14
# Set default value for OPENAI_API_KEY
ENV OPENAI_API_KEY=my_default_openai_api_key
WORKDIR /app
COPY package*.json ./  
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
CMD ["node", "index.js"]
```
Replace `my_default_openai_api_key` with your default OpenAI API key.

### Troubleshooting 🚨

If you encounter any issues during deployment, check the Azure Container App logs for errors:
```bash
az containerapp logs show -- <app-name> --resource-group <resource-group>
```
Replace `<app-name>` and `<resource-group>` with your actual values.

That's it! You've successfully deployed the New Relic Copilot Agent to an Azure Container App. 🎉