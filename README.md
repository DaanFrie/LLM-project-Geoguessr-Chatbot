# GeoGuessr Chatbot

Een chatbot waarmee je alles kunt vragen over GeoGuessr! Deze applicatie helpt je landen herkennen aan de hand van visuele aanwijzingen uit street view beelden.

## Functies

- Stel vragen over GeoGuessr locaties zoals herkennen van landen op basis van:
  - Rijsituatie (links of rechts rijden)
  - Klimaat en vegetatie
  - Wegen (kwaliteit, aanwezigheid van fietspaden)
  - Verkeersborden (taal, stijl)
  - Elektriciteitspalen (boven- of ondergronds, type)
- Chatgeschiedenis wordt opgeslagen en bijgehouden met rollen zoals system, human en assistent.
- Streaming: antwoorden verschijnen woord voor woord.
- Gebruikt embeddings van een eigen document (`example.txt`).
- API-sleutels worden veilig opgeslagen in een `.env` bestand.

Installatie-instructies

Installeer de benodigde pakketten:

npm install

Maak een .env bestand aan:

AZURE_OPENAI_API_KEY=jouw-api-sleutel AZURE_OPENAI_API_INSTANCE_NAME=jouw-instantie-naam AZURE_OPENAI_API_DEPLOYMENT_NAME=jouw-deployment-naam AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME=jouw-embeddings-deployment AZURE_OPENAI_API_VERSION=jouw-api-versie

Maak de vectorstore aan:

node --env-file=.env makeVector.js

Start de server+client:

npm run server npm run dev

Open de client/index.html met Live Server of host de applicatie
