// Utility functions shared between bots and gallery modules

/**
 * Populate tags list
 * @param {HTMLElement} htmlElement - Container for tags
 * @param {Object} tagsInfo - Tags information from data
 * @param {Array} itemTags - Tags to display
 */
export function populateTags(htmlElement, tagsInfo, itemTags) {
  
  for (const tag in itemTags) {
  
    const tagLi = document.createElement("li");
    if(itemTags[tag] === "nsfw"){
    tagLi.classList.add("isNSFW")}
    tagLi.classList.add("tagLi");
    
    const icon = document.createElement("img");
    icon.src = `./assets/icons/`+tagsInfo[itemTags[tag]].icon;
    icon.alt = tagsInfo[itemTags[tag]].name + " icon";
    icon.classList.add("iconImg");
    tagLi.appendChild(icon);

    const span = document.createElement("span");
    span.textContent = tagsInfo[itemTags[tag]].name;
    span.classList.add("tooltip");
    tagLi.appendChild(span);
    htmlElement.appendChild(tagLi);
  }
}

/**
 * Generic card population function
 * @param {HTMLElement} container - Container for cards
 * @param {Object} items - Items to populate (characters or images)
 * @param {String} cardType - Type string
 * @param {Object} data - Full data object
 */
export function populateCards(container, items, cardType) {
  
  for (const item in items) {
    // Create card
    const card = document.createElement("div");
    card.classList.add("cards");
    card.classList.add("isActive");

    // Add image
    const img = document.createElement("img");
    const path = (cardType === "bot") ? "./assets/portraits/":"./assets/gallery/preview/";
    img.src = path + items[item].img;
    img.alt = items[item].name + " preview";
    img.classList.add("cardImg");
    card.appendChild(img);

    // Add title
    const title = document.createElement("h3");
    title.textContent = items[item].name;
    card.appendChild(title);

    // Add click hint
    const clickSpan = document.createElement("span");
    clickSpan.textContent = "⮚⮚ Click for details ⮘⮘";
    clickSpan.classList.add("spanClick");
    card.appendChild(clickSpan);

    // Add tags data
    const tagsData = items[item].tags.toString();
    card.setAttribute("data-tags", tagsData);

    // Add date
    card.setAttribute("data-date", items[item].date);

    // Add ID
    card.setAttribute(`data-id`, item);

    container.appendChild(card);
  }
}

/**
 * Populate panel
 * @param {Object} data - Full data object
 * @param {Object} item - item data
 * @param {String} cardType - type string
 */
export function populatePanel(data,item,cardType){
  const panel = document.getElementById("panel");
  const dataItem = (cardType === "bot") ? data.characters[item]:data.images[item];

  // Reset panel
  panel.innerHTML = "";

  //Add "X" close button if (cardType === "img")
  if (cardType === "img"){
    const itemImg = document.createElement("img");
    itemImg.src = `./assets/icons/close.png`;
    itemImg.alt = "close icon";
    itemImg.id = "closeIcon";
    panel.appendChild(itemImg);
  }
    
  // Add item name
  const itemName = document.createElement("h2");
  itemName.textContent = dataItem.name;
  panel.appendChild(itemName);

  //Add tagline if (cardType === "bot")
  if (cardType === "bot"){
    const tagline = document.createElement("p");
    tagline.textContent = dataItem.tagline;
    tagline.classList.add("tagline");
    panel.appendChild(tagline);
  }

  // Add bot image
  const itemImg = document.createElement("img");
  const path = (cardType === "bot") ? "./assets/portraits/":"./assets/gallery/fullview/";
  itemImg.src = path+dataItem.img;
  itemImg.alt = dataItem.name + " image";
  itemImg.classList.add("panelImg");
  panel.appendChild(itemImg);

  //Add bot tags
  const itemTags = document.createElement("ul"); 
  populateTags(itemTags, data.tags, dataItem.tags);
  itemTags.classList.add("tagsList");
  panel.appendChild(itemTags);

  //Add description + links if (cardType === "bot")
  if (cardType === "bot"){
    // Add bot description
    const botPrez = document.createElement("p");
    botPrez.textContent = dataItem.description;
    botPrez.setAttribute("id", "bot-description");
    panel.appendChild(botPrez);

    // Add website links
    const linksUl = document.createElement("ul"); 
    for (const link in dataItem.links) {
      if (!(Object.keys(dataItem.links[link].url).length === 0)){
        const itemWeb = dataItem.links[link].website;
        const website = data.websites[itemWeb];

        const linkLi = document.createElement("li");

        const aElement = document.createElement("a");
        aElement.setAttribute("href",`${dataItem.links[link].url}`);
        aElement.setAttribute("target","_blank");

        const img = document.createElement("img");
        img.setAttribute("src",`./assets/logo/${website.icon}`);
        img.setAttribute("alt",`${website.name} icon`);
        img.classList.add("iconImg");
        img.classList.add("iconWeb");
        aElement.appendChild(img);

        const span = document.createElement("span");
        span.innerHTML = `${website.name}`;
        aElement.appendChild(span);
        linkLi.appendChild(aElement);
        linksUl.appendChild(linkLi);
      }
    };
    linksUl.classList.add("tagsList");
    linksUl.classList.add("webLinks");
    panel.appendChild(linksUl);
  }

  //Add link to prompt if (cardType === "img")
  if (cardType === "img"){

    const linkLi = document.createElement("li");
    linkLi.classList.add("promptLi");

    const aElement = document.createElement("a");
    aElement.setAttribute("href",dataItem.prompt);
    aElement.setAttribute("target","_blank");

    const img = document.createElement("img");
    img.setAttribute("src","./assets/icons/prompt.png");
    img.setAttribute("alt","prompt link icon");
    img.classList.add("iconImg");
    img.classList.add("iconWeb");
    aElement.appendChild(img);

    const span = document.createElement("span");
    span.innerHTML = "Prompt";
    aElement.appendChild(span);

    linkLi.appendChild(aElement);
    panel.appendChild(linkLi);

  }
}


/**
 * Apply filters to cards
 * @param {Set} activeFilters - Active filter tags
 * @param {HTMLElement} filter - Filter element clicked
 * @param {Object} data - Data object
 * @param {NodeList} filters - All filter elements
 */
export function applyFilters(activeFilters, filter, data, filters) {
  const tagsAttribute = `data-tags`;
  const cards = document.getElementsByClassName("cards");
  const filterAttribute = filter.getAttribute("data-filter");
  const filterAll = filters[0];

  if (filterAttribute === "all") {
    if (filter.classList.contains("isActive")) {
      filters.forEach(f => f.classList.remove("isActive"));
      activeFilters.clear();
    } else {
      filters.forEach(f => f.classList.remove("isActive"));
      filterAll.classList.add("isActive");
      for (const tag in data.tags) {
        activeFilters.add(tag);
      }
    }
  } else {
    if (filter.classList.contains("isActive")) {
      filter.classList.remove("isActive");
      activeFilters.delete(filterAttribute);
    } else {
      filter.classList.add("isActive");
      if (filterAll.classList.contains("isActive")) {
        filterAll.classList.remove("isActive");
        activeFilters.clear();
      }
      activeFilters.add(filterAttribute);
    }
  }

  for (let c = 0; c < cards.length; c++) {
    const cardTags = cards[c].getAttribute(tagsAttribute).split(",");
    const match = [...activeFilters].some(f => cardTags.includes(f));
    if (match) {
      cards[c].classList.add("isActive");
    } else {
      cards[c].classList.remove("isActive");
    }
  }
}

/**
 * Sort cards
 * @param {String} type - Sort type ("name" or "date")
 * @param {String} cardType - Type of card ("bot" or "image")
 * @param {HTMLElement} container - Cards container
 */
export function sortCards(type, container) {

  const idAttribute = `data-id`;
  const dateAttribute = "data-date";

  const cards = Array.from(container.getElementsByClassName(`cards`));
  cards.sort((a, b) => {
    if (type === "name") {
      return a.getAttribute(idAttribute).localeCompare(b.getAttribute(idAttribute));
    }
    if (type === "date") {
      return new Date(b.getAttribute(dateAttribute)) - new Date(a.getAttribute(dateAttribute));
    }
  });
  cards.forEach(card => container.appendChild(card));
}
