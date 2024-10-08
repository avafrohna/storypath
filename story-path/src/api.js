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
    const requestBody = { 
      ...body, 
      username: USERNAME
    };
    options.body = JSON.stringify(requestBody);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (response.status === 204) {
    return null;
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
  }
}

/**
 * Fetch a single project by ID.
 * @param {string} id - The project ID.
 * @returns {Promise<object>} - Returns a single project object.
 */
export async function getProject(id) {
  return await apiRequest(`/project?id=eq.${id}`);
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
  try {
    await apiRequest(`/project?id=eq.${id}`, 'PATCH', updates);
  } 
  catch (error) {
    console.error(`Error updating project with ID ${id}: `, error);
  }
}

/**
 * Delete a project.
 * @param {string} id - The project ID.
 * @returns {Promise<void>}
 */
export async function deleteProject(id) {
  try {
    await apiRequest(`/project?id=eq.${id}`, 'DELETE');
  } 
  catch (error) {
    console.error(`Error deleting project with ID ${id}: `, error);
  }
}

/**
 * Fetch all locations.
 * @returns {Promise<Array>} - Returns an array of project objects.
 */
export async function getLocations() {
  try {
    const response = await apiRequest('/location');
    return response;
  }
  catch (error) {
    console.error("Error in getLocations: ", error);
  }
}

/**
 * Fetch a single location by ID.
 * @param {string} id - The location ID.
 * @returns {Promise<object>} - Returns a single location object.
 */
export async function getLocation(id) {
  return await apiRequest(`/location?id=eq.${id}`);
}

/**
 * Create a new location.
 * @param {object} location - The location details.
 * @returns {Promise<object>} - The created location object.
 */
export async function createLocation(location) {
  return apiRequest('/location', 'POST', location);
}

/**
 * Delete a location.
 * @param {string} id - The project ID.
 * @returns {Promise<void>}
 */
export async function deleteLocation(locationId) {
  try {
    await apiRequest(`/location?id=eq.${locationId}`, 'DELETE');
  } 
  catch (error) {
    console.error(`Error deleting location with ID ${locationId}: `, error);
  }
}

/**
 * Update a location.
 * @param {string} id - The location ID.
 * @param {object} updates - The location fields to update.
 * @returns {Promise<object>} - The updated location object.
 */
export async function updateLocation(locationId, updates) {
  try {
    const response = await apiRequest(`/location?id=eq.${locationId}`, 'PATCH', updates);
    return response;
  } 
  catch (error) {
    console.error(`Error updating location with ID ${locationId}:`, error);
  }
}
