// Function to preview selected image
function previewImage(event) {
  const preview = document.getElementById('preview-image');
  const fileInput = event.target;
  const addButton = document.getElementById('add-image-button');

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      addButton.innerHTML = 'Change Image';
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Check for online/offline status
  window.addEventListener('online', function () {
  });

  window.addEventListener('offline', function () {
  });
});

// Function to add news
function addNews() {
  // Get form values
  let title = document.getElementById('title').value.trim();
  let text = document.getElementById('text').value.trim();
  let imageInput = document.getElementById('image');

  // Check if an image is selected
  if (imageInput.files.length === 0) {
    alert("Please select an image.");
    return;
  }

  // Validate form data
  if (!title || !text) {
    alert("Please fill out all fields.");
    return;
  }

  // Create a news post object
  const post = {
    title,
    text,
    image: document.getElementById('preview-image').src,
  };

  // Save the news post to local storage
  saveNewsToLocalStorage(post);

  if (navigator.onLine) {
    alert("News successfully published!");
  } else {
    alert("You're offline. The news post will be published when the network status changes to online.");
  }

  // Clear form fields
  document.getElementById('preview-image').src = "images/news.png";
  document.getElementById('image').value = "";
  document.getElementById('title').value = "";
  document.getElementById('text').value = "";
}

function saveNewsToLocalStorage(post) {
  let newsPosts = JSON.parse(localStorage.getItem('newsPosts')) || [];
  newsPosts.push(post);
  localStorage.setItem('newsPosts', JSON.stringify(newsPosts));
}

// Add an event listener for the "Create News" button click
document.getElementById('news').addEventListener('click', function () {
  addNews(); // Call the addNews function when the button is clicked
});
