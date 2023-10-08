// import { useFetch } from '@vueuse/core';

// export async function makeGetRequestWithToken(url: string, token: string) {
//     try {
//       const response = await useFetch(url, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json', // Adjust content type if needed
//         },
//       });
  
//       if (response.ok) {
//         return await response.json();
//       } else {
//         console.error(`GET request to ${url} failed with status: ${response.status}`);
//         throw new Error('Request failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       throw error;
//     }
//   }