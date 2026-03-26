import { populateTags, populateCards, applyFilters as applyFiltersUtil, sortCards as sortCardsUtil, populatePanel as populatePanelUtil} from './cardUtils.js';

// Module-level variables accessible to all functions
let botsSection;
let botPanel;
let botFilters;
let activeBotFilters;
let botList;
let sortButtons;
let cardType;

export function initBots(data) {
  botsSection = document.getElementById("bots");
  botPanel = document.getElementById("panel");

  botFilters = document.querySelectorAll(".filterTag");
  activeBotFilters = new Set();
  botList = document.getElementById("bot-list");
  sortButtons = document.querySelectorAll("#sortBlock li");
  cardType = "bot";
  
  clicks(data);
}

// Function to populate the bots list
export function populateBots(data) {
  populateCards(botList, data.characters, cardType, data);
}

export  function populateBotPanel(data){
  populatePanelUtil(data,item,cardType)
}

// Apply filter
export function applyFilters(filter, data) {
  applyFiltersUtil(activeBotFilters, filter, data, botFilters);
}

// Apply sorting
export function sortCards(type) {
  sortCardsUtil(type, botList);
}

export function clicks(data) {
  // Side window with bot details
  botsSection.addEventListener("click", (event) => {

    const card = event.target.closest(".cards");
    const icons = event.target.closest(".cardImg");
    const panel = event.target.closest("#panel");

    // Populate window with bot details
    if (card) {
      const cardID = card.getAttribute("data-id");
      botsSection.classList.add("isOpen");
      populatePanelUtil(data, cardID, cardType);
      return
    }

    //Close window
    if (botsSection.classList.contains("isOpen")) {
      if (!card && !icons && !panel) {
        botPanel.innerHTML = "";
        botsSection.classList.remove("isOpen");
        return;
      };
    }
  });

  // Clicks on Sorting
  sortButtons.forEach(button => {button.addEventListener("click", () => {
      const sortType = button.getAttribute("data-sort");
      sortCards(sortType,botList);
    });
  });
  // Clicks on Filters
  botFilters.forEach(filter => {filter.addEventListener("click", () => {
    applyFilters(filter, data)});
  });
}