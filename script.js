const uniqueImages = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

const container = document.querySelector(".images");
const message = document.getElementById("h");
const parent = document.querySelector(".container");

let selectedImages = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderImages() {
  container.innerHTML = "";
  selectedImages = [];
  removeButtons();
  message.textContent = "Please click on the identical tiles to verify that you are not a robot";

  const randomIndex = Math.floor(Math.random() * uniqueImages.length);
  const duplicate = uniqueImages[randomIndex];
  const imagePool = shuffle([...uniqueImages, duplicate]);

  imagePool.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.addEventListener("click", () => handleImageClick(img));
    container.appendChild(img);
  });
}

function handleImageClick(img) {
  if (selectedImages.includes(img)) return;
  if (selectedImages.length >= 2) return;

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length === 1) showReset();
  if (selectedImages.length === 2) showVerify();
}

function showReset() {
  if (!document.getElementById("reset")) {
    const resetBtn = document.createElement("button");
    resetBtn.id = "reset";
    resetBtn.textContent = "Reset";
    resetBtn.onclick = () => renderImages();
    parent.appendChild(resetBtn);
  }
}

function showVerify() {
  if (!document.getElementById("verify")) {
    const verifyBtn = document.createElement("button");
    verifyBtn.id = "verify";
    verifyBtn.textContent = "Verify";
    verifyBtn.onclick = () => handleVerify();
    parent.appendChild(verifyBtn);
  }
}

function handleVerify() {
  const [img1, img2] = selectedImages;
  const verifyBtn = document.getElementById("verify");
  if (verifyBtn) verifyBtn.remove();

  if (img1.src === img2.src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
}

function removeButtons() {
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  if (resetBtn) resetBtn.remove();
  if (verifyBtn) verifyBtn.remove();
}

// Initialize
renderImages();
