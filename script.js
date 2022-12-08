
// Unsplash API
const count = 10;
const apiKey = '-Het3uhadUucf39Si8Za1h1Z-368qcs088ZI4wVmXV8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API 
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
        // Catch Error Here
    }
}

// On Load
getPhotos();
