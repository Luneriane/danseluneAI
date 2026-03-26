import { populateTags, populateCards, applyFilters as applyFiltersUtil, sortCards as sortCardsUtil, populatePanel as populatePanelUtil} from './cardUtils.js';

// Module-level variables accessible to all functions
let gallerySection;
let panelContainer;
let imgPanel;
let imgFilters;
let activeImgFilters;
let imgList;
let sortButtons;
let cardType;

export function initGallery(data){
  gallerySection = document.getElementById("gallery");
  imgPanel = document.getElementById("panel");
  panelContainer = document.getElementById("panelContainer")

  imgFilters = document.querySelectorAll(".filterTag");
  activeImgFilters = new Set();
  imgList = document.getElementById("imgList");
  sortButtons = document.querySelectorAll("#sortBlock li");
  cardType = "img";

 clicks(data);
}

//Function to populate imgs list
export function populateImgs(data){
  populateCards(imgList, data.images, cardType, data);
}

export  function populateImgPanel(data){
  populatePanelUtil(data,item,cardType)
}

// Apply filter
export function applyFilters(filter, data) {
  applyFiltersUtil(activeImgFilters, filter, data, imgFilters);
}

// Apply sorting
export function sortCards(type) {
  sortCardsUtil(type, imgList);
}

export function clicks(data) {
  // Side window with bot details
  gallerySection.addEventListener("click", (event) => {

    const card = event.target.closest(".cards");
    const close = event.target.closest("#closeIcon");

    // Populate window with bot details
    if (card) {
      const cardID = card.getAttribute("data-id");
      panelContainer.classList.add("isOpen");
      populatePanelUtil(data, cardID, cardType);
      return
    }

    //Close window
    if (panelContainer.classList.contains("isOpen")) {
      if (close) {
        imgPanel.innerHTML = "";
        panelContainer.classList.remove("isOpen");
        return;
      };
    }
  });

  // Clicks on Sorting
  sortButtons.forEach(button => {button.addEventListener("click", () => {
      const sortType = button.getAttribute("data-sort");
      sortCards(sortType,imgList);
    });
  });
  // Clicks on Filters
  imgFilters.forEach(filter => {filter.addEventListener("click", () => {
    applyFilters(filter, data)});
  });
}