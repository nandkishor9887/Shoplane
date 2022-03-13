$(document).ready(function(){
    $(".slide-display").slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
              }
            }
          ]
    }
    );
})
var container = document.getElementsByClassName("card-container");
  function createCard(list) {
    var card = document.createElement("div");
    card.id = list.id;
    card.className = "card";
    var a = document.createElement("a");
    a.href = "product.html?id=" + list.id;
    var img = document.createElement("div");
    img.className = "img";
    var details = document.createElement("div");
    details.className = "details";
    var image = document.createElement("img");
    image.src = list.preview;
    var h3 = document.createElement("h3");
    h3.innerText = list.name;
    var h4 = document.createElement("h5");
    h4.innerText = list.brand;
    var h5 = document.createElement("p");
    h5.innerText = "Rs " + list.price;
    img.appendChild(image);
    details.appendChild(h3);
    details.appendChild(h4);
    details.appendChild(h5);
    a.appendChild(img);
    a.appendChild(details);
    card.appendChild(a);
    return card;
  }
  
  
$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(data){
  var productList = data
  for (var i = 0; i < productList.length; i++) {
    var card = createCard(productList[i]);
    if (!productList[i].isAccessory) {
      container[0].appendChild(card);
    } else {
      container[1].appendChild(card);
    }
  }
})

