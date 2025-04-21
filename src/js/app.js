const jokeText = document.getElementById('jokeText');
const jokeButton = document.getElementById('jokeButton');
const themeToggle = document.getElementById('themeToggle');
const notification = document.getElementById('notification');

const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';

const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    showNotification(`Switched to ${newTheme} mode`);
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    icon.className = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'fas fa-moon' 
        : 'fas fa-sun';
}

jokeButton.addEventListener('click', getJoke);

getJoke();

async function getJoke() {
    try {
        jokeText.textContent = 'Loading joke...';
        jokeButton.disabled = true;
        
        const response = await fetch(JOKE_API_URL);
        if (!response.ok) throw new Error('Failed to fetch joke');
        
        const data = await response.json();
        displayJoke(data.joke);
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeText.textContent = 'Failed to load joke. Please try again.';
    } finally {
        jokeButton.disabled = false;
    }
}

function displayJoke(joke) {
    let i = 0;
    jokeText.textContent = '';
    
    const typeSpeed = 20; 
    
    const typewriter = setInterval(() => {
        if (i < joke.length) {
            jokeText.textContent += joke.charAt(i);
            i++;
        } else {
            clearInterval(typewriter);
        }
    }, typeSpeed);
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}