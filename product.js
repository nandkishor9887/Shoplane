var id = window.location.href.split("=")[1]
$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + id , function(data){
    var productData = data
    productDetail(productData)
    $("#add-to-cart").click(function(){
        var cartCount = $('#cart-count').text()
        cartCount = parseInt(cartCount)
        cartCount++
        $('#cart-count').text(cartCount)
        $("#add-to-cart").addClass("scale-up")
        setTimeout(function(){$("#add-to-cart").removeClass("scale-up")},200)
        if(localStorage.getItem("Product List")){
            var productList = JSON.parse(localStorage.getItem("Product List"))
            var flag = false
            for(var i=0; i<productList.length; i++){
                if(productList[i].id === id){
                    productList[i].count++
                    localStorage.setItem("Product List",JSON.stringify(productList))
                    flag = true
                }
            }
            if(!flag){
                var obj= productData
                obj.count = 0
                obj.count++
                productList.push(obj)
                localStorage.setItem("Product List", JSON.stringify(productList))
            }
        }
        else{
            var productList = []
            var obj = productData
            obj.count = 0
            obj.count++
            productList.push(obj)
            localStorage.setItem("Product List",JSON.stringify(productList))
        }
    })
    //on btn click get the product obj and do Create operation on local storage
    //include count key in obj
    //on add btn click again if product with that id exists in loc storage get its count and increment it
    
    
})
function productDetail(productData){
    var main = document.getElementById("product");
    var rightColumn = document.getElementsByClassName("right-column")
    var leftColumn = document.getElementsByClassName("left-column")

    //Creating Left-column
    var leftImg = document.createElement("img")
    leftImg.id = "productImg"
    leftImg.src = productData.preview
    leftColumn[0].appendChild(leftImg)

    //creating  Right-column
    var productDesc = document.getElementsByClassName("product-description")

    //Heading, Brand, Price and Description section
    var heading = document.createElement("h1");
    heading.id = "name"
    var brand = document.createElement("h1");
    brand.id = "brand"
    var price = document.createElement("h3");
    price.innerText = "Price: Rs "
    var spanPrice = document.createElement("span");
    spanPrice.id = "price";
    price.appendChild(spanPrice)
    heading.innerText = productData.name;
    brand.innerText = productData.brand;
    spanPrice.innerText = productData.price;
    var desc =  document.createElement("div");
    desc.className = "description";
    var descHead = document.createElement("h3");
    descHead.innerText = "Description"
    var descText = document.createElement("p")
    descText.id = "description"
    descText.innerText = productData.description;
    desc.appendChild(descHead);
    desc.appendChild(descText);

    //product preview section
    productPreview = document.createElement("div");
    productPreview.className = "product-preview";
    proPreText = document.createElement("h3");
    proPreText.innerText = "Product Preview";
    productPreview.appendChild(proPreText);

    //Conatiner for the product photos
    previewImg = document.createElement("div");
    previewImg.className = "previewImg";
    productPreview.appendChild(previewImg)

    //Appending the child nodes for product-description
    productDesc[0].appendChild(heading);
    productDesc[0].appendChild(brand);
    productDesc[0].appendChild(price);
    productDesc[0].appendChild(desc);
    productDesc[0].appendChild(productPreview);

    //Loop for creating product photos
    for(var idx=0; idx<productData.photos.length; idx++){
        var productPhoto = document.createElement("img");
        productPhoto.id = "img" + idx;
        productPhoto.src = productData.photos[idx];
        previewImg.appendChild(productPhoto)
        
        //Giving active class for first photo, so it has a default border when the page loads
        if(idx === 0){
            productPhoto.className = "active"
        }
        
        //onclick function for product photos
        productPhoto.onclick = function(e){
            document.getElementsByClassName("active")[0].className =""   
            
            e.target.className = "active"
            leftImg.src = e.target.src
        
            //Loop to remove any class active for photos other than the one clicked at the moment
            
        }   
    }

    //Add to cart button
    var addToCart = document.createElement("div");
    addToCart.className = "btn";
    var btn = document.createElement("button")
    btn.id = "add-to-cart"
    btn.innerText = "Add to Cart"
    addToCart.appendChild(btn)
    rightColumn[0].appendChild(addToCart)
}
