// src/data/DataManager.js
const axios = require('axios');

class DataManager {
  /**
   * 
   * @param {string} baseUrl - Bubble Data API base URL (e.g. "https://myapp.bubbleapps.io/api/1.1/obj")
   * @param {string} apiKey
   */
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
  * GET data from Bubble.
  *
  * - If `recordId` is provided, fetches a **single** record (ignores `constraints`).
  * - If `recordId` is **not** provided but `constraints` is an array (non-empty), fetches **multiple** records by constraints.
  * - If neither `recordId` nor `constraints` are provided, fetches **all** records in the table.
  *
  * @param {string} tableName - Name of the Bubble "thing" (e.g. "shape", "outputtemplate").
  * @param {string} [recordId] - Optional. If provided, fetches only that record.
  * @param {Array} [constraints=[]] - Optional. Bubble constraints array.
  * @returns {Promise<object|Array>} - Returns:
  *    - A single object if `recordId` was provided.
  *    - An array of objects if fetching multiple records.
  */
  async get(tableName, recordId, constraints = []) {
    try {
      // If we have a recordId, fetch single:
      if (recordId) {
        const url = `${this.baseUrl}/${tableName}/${recordId}`;
        const { data } = await axios.get(url, {
          headers: { Authorization: `Bearer ${this.apiKey}` },
        });
        // Bubble often returns { response: { <fields>... } }
        return data?.response;
      }
  
      // Otherwise, build the URL for multiple fetch:
      let url = `${this.baseUrl}/${tableName}`;
      if (constraints.length) {
        const encoded = encodeURIComponent(JSON.stringify(constraints));
        url += `?constraints=${encoded}`;
      }
  
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      // Bubble returns { response: { results: [...], ... } }
      return data?.response?.results || [];
    } catch (error) {
      console.error("DataManager.get error:", error?.response?.data || error.message);
      throw error;
    }
  }

  /**
   * POST (create) a single record
   * @param {string} tableName
   * @param {object} payload
   * @returns {Promise<object>}
   */
  async post(tableName, payload) {
    const url = `${this.baseUrl}/${tableName}`;
    try {
      const { data } = await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return data;
    } catch (error) {
      console.error("DataManager.post error:", error?.response?.data || error.message);
      throw error;
    }
  }

  /**
   * POST (create) multiple records (batch)
   * @param {string} tableName
   * @param {Array<object>} items
   * @returns {Promise<Array>}
   */
  async postBatch(tableName, items) {
    return Promise.all(items.map(item => this.post(tableName, item)));
  }

  /**
   * PATCH / PUT (update) a record
   * @param {string} tableName 
   * @param {string} recordId 
   * @param {object} updates 
   * @returns {Promise<object>}
   */
  async patch(tableName, recordId, updates) {
    const url = `${this.baseUrl}/${tableName}/${recordId}`;
    try {
      const { data } = await axios.patch(url, updates, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return data;
    } catch (error) {
      console.error("DataManager.patch error:", error?.response?.data || error.message);
      throw error;
    }
  }

  /**
   * DELETE a record
   * @param {string} tableName
   * @param {string} recordId
   * @returns {Promise<boolean>}
   */
  async delete(tableName, recordId) {
    const url = `${this.baseUrl}/${tableName}/${recordId}`;
    try {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return true;
    } catch (error) {
      console.error("DataManager.delete error:", error?.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = { DataManager };