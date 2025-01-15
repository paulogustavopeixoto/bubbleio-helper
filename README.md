```
__/\\\\\\\\\\\\\____/\\\________/\\\__/\\\\\\\\\\\\\____/\\\\\\\\\\\\\____/\\\______________/\\\\\\\\\\\\\\\__/\\\\\\\\\\\_______/\\\\\_____________________/\\\________/\\\__/\\\\\\\\\\\\\\\__/\\\______________/\\\\\\\\\\\\\____/\\\\\\\\\\\\\\\____/\\\\\\\\\_____        
 _\/\\\/////////\\\_\/\\\_______\/\\\_\/\\\/////////\\\_\/\\\/////////\\\_\/\\\_____________\/\\\///////////__\/////\\\///______/\\\///\\\__________________\/\\\_______\/\\\_\/\\\///////////__\/\\\_____________\/\\\/////////\\\_\/\\\///////////___/\\\///////\\\___       
  _\/\\\_______\/\\\_\/\\\_______\/\\\_\/\\\_______\/\\\_\/\\\_______\/\\\_\/\\\_____________\/\\\_________________\/\\\_______/\\\/__\///\\\________________\/\\\_______\/\\\_\/\\\_____________\/\\\_____________\/\\\_______\/\\\_\/\\\_____________\/\\\_____\/\\\___      
   _\/\\\\\\\\\\\\\\__\/\\\_______\/\\\_\/\\\\\\\\\\\\\\__\/\\\\\\\\\\\\\\__\/\\\_____________\/\\\\\\\\\\\_________\/\\\______/\\\______\//\\\__/\\\\\\\\\\\_\/\\\\\\\\\\\\\\\_\/\\\\\\\\\\\_____\/\\\_____________\/\\\\\\\\\\\\\/__\/\\\\\\\\\\\_____\/\\\\\\\\\\\/____     
    _\/\\\/////////\\\_\/\\\_______\/\\\_\/\\\/////////\\\_\/\\\/////////\\\_\/\\\_____________\/\\\///////__________\/\\\_____\/\\\_______\/\\\_\///////////__\/\\\/////////\\\_\/\\\///////______\/\\\_____________\/\\\/////////____\/\\\///////______\/\\\//////\\\____    
     _\/\\\_______\/\\\_\/\\\_______\/\\\_\/\\\_______\/\\\_\/\\\_______\/\\\_\/\\\_____________\/\\\_________________\/\\\_____\//\\\______/\\\________________\/\\\_______\/\\\_\/\\\_____________\/\\\_____________\/\\\_____________\/\\\_____________\/\\\____\//\\\___   
      _\/\\\_______\/\\\_\//\\\______/\\\__\/\\\_______\/\\\_\/\\\_______\/\\\_\/\\\_____________\/\\\_________________\/\\\______\///\\\__/\\\__________________\/\\\_______\/\\\_\/\\\_____________\/\\\_____________\/\\\_____________\/\\\_____________\/\\\_____\//\\\__  
       _\/\\\\\\\\\\\\\/___\///\\\\\\\\\/___\/\\\\\\\\\\\\\/__\/\\\\\\\\\\\\\/__\/\\\\\\\\\\\\\\\_\/\\\\\\\\\\\\\\\__/\\\\\\\\\\\____\///\\\\\/___________________\/\\\_______\/\\\_\/\\\\\\\\\\\\\\\_\/\\\\\\\\\\\\\\\_\/\\\_____________\/\\\\\\\\\\\\\\\_\/\\\______\//\\\_ 
        _\/////////////_______\/////////_____\/////////////____\/////////////____\///////////////__\///////////////__\///////////_______\/////_____________________\///________\///__\///////////////__\///////////////__\///______________\///////////////__\///________\///__
````

# bubbleio-helper

## Overview
bubbleio-helper is a Node.js package that provides a simple yet powerful interface for interacting with Bubble applications’ Data and Workflow APIs. It allows you to create, retrieve, update, and delete Bubble “things” (database records), as well as trigger Workflow endpoints. Designed to be highly configurable, bubbleio-helper makes it easy to integrate Bubble’s server-side functionality into your Node.js projects.

## Installation
To integrate Cipher Factory into your project, run the following command:

```bash
npm install bubbleio-helper --save
```

This command will download and install bubbleio-helper, making it ready for use in your Node.js applications.

## Usage
After installing bubbleio-helper, you can initialize a Bubble client by providing the Data API and/or Workflow API base URLs as well as your API key. You can then call any of the Data or Workflow methods without needing to pass these credentials every time.

```
const { Bubble } = require('bubbleio-helper');

