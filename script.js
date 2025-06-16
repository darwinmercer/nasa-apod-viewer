const NASA_API_KEY = 'WCfFxK9tWr1jNQGBU0Q1cSEGfFSsLX3eFyhwawKm';

const nasaLogo = document.querySelector('.nasa-logo');
const image = document.querySelector('#apodImage');
const video = document.querySelector('#apodVideo');
const videoContainer = document.querySelector('#videoContainer');
const backgroundVideo = document.querySelector('.background-video');
const titleElement = document.querySelector('#apodTitle');
const dateElement = document.querySelector('#apodDate');
const errorMessage = document.querySelector('#error-message');
const loader = document.querySelector('#loader');
const fetchTrigger = document.querySelector('#fetch-trigger');
const dataDisplayWrapper = document.querySelector('#data-display-wrapper');
const explanationTitle = document.querySelector('#explanation-title');
const explanationText = document.querySelector('#explanation-text');

fetchTrigger.addEventListener('click', () => {
    getNasaData();
});

nasaLogo.addEventListener('click', resetToLandingPage);

function resetToLandingPage() {
    dataDisplayWrapper.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loader.classList.add('hidden');

    backgroundVideo.classList.remove('hidden');

    document.body.classList.remove('grid-active');

    titleElement.textContent = 'TITLE: STANDBY';
    dateElement.textContent = 'DATE: STANDBY';

    image.src = '';
    video.src = '';
}

function getNasaData() {
    fetchTrigger.disabled = true;
    fetchTrigger.classList.add('disabled');
    loader.classList.remove('hidden');
    backgroundVideo.classList.add('hidden');
    errorMessage.classList.add('hidden');
    dataDisplayWrapper.classList.add('hidden');
    document.body.classList.add('grid-active');

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            titleElement.textContent = `TITLE: ${data.title}`;
            dateElement.textContent = `DATE: ${data.date}`;
            explanationTitle.textContent = data.title;
            explanationText.textContent = data.explanation || "No detailed explanation available for this image.";
            video.title = data.title;

            const isImage = data.media_type === 'image';
            if (isImage) {
                image.src = data.hdurl || data.url;
                image.classList.add('active');
                videoContainer.classList.remove('active');
            } else {
                video.src = data.url;
                videoContainer.classList.add('active');
                image.classList.remove('active');
            }

            dataDisplayWrapper.classList.remove('hidden');

            loader.classList.add('hidden');
            fetchTrigger.disabled = false;
            fetchTrigger.classList.remove('disabled');
        })
        .catch(error => {
            console.error(error);
            errorMessage.classList.remove('hidden');
            document.body.classList.remove('grid-active');

            loader.classList.add('hidden');
            fetchTrigger.disabled = false;
            fetchTrigger.classList.remove('disabled');
        });
}