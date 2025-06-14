const uniqueImages = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

// 1. Pick a random image to duplicate
const randomIndex = Math.floor(Math.random() * uniqueImages.length);
const duplicateImage = uniqueImages[randomIndex];

// 2. Create image pool (5 unique + 1 duplicate)
const imagePool = [...uniqueImages, duplicateImage];

// 3. Shuffle the images
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledImages = shuffle(imagePool);

// 4. Inject images into the grid
const container = document.querySelector(".images"); // ✅ FIXED

shuffledImages.forEach(src => {
  const img = document.createElement("img");
  img.src = src;
  img.height = 100;
  img.width = 190;
  container.appendChild(img);
});

shuffledImages.addEventListener("click",reset)
function reset()
{
	const btn=document.createElement("button");
	btn.setAttribute("id","reset");
	shuffledImages.appendChild(btn);
	
}
