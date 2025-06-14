const content = document.querySelector('#content');
const image = document.querySelector('#apodImage');
const video = document.querySelector('#apodVideo');
const videoContainer = document.querySelector('#videoContainer');
const title = document.querySelector('#apodTitle');
const date = document.querySelector('#apodDate');
const explanation = document.querySelector('#apodExplanation');
const errorMessage = document.querySelector('#error-message');
const loader = document.querySelector('#loader');
const button = document.querySelector('#fetchBtn');

button.addEventListener('click', () => {
    button.disabled = true;
    loader.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    content.classList.add('hidden');
    getNasaData();
});

function getNasaData(){
    const fetchPromise = fetch(`https://api.nasa.gov/planetary/apod?api_key=${CONFIG.NASA_API_KEY}`);

    fetchPromise
        .then((response) => {
            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            title.textContent = data.title;
            date.textContent = data.date;
            explanation.textContent = data.explanation;

            if(data.media_type === 'image'){
                image.classList.add('active');
                videoContainer.classList.remove('active');
                image.src = data.url;
            } else {
                image.classList.remove('active');
                videoContainer.classList.add('active');
                video.src = data.url;
            }
            loader.classList.add('hidden');
            content.classList.remove('hidden');
            button.disabled = false;
        })
        .catch((error) => {
            console.error('Error:', error);
            loader.classList.add('hidden');
            errorMessage.classList.remove('hidden');
            button.disabled = false;
        });
}