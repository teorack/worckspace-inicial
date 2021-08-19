
var arrayproductos = [];

function listado(arrayproductos) {
  let htmlContentToAppend = "";
  for (let i = 0; i < arrayproductos.length; i++) {
    let product = arrayproductos[i];

  htmlContentToAppend += `
  <a href="category-info.html" class="list-group-item list-group-item-action">
      <div class="row">
          <div class="col-3">
              <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
          </div>
          <div class="col">
              <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">`+ product.name +`</h4>
                  <small class="text-muted">` + product.productCount + ` artículos</small>
              </div>
              <p class="mb-1">` + product.description + `</p>
          </div>
      </div>
  </a>
  `

   document.getElementById("autos").innerHTML = htmlContentToAppend;
  }};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes. hola
document.addEventListener("DOMContentLoaded", function (e) {
getJSONData(UCT_INFO_URL).then(function (resultObj){
  if (resultObj.status === "ok"){
    arrayproductos = resultObj.data;
    listado(arrayproductos);
  } 

})
});
