export function initProfiles(data){
  const ulE = document.getElementById("profiles");

  for (const d in data) {
    const linkLi = document.createElement("li");

    const aElement = document.createElement("a");
    aElement.setAttribute("href",data[d].link);
    aElement.setAttribute("target","_blank");

    const img = document.createElement("img");
    img.setAttribute("src","./assets/logo/"+data[d].icon);
    img.setAttribute("alt",data[d].name+" icon");
    img.classList.add("iconImg");
    img.classList.add("iconWeb");
    aElement.appendChild(img);

    const span = document.createElement("span");
    span.innerHTML = data[d].name;
    aElement.appendChild(span);

    
    linkLi.appendChild(aElement);
    ulE.appendChild(linkLi);
  };
}