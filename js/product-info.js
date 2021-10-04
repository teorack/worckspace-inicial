var productsInfo = [];
var Comments = [];
var relatedP = [];
var cantidad = 0;
var contCommentarios = 0;
var date = new Date();
var active = new Boolean(true);
var addingComment = new Boolean(false);
var firstRelated = new Boolean(true);
var producto = localStorage.getItem('idProducto');
let related = "";

function showProductsInfo(array){
    let info = "";
    let imgs = "";
    info += `
        <h2 class="mt-4 text-white bg-dark d-flex justify-content-center p-2">${array.name}</h2>
        <div>
            <p class="container"> Descripción: ${array.description}</p>
            <p class="cost d-flex justify-content-center"><b>${array.cost +" "+ array.currency}</b></p>
            <p class="container text-right">Cantidad de Vendidos: ${array.soldCount}</p>
            <p class="container text-right">Categoria: ${array.category}</p>
        </div>
        `;
    imgs += `
        <div class="carousel-item active">
        <img class="d-block w-60" src="`+ array.images[0] +`" alt="No Imagen">
        </div>
        `;
    for (let i = 1; i < array.images.length; i++){
        let img = array.images[i];
        
        imgs += `
        <div class="carousel-item">
        <img class="d-block w-60" src="`+ img +`" alt="No Imagen">
        </div>
        `;
    }
        
    document.getElementById("content").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    }

function showRelatedProducts(array){

    related += `
    <div class="card" style="max-width:30%; max-height:30%;">
        <a href="product-info.html" onclick="localStorage.setItem('idProducto','`+array.id+`')">
        <img class="card-img-top2 img-fluid" src="`+ array.imgSrc +`" alt="Imagen NO Disponible">
        <div class="card-body">
            <h3 class="card-title"><b>`+ array.name +`</b></h3>
            <div class="card-text">
                <p class="precio">`+ array.cost +` `+ array.currency +`</p>
                <p>Vendidos: `+ array.soldCount +`</p>
            </div>
        </div>
        </a>
    </div>
    `

    document.getElementById("RelatedProducts").innerHTML = related;
}

function showComments(array){
    let htmlContentToAppend = "";
    // Agrega un item al carrusel para que quede de a 3 comentarios
    if(addingComment == false){
        htmlContentToAppend += `<div class="carousel-item active">
                                 <div class="card-deck content d-flex justify-content-around">`;
    }else{
        if(cantidad == 3){
            if(contCommentarios % 3 == 0){
                htmlContentToAppend += `<div class="carousel-item">
                                 <div class="card-deck content d-flex justify-content-around">`;
            }
        }else{

        }
    }

    for (let i = 0; i < array.length; i++){
        //Creo item en carrusel
        if (cantidad == 3){
            htmlContentToAppend += `<div class="carousel-item">
                                        <div class="card-deck content d-flex justify-content-around">`
            cantidad = 0;
        }
        let comment = array[i];
        htmlContentToAppend += `
        <div class="card h-auto" style="max-width: 15rem; min-height: 22rem">
            <div class="row no-gutters">
                <img class="card-img-top rounded-circle" src="img/default-user-image.png" alt="No image">
                <div class="card-body">
                    <h3 class="card-title" style="margin-top:-5%;"><b>`+ comment.user +`</b></h3>
                    <div class="card-text">
                        <p id="score`+ i +`">
                        </p>
                        <p>`+ comment.description + `</p>
                        <p class="fch">`+ comment.dateTime +`</p>
                    </div>
                </div>
            </div>
        </div>
    `
        cantidad ++;
        contCommentarios++;
        //Verifico la cantidad para cerrar el carrusel activo o el que no es activo.
        if (cantidad == 3 && active){
            htmlContentToAppend += `</div></div>`
            active=false;
        }else if (cantidad == 3){
            htmlContentToAppend += `</div>`
        }
    }
    if(addingComment){
        document.getElementById("carousel-comments").innerHTML += htmlContentToAppend + "</div>";
    }else{
        document.getElementById("carousel-comments").innerHTML = htmlContentToAppend + "</div>";
    }
}
function score(array){
    for (let i = 0; i < array.length; i++){
        var star = 0;
        let comment = array[i];
        htmlContentToAppend = "";
        for(j = 0 ; j < comment.score; j++){
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`
            star++;
        }
    document.getElementById("score"+i+"").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL+producto+".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsInfo = resultObj.data;
            showProductsInfo(productsInfo);
            
            for(let i=0; i<productsInfo.relatedProducts.length; i++){
                getJSONData(PRODUCTS_URL).then(function(resultObj){
                    if (resultObj.status === "ok")
                    {
                        relatedP = resultObj.data;
                        showRelatedProducts(relatedP[productsInfo.relatedProducts[i]]);
                    }
                })
            }
            
        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            Comments = resultObj.data;
            showComments(Comments);
            score(Comments);
        }
    })/*
    document.getElementById("addComment").addEventListener("click", function(){
        var name = document.getElementById('name').value;
	    var comment = document.getElementById('comment').value;
        const addComment = '{"score": "5", "description": "hola", "user": "ROBERTO", "date": "2222"}';
	    if(name =="" || comment ==""){
	        alert("Porfavor introduce la informacion requerida!");
	    }else{
            addingComment = true;
            showComments(addComment);
    }
    });*/
});