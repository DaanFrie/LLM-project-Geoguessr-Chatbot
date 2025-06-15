import { AzureOpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";


const vectorStoreSavePath = "./vectorstore"; // waar je vectordatabase komt te staan

const embeddings = new AzureOpenAIEmbeddings({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
});

async function createVectorStore() {
    try {
        console.log("Start loading document...");

        const loader = new TextLoader("./example.txt");
        const docs = await loader.load();

        console.log("Document loaded, content preview:", docs[0].pageContent.slice(0, 200));

        // rest van code...

    } catch (error) {
        console.error("Failed to create vectorstore:", error);
    }
}

createVectorStore();

