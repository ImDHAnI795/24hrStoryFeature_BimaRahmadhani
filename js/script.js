const storyInput = document.getElementById("storyInput");

const storiesList = document.getElementById("storiesList");

const modal = document.getElementById("storyModal");

const storyImage = document.getElementById("storyImage");

const closeBtn = document.getElementById("closeBtn");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

let stories = JSON.parse(localStorage.getItem("stories")) || [];

let currentIndex = 0;

function saveStories() {
    localStorage.setItem("stories", JSON.stringify(stories));
}

function removeExpiredStories() {
    const now = Date.now();

    stories = stories.filter((story) => {
        return now - story.createdAt < 24 * 60 * 60 * 1000;
    });

    saveStories();
}

function renderStories() {
    storiesList.innerHTML = "";

    stories.forEach((story, index) => {
        const div = document.createElement("div");

        div.className = "story";

        div.innerHTML = `
<img src="${story.image}">
`;

        div.addEventListener("click", () => openStory(index));

        storiesList.appendChild(div);
    });
}

storyInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        stories.push({
            id: Date.now(),

            image: e.target.result,

            createdAt: Date.now(),
        });

        saveStories();

        renderStories();
    };

    reader.readAsDataURL(file);
});

function openStory(index) {
    currentIndex = index;

    storyImage.src = stories[index].image;

    modal.classList.add("active");
}

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < stories.length - 1) {
        currentIndex++;

        openStory(currentIndex);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;

        openStory(currentIndex);
    }
});

removeExpiredStories();

renderStories();
