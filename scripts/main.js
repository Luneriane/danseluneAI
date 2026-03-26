var dataProfile = {};
var dataBots = {};
var dataGallery = {};

const aboutLink = document.getElementById("menuAbout");
const botsLink = document.getElementById("menuBots");
const galleryLink = document.getElementById("menuGallery");
const contactLink = document.getElementById("menuContact");

const mainSection = document.querySelector("main");
var activePage;

// Fetch data from JSON file
function fetchData(dataJSON){
  return fetch(dataJSON)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

// Load page Function
async function loadPage(url, page) {
  // Need fetch data ?
  switch(page) {
    case "about":
      if (Object.keys(dataProfile).length === 0){
        dataProfile = await fetchData("data/profile.json")}
      break;
    case "bots":
      if (Object.keys(dataBots).length === 0) {
        dataBots = await fetchData("data/bots.json")}
      break;
    case "gallery":
      if (Object.keys(dataGallery).length === 0){
        dataGallery = await fetchData("data/gallery.json")}
      break;
  }
  
  const res = await fetch(url);
  const html = await res.text();
  mainSection.innerHTML = html;
  activePage = page;
}

//Init website
async function initPage() {
  const page = aboutLink.getAttribute("data-link");
  await loadPage("./pages/about.htm",page);
  const aboutJS = await import("./about.js");
  aboutJS.initProfiles(dataProfile);
  activePage = page;
}

// Clicks on Header
aboutLink.addEventListener("click", async() => {
  const page = aboutLink.getAttribute("data-link");
  if (activePage !== page){
    await loadPage("./pages/about.htm",page);
    const aboutJS = await import("./about.js");
    aboutJS.initProfiles(dataProfile);
  };
});

botsLink.addEventListener("click", async() => {
  const page = botsLink.dataset.link;
  if (activePage !== page){
    await loadPage("./pages/bots.htm",page);
    const botsJS = await import("./bots.js");
    botsJS.initBots(dataBots);
    botsJS.populateBots(dataBots);
  }
});

galleryLink.addEventListener("click", async() => {
  const page = galleryLink.getAttribute("data-link");
  if (activePage !== page){
    await loadPage("./pages/gallery.htm",page);
    const galleryJS = await import("./gallery.js");
    galleryJS.initGallery(dataGallery);
    galleryJS.populateImgs(dataGallery);
  }
});

initPage()