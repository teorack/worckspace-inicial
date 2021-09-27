var carsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function showCarsList(array){
    let htmlContentToAppend = `<div class="card-deck">`;

    for (let i = 0; i < array.length; i++){
        let product = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            
                <div class="card mb-3 style="max-width: 35%; min-width: 30%; margin: 1.0rem;"">
                    <img class="card-img-top img-fluid" src="`+ product.imgSrc +`" alt="Imagen NO Disponible">
                    <div class="card-body">
                    <h3 class="card-title"><b>`+ product.name +`</b></h3>
                    <div class="card-text">
                    <p>`+ product.description + `</p>
                    <p class="precio">`+ product.cost +` `+ product.currency +`</p>
                    <p>Vendidos: `+ product.soldCount +`</p>
                    <p><button id="cart-auto-`+i+`">Agregar al Carrito</button></p>
                    </div>
                    </div>
                </div>
            
            `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
    document.getElementById("cat-list-container").innerHTML += "</div>";
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carsArray = resultObj.data;
            showCarsList(carsArray);
        }
    })
    document.getElementById("sortDesc").addEventListener("click", function(){
        carsArray.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        })
        showCarsList(carsArray);
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        carsArray.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        })
        showCarsList(carsArray);
    });
    document.getElementById("sortByCount").addEventListener("click", function(){
        carsArray.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        })
        showCarsList(carsArray);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCarsList(carsArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCarsList(carsArray);
    });
});