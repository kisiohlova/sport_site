document.addEventListener('DOMContentLoaded', function () {
  // Load existing news posts from local storage
  loadNewsFromLocalStorage();

  // Check for online/offline status
  window.addEventListener('online', function () {
    isOnline(); // Call the function to check and post news when online
  });

  // Initial check for online status
  isOnline(); // This will handle the initial state without attempting to add news
});

function isOnline() {
  if (navigator.onLine) {
    // If online, post news from local storage
    postNewsFromLocalStorage();
  }
}

function loadNewsFromLocalStorage() {
  let newsPosts = JSON.parse(localStorage.getItem('newsPosts')) || [];

  // Render existing news posts
  let newsContainer = document.querySelector('.news-container');
  newsPosts.forEach((post) => {
    let newNewsHTML = `
      <div class="news-item">
        <img src="${post.image}" alt="${post.title}">
        <h2>${post.title}</h2>
        <p>${post.text}</p>
      </div>
    `;
  });
}

function postNewsFromLocalStorage() {
  let newsPosts = JSON.parse(localStorage.getItem('newsPosts')) || [];

  // Post news posts to the page (prepend at the beginning)
  let newsContainer = document.querySelector('.news-container');

  // Post new news posts
  newsPosts.reverse().forEach((post) => {
    let newNewsHTML = `
      <div class="news-item">
        <img src="${post.image}" alt="${post.title}">
        <h2>${post.title}</h2>
        <p>${post.text}</p>
      </div>
    `;
    // Use insertAdjacentHTML to prepend at the beginning
    newsContainer.insertAdjacentHTML('afterbegin', newNewsHTML);
  });

  // Clear local storage only after successfully posting news posts
  localStorage.removeItem('newsPosts');
}
