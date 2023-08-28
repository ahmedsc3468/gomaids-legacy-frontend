// // Function to fetch CSRF token from the /csrf-token API
// function fetchCsrfToken() {
//     return fetch(config.SERVER_URL+'api/csrf-token')
//       .then(response => response.json())
//       .then(data => data.csrf_token)
//       .catch(error => {
//         console.error('Error fetching CSRF token:', error);
//         return null;
//       });
//   }
  
//   // Function to check and get CSRF token from localStorage or API
//   async function getCsrfToken() {
//     const storedCsrfToken = localStorage.getItem('csrf_token');
    
//     if (storedCsrfToken) {
//       return storedCsrfToken;
//     } else {
//       const fetchedCsrfToken = await fetchCsrfToken();
//       if (fetchedCsrfToken) {
//         localStorage.setItem('csrf_token', fetchedCsrfToken);
//         return fetchedCsrfToken;
//       }
//     }
  
//     return null;
//   }

//   export default getCsrfToken