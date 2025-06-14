const uniqueImages = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

const randomIndex = Math.floor(Math.random() * uniqueImages.length);
const duplicateImage = uniqueImages[randomIndex];
const imagePool = [...uniqueImages, duplicateImage];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledImages = shuffle(imagePool);
const container = document.querySelector(".images");
const buttonsDiv = document.querySelector(".buttons");
const message = document.querySelector("#h");

let selectedImages = [];

function renderImages() {
  container.innerHTML = "";
  shuffledImages.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = `img${i + 1}`; // for Cypress tests
    img.addEventListener("click", () => handleImageClick(img));
    container.appendChild(img);
  });
}

function handleImageClick(img) {
  if (!selectedImages.includes(img)) {
    if (selectedImages.length < 2) {
      img.style.border = "2px solid blue";
      selectedImages.push(img);
    }
  }

  if (selectedImages.length > 0) showResetButton();
  if (selectedImages.length === 2) showVerifyButton();
}

function showResetButton() {
  if (!document.getElementById("reset")) {
    const resetBtn = document.createElement("button");
    resetBtn.id = "reset";
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", resetState);
    buttonsDiv.appendChild(resetBtn);
  }
}

function showVerifyButton() {
  if (!document.getElementById("verify")) {
    const verifyBtn = document.createElement("button");
    verifyBtn.id = "verify";
    verifyBtn.textContent = "Verify";
    verifyBtn.addEventListener("click", verifySelection);
    buttonsDiv.appendChild(verifyBtn);
  }
}

function resetState() {
  selectedImages.forEach(img => (img.style.border = ""));
  selectedImages = [];
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  document.getElementById("reset")?.remove();
  document.getElementById("verify")?.remove();
}

function verifySelection() {
  const [img1, img2] = selectedImages;
  if (img1.src === img2.src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  document.getElementById("verify")?.remove();
}

renderImages();
