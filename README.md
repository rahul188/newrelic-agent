NewRelic Copilot Agent
=============== 
🎉 Welcome to New Relic Copilot Agent 🎉

This is a Node.js application that uses the OpenAI API to enhance the functionality of the New Relic Copilot.

----
### Step 1: Build and Push Docker Image to Azure Container Registry 📦
Build your Docker image using the existing `Dockerfile` in your project.
Push the image to your Azure Container Registry:
```bash
docker push <registry-name>.azurecr.io/newrelic-agent
```
Replace `<registry-name>` with the name of your Azure Registry.

### Step 2: Create an Azure Container App 🌐
Create a new Azure Container App using the following command:
```bash
az containerapp create \
   -name <app-name> \
   -resource-group <resource-group> \
   -image <registry-name>.azurecr.io/newrelic-agent \
   -environment-variables "OPENAI_API_KEY=<your-openai-api-key>"
```
Replace `<app-name>` with the desired name for your container app, `<resource-group>` with the resource group where you want to create the app, `<registry-name>` with the name of your Azure Container Registry, and `<your-openai-key>` with your actual OpenAI API key.

### Step 3: Configure Environment Variables (Optional) 🌈
If you want to set default values for environment variables in your Docker image, update your `index.js` file accordingly:
```javascript
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error('OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}
// Use the OpenAI API key
app.get('/', (req, res) => {
  res.send(openaiApiKey);
});
```

### Troubleshooting 🚨

If you encounter any issues during deployment, check the Azure Container App logs for errors:
```bash
az containerapp logs show -- <app-name> --resource-group <resource-group>
```
Replace `<app-name>` and `<resource-group>` with your actual values.

That's it! You've successfully deployed the New Relic Copilot Agent to an Azure Container App. 🎉