// Example environment variables or hardcoded values
const bubble = new Bubble({
  dataBaseUrl: "https://myapp.bubbleapps.io/api/1.1/obj", // For Data API calls
  wfBaseUrl:   "https://myapp.bubbleapps.io/api/1.1/wf",  // For Workflow calls
  apiKey:      process.env.BUBBLE_API_KEY,                // Your Bubble API key
});

// --- Data API Examples ---

// Creating a record
async function createRecord() {
  const result = await bubble.data.post('shape', {
    content: 'My New Shape',
    type: 'text'
  });
  console.log('Created record:', result);
}

// Fetching records with constraints
async function fetchRecords() {
  const shapes = await bubble.data.get('shape', null, [
    { key: 'type', constraint_type: 'equals', value: 'text' }
  ]);
  console.log('Fetched shapes:', shapes);
}

// Fetching a single record by ID
async function fetchSingleRecord() {
  const shape = await bubble.data.get('shape', 'UNIQUE_RECORD_ID');
  console.log('Fetched single shape:', shape);
}

// Batch creation
async function createMultipleShapes() {
  const data = [
    { content: 'Shape 1', type: 'image' },
    { content: 'Shape 2', type: 'text' },
  ];
  const results = await bubble.data.postBatch('shape', data);
  console.log('Batch created shapes:', results);
}

// Updating a record
async function updateRecord() {
  const updated = await bubble.data.patch('shape', 'UNIQUE_RECORD_ID', {
    content: 'Updated content',
    type: 'text'
  });
  console.log('Updated record:', updated);
}

// Deleting a record
async function deleteRecord() {
  const success = await bubble.data.delete('shape', 'UNIQUE_RECORD_ID');
  console.log('Deleted record successfully?', success);
}

// --- Workflow API Example ---

async function triggerWorkflow() {
  // Suppose you have a workflow endpoint named "process-data"
  const result = await bubble.wf.post('process-data', { foo: 'bar' });
  console.log('Workflow triggered, response:', result);
}

(async () => {
  // Call any of the above functions as needed
  await createRecord();
  await fetchRecords();
  await fetchSingleRecord();
  await createMultipleShapes();
  await updateRecord();
  await deleteRecord();
  await triggerWorkflow();
})();
```

## API Reference

**Bubble Class**

```
new Bubble({ dataBaseUrl, wfBaseUrl, apiKey })
```

### Parameters

- **dataBaseUrl (string)** – Required if you want to use Data API methods.  
  Example: `https://myapp.bubbleapps.io/api/1.1/obj`

- **wfBaseUrl (string)** – Required if you want to use Workflow API methods.  
  Example: `https://myapp.bubbleapps.io/api/1.1/wf`

- **apiKey (string)** – Your Bubble API key, obtained from your Bubble app settings.

---

### Data Methods

All Data methods are accessed via `bubble.data.*`.

1. **get(tableName, recordId, constraints)**
   - `tableName (string)` – The Bubble “thing” name, e.g. `"shape"`.
   - `recordId (string | null)` – If provided, fetches a single record. Otherwise, fetches multiple records.
   - `constraints (Array | [])` – An optional array of constraints for filtering (ignored if `recordId` is provided).
   - **Returns** either a single object or an array of objects depending on whether `recordId` is provided.

2. **post(tableName, payload)**
   - `tableName (string)` – The Bubble “thing” name.
   - `payload (object)` – The fields to create in Bubble.
   - **Returns** the newly created record data.

3. **postBatch(tableName, items)**
   - `tableName (string)` – The Bubble “thing” name.
   - `items (Array)` – An array of payload objects for batch creation.
   - **Returns** an array of responses from each creation.

4. **patch(tableName, recordId, updates)**
   - `tableName (string)` – The Bubble “thing” name.
   - `recordId (string)` – The ID of the record to update.
   - `updates (object)` – The fields to update.
   - **Returns** the updated record data.

5. **delete(tableName, recordId)**
   - `tableName (string)` – The Bubble “thing” name.
   - `recordId (string)` – The ID of the record to delete.
   - **Returns** a boolean indicating success.

---

### Workflow Methods

All Workflow methods are accessed via `bubble.wf.*`.

1. **post(endpointName, payload)**
   - `endpointName (string)` – The name or path of the Bubble workflow endpoint, e.g. `"start-flow"`.
   - `payload (object)` – The data to send to the workflow.
   - **Returns** the response data from Bubble.

## Contributing
We welcome contributions to the bubbleio-helper project! If you find a bug, have a feature request, or want to submit a pull request, please visit my GitHub repository.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.