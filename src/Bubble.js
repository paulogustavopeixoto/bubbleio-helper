// src/Bubble.js
const { DataManager } = require('./data/dataManager');
const { WorkflowManager } = require('./wf/workflowManager');

/**
 * The main Bubble helper class.
 * Example usage:
 * 
 *    const { Bubble } = require('bubble-sdk');
 *    const bubble = new Bubble({
 *      dataBaseUrl: "https://myapp.bubbleapps.io/api/1.1/obj",
 *      wfBaseUrl: "https://myapp.bubbleapps.io/api/1.1/wf",
 *      apiKey: "xxxxxxxxxxx"
 *    });
 * 
 *    await bubble.data.post("shape", { content: "Hello" });
 *    await bubble.wf.post("my-endpoint", { foo: "bar" });
 */
class Bubble {
  /**
   * @param {object} config
   * @param {string} config.dataBaseUrl - Base URL for Bubble Data API
   * @param {string} config.wfBaseUrl - Base URL for Bubble Workflow API
   * @param {string} config.apiKey - Bubble API key
   */
  constructor({ dataBaseUrl, wfBaseUrl, apiKey }) {
    if (!dataBaseUrl && !wfBaseUrl) {
      throw new Error("At least one of dataBaseUrl or wfBaseUrl must be provided.");
    }

    this.dataBaseUrl = dataBaseUrl;
    this.wfBaseUrl = wfBaseUrl;
    this.apiKey = apiKey;

    // Create managers, only if the corresponding URL is provided
    this.data = dataBaseUrl 
      ? new DataManager(dataBaseUrl, apiKey) 
      : null;
    this.wf = wfBaseUrl 
      ? new WorkflowManager(wfBaseUrl, apiKey)
      : null;
  }
}

module.exports = { Bubble };