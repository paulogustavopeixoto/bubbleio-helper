// src/wf/WorkflowManager.js
const axios = require('axios');

class WorkflowManager {
  /**
   * 
   * @param {string} baseUrl - Bubble Workflow API base URL (e.g. "https://myapp.bubbleapps.io/api/1.1/wf")
   * @param {string} apiKey
   */
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * POST to a workflow endpoint
   * @param {string} endpointName - Name of the workflow endpoint, e.g. "my-endpoint"
   * @param {object} payload
   * @returns {Promise<object>}
   */
  async post(endpointName, payload) {
    const url = `${this.baseUrl}/${endpointName}`;
    try {
      const { data } = await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return data;
    } catch (error) {
      console.error("WorkflowManager.post error:", error?.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = { WorkflowManager };