const API_BASE_URL = 'https://0b5ff8b0.uqcloud.net/api';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ5MDA1MzQifQ.7GTR79tbb2Nk1o2mZKdpBqpbuHScsUhEFws7hMkYLvA';
const USERNAME = 's4900534';

/**
 * Helper function to make API requests.
 * It automatically includes the Authorization header and any request body.
 *
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} [method='GET'] - The HTTP method to use (GET, POST, PATCH, etc.).
 * @param {object} [body=null] - The request body to send (for POST/PATCH requests).
 * @returns {Promise<object>} - The JSON response from the API.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JWT_TOKEN}`,
    },
  };

  if (method === 'POST' || method === 'PATCH') {
    options.headers['Prefer'] = 'return=representation';
  }

  if (body) {
    options.body = JSON.stringify({ ...body, username: USERNAME });
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Fetch all projects.
 * @returns {Promise<Array>} - Returns an array of project objects.
 */
export async function getProjects() {
    try {
      const response = await apiRequest('/project');
      return response;
    } 
    catch (error) {
      console.error("Error in getProjects: ", error);
      throw error;
    }
}

/**
 * Fetch a single project by ID.
 * @param {string} id - The project ID.
 * @returns {Promise<object>} - Returns a single project object.
 */
export async function getProject(id) {
  return apiRequest(`/project?id=eq.${id}`);
}

/**
 * Create a new project.
 * @param {object} project - The project details.
 * @returns {Promise<object>} - The created project object.
 */
export async function createProject(project) {
  return apiRequest('/project', 'POST', project);
}

/**
 * Update a project.
 * @param {string} id - The project ID.
 * @param {object} updates - The project fields to update.
 * @returns {Promise<object>} - The updated project object.
 */
export async function updateProject(id, updates) {
  return apiRequest(`/project?id=eq.${id}`, 'PATCH', updates);
}

/**
 * Delete a project.
 * @param {string} id - The project ID.
 * @returns {Promise<void>}
 */
export async function deleteProject(id) {
  return apiRequest(`/project?id=eq.${id}`, 'DELETE');
}
