let imageURL;

// Cache DOM elements
const fileInput = document.getElementById("fileInput");
const fileLabel = document.getElementById("file");
const uploadedImage = document.getElementById("uploadedImage");
const removeBgButton = document.getElementById("removeBgButton");
const downloadButton = document.getElementById("downloadBtn");
const reloadButton = document.getElementById("reloadBtn");

// Hide buttons initially
reloadButton.style.display = "none";
downloadButton.style.display = "none";

// Handle file selection
fileInput.addEventListener("change", (event) => {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.src = e.target.result;
      uploadedImage.style.display = "block";
    };
    reader.readAsDataURL(event.target.files[0]);
  }
});

// Handle background removal
function submitHandler() {
  if (fileInput.files.length === 0) {
    alert("Please select an image before submitting.");
    return;
  }

  removeBgButton.classList.add("btn_loading");
  const image = fileInput.files[0];
  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  const apiKey = "iHd33hzsVQ1wMQeYgwwuweb7";
  
  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  })
    .then(response => response.blob())
    .then(blob => {
      imageURL = URL.createObjectURL(blob);
      uploadedImage.src = imageURL;
      reloadButton.style.display = "block";
      fileLabel.style.display = "none";
      downloadButton.style.display = "block";
      removeBgButton.style.display = "none";
    })
    .catch(error => alert("An error occurred. Please try again."))
    .finally(() => removeBgButton.classList.remove("btn_loading"));
}

// Download the processed image
function downloadFile() {
  if (!imageURL) {
    alert("No image available for download.");
    return;
  }

  const anchor = document.createElement("a");
  anchor.href = imageURL;
  anchor.download = "removed_bg.png";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

// Reset the form
function reset() {
  fileInput.value = ""; 
  uploadedImage.src = "./images/remove_background.webp"; 
  uploadedImage.style.display = "none";
  fileLabel.style.display = "inline-block";
  downloadButton.style.display = "none";
  reloadButton.style.display = "none";
  removeBgButton.style.display = "inline-block";

  window.location.reload(); //Additional (Not mandatory)
}
