const baseApiUrl = "http://localhost:8081";

const domainList = document.querySelector(".cw-links");
const searchForm = document.querySelector(".cw-search");

const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

searchForm.addEventListener("submit", handleSearchSubmit);

// fetch(`${baseApiUrl}/domains`, fetchOptions)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(parseDomains);

function parseDomains(response) {
  const { domains } = response;
  domains.forEach(domain => {
    if (!domain.domain) {
      return;
    }

    const link = buildLink(domain);
    const listElement = buildListElement(link);

    domainList.appendChild(listElement);
  });
}

function handleSearchSubmit(evt) {
  evt.preventDefault();
  const initialDomain = evt.target.querySelector("input").value;
  const data = {
    initialDomain
  };
  fetch(`${baseApiUrl}/domains`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log("response");
      console.log(response);
      const card = document.querySelector(".cw-card");
      card.classList.add("cw-card-active");
      parseDomains(response);
    });
}

function buildLink(domain) {
  const link = document.createElement("a");
  link.setAttribute("href", domain.domain);
  link.innerHTML = domain.domain;

  return link;
}

function buildListElement(link) {
  const listElement = document.createElement("li");
  listElement.appendChild(link);
  return listElement;
}
