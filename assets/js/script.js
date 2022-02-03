const API = "https://pokeapi.co/api/v2/pokemon?limit=48&offset=00";

let html = "";

const getData = (url) => {
  return fetch(url)
    .then((Response) => Response.json())
    .then((json) => {
      fillData(json.results), pagination(json);
    })
    .catch((error) => {
      console.log("error en la api" + error);
    });
};

const getDataImage = (url) => {
  return fetch(url)
    .then((Response) => Response.json())
    .then((json) => {
      fillDataImage(json);
    })
    .catch((error) => {
      console.log("error en la api" + error);
    });
};

const fillData = (data) => {
  data.forEach((item) => {
    getDataImage(item.url);
  });
};

const fillDataImage = (dataImage) => {
  html += '<div class="col">';
  html += '<div class="card h-100 bg-info bg-opacity-10 ">';
  html += `<img src="${dataImage.sprites.other.dream_world.front_default}" class="card-img-top image" alt="...">`;
  html += '<div class="card-body">';
  html += `<h5 class="card-title">${dataImage.name}</h5>`;
  html += `<p>Altura: ${dataImage.height}</p>`;
  html += `<p>Tamaño: ${dataImage.weight}</p>`;
  html += "</div>";
  html += "</div>";
  html += "</div>";

  document.getElementById("characters").innerHTML = html;
};

const pagination = (info) => {
  html = "";
  let htmlPagination = "";

  htmlPagination += `<li class="page-item ${
    info.previous == null ? "disabled" : ""
  }"><a class="page-link textItem" onclick="getData('${info.previous}')">prev</a></li>`;

  htmlPagination += `<li class="page-item ${
    info.next == null ? "disabled" : ""
  }"><a class="page-link textItem" onclick="getData('${info.next}')">next</a></li>`;

  document.getElementById("pagination").innerHTML = htmlPagination;
};

getData(API);
