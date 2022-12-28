const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('Loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const count = 30;
const apiKey = '-Het3uhadUucf39Si8Za1h1Z-368qcs088ZI4wVmXV8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded.
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready =', ready);
    }
}

// Helper Function to set attributes on DOM elements.
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    totalImages = photosArray.length;
    console.log('total images', totalImages)
    // Run function for each object in phtosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each is finished loading.
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside imageContainer Element.
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API 
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, load more photos.
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -
         1000) {
            getPhotos();
            console.log('load more');
         }
});

// On Load
getPhotos();
