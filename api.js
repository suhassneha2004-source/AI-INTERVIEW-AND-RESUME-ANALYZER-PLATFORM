/**
 * API Service Module
 * Handles all communication with the backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Upload resume file to backend for analysis
 * @param {File} file - The PDF file to upload
 * @returns {Promise<Object>} - Analysis results from AI
 */
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload-resume`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Upload failed');
    }

    return data.analysis;
  } catch (error) {
    console.error('Resume upload error:', error);
    throw error;
  }
};

/**
 * Check backend health
 * @returns {Promise<Boolean>} - True if backend is reachable
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error);
    return false;
  }
};

export default {
  uploadResume,
  checkBackendHealth,
  API_URL,
};
