const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// function to create image element
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    // resolve immediately after setting src
    resolve(img);

    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// main function to handle downloads
function downloadImages() {
  // reset UI
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  Promise.all(images.map(imgObj => downloadImage(imgObj.url)))
    .then(imgElements => {
      loading.style.display = "none";
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loading.style.display = "none";
      errorDiv.textContent = err;
    });
}

btn.addEventListener("click", downloadImages);
