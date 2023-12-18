function addComment() {
  // Get form values
  let name = document.getElementById('name').value.trim();
  let commentText = document.getElementById('comment').value.trim();

  // Check if inputs are empty after trimming
  if (name === '' || commentText === '') {
    alert("Please fill out all fields");
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
  commentsContainer.innerHTML = newCommentHTML + commentsContainer.innerHTML;

  // Clear the form
  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';

  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function getTimestamp() {
  let now = new Date();
  let date = now.toLocaleDateString();
  let time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${date}, ${time}`;
}
