document.addEventListener('DOMContentLoaded', function () {
  // Load existing comments from local storage
  loadCommentsFromLocalStorage();

  // Add event listener to the comment form
  document.getElementById('comment-form').addEventListener('submit', function (event) {
    event.preventDefault();
    isOnline(addComment);
  });

  // Check for online/offline status
  window.addEventListener('online', function () {
    isOnline(postCommentsFromLocalStorage);
  });

  window.addEventListener('offline', function () {
    // No action needed when offline
  });

  // Initial check for online status
  isOnline(); // This will handle initial state without attempting to add comments
});

function isOnline(callback, offlineCallback) {
  if (navigator.onLine) {
    // If online, call the provided callback function (if any)
    if (callback && typeof callback === 'function') {
      callback();
    }
  } else {
    // If offline, call the provided offlineCallback function (if any)
    if (offlineCallback && typeof offlineCallback === 'function') {
      offlineCallback();
    }
  }
}

function addComment() {
  // Get form values
  let name = document.getElementById('name').value.trim();
  let commentText = document.getElementById('comment').value.trim();

  // Check if inputs are empty after trimming
  if (name === '' || commentText === '') {
    alert('Please fill out all fields');
    return;
  }

  // Create a new comment HTML string
  let newCommentHTML = `
    <div class="comment">
        <p>${commentText}</p>
        <div class="date-name">
            <p class="timestamp">${getTimestamp()}</p>
            <p class="fan_name">${name}</p>
        </div>
    </div>
    <br>
  `;

  // Insert the new comment HTML at the top
  let commentsContainer = document.getElementById('comments');

  isOnline(() => {
    // If online, post the comment and don't save to local storage
    commentsContainer.innerHTML = newCommentHTML + commentsContainer.innerHTML;
  }, () => {
    // If offline, save the comment to local storage
    saveCommentToLocalStorage({ name, commentText, timestamp: getTimestamp() });
    alert("You're offline. The comment will be published when the network status changes to online.");
  });

  // Clear the form
  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';

  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function getTimestamp() {
  let now = new Date();
  let date = now.toLocaleDateString();
  let time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${date}, ${time}`;
}

function saveCommentToLocalStorage(comment) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadCommentsFromLocalStorage() {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];

  // Render existing comments
  let commentsContainer = document.getElementById('comments');
  comments.forEach((comment) => {
    let newCommentHTML = `
      <div class="comment">
          <p>${comment.commentText}</p>
          <div class="date-name">
              <p class="timestamp">${comment.timestamp}</p>
              <p class="fan_name">${comment.name}</p>
          </div>
      </div>
      <br>
    `;
    commentsContainer.innerHTML = newCommentHTML + commentsContainer.innerHTML;
  });
}

function postCommentsFromLocalStorage() {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];

  // Post comments to the page
  let commentsContainer = document.getElementById('comments');
  comments.forEach((comment) => {
    let newCommentHTML = `
      <div class="comment">
          <p>${comment.commentText}</p>
          <div class="date-name">
              <p class="timestamp">${comment.timestamp}</p>
              <p class="fan_name">${comment.name}</p>
          </div>
      </div>
      <br>
    `;
    commentsContainer.innerHTML = newCommentHTML + commentsContainer.innerHTML;
  });

  // Clear local storage only after successfully posting comments
  localStorage.removeItem('comments');
}
