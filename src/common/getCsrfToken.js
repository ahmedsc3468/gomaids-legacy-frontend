import config from "../config.json";
import axios from "axios";

// Function to fetch CSRF token from the /csrf-token API
function fetchCsrfToken() {
    return axios.get('http://127.0.0.1:8000/api/csrf-token')
    .then(response => {
        // Handle successful response
        return response.data.csrf_token;
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
  }
  
// Function to check and get CSRF token from localStorage or API
async function getCsrfToken() {
    const storedCsrfToken = localStorage.getItem('csrf_token');
    
    if (storedCsrfToken) {
      return storedCsrfToken;
    } else {
      const fetchedCsrfToken = await fetchCsrfToken();
      if (fetchedCsrfToken) {
        localStorage.setItem('csrf_token', fetchedCsrfToken);
        return fetchedCsrfToken;
      }
    }
  
    return null;
}

  export default getCsrfToken