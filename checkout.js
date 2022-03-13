if(localStorage.getItem("Product List")){
    var productList = localStorage.getItem("Product List")
    productList  = JSON.parse(productList)
}
else{
    var productList =[]
}
function createCard(product){
    var card = $("<div>").addClass("product-card")
    var imgDiv = $("<div>")
    var detailsDiv = $("<div>")
    var productImg = $("<img>").attr({
        class: "product-img",
        src: product.photos[0]
    })
    imgDiv.append(productImg)
    var name = $("<h4>").text(product.name)
    var count = $("<p>").text("x" + product.count)
    var priceTotal = product.count * product.price
    var amount = $("<p>").append([$("<span>").text("Amount: Rs ") , $("<span>").text(priceTotal)])
    detailsDiv.append(name,count,amount)
    card.append(imgDiv , detailsDiv)
    $("#product-cards").append(card)
    return priceTotal
}
var cardsCount = 0
var totalPrice = 0
for(var i=0; i < productList.length; i++){
    var priceEach = createCard(productList[i])
    totalPrice += priceEach
    cardsCount++
}
$("#item-count").text(cardsCount)
$("#total-cost").text(totalPrice)
$("#place-order-btn").click(function(){
    var orderArr = []
    if(productList.length > 0){
        for(var i=0; i<productList.length; i++){
            var obj = {
                "id" : productList[i].id,
                "brand" : productList[i].brand,
                "name" : productList[i].name,
                "isAccessory" : productList[i].isAccessory,
                "price" : productList[i].price,
                "count" : productList[i].count
            }
            orderArr.push(obj)
        }

        var dataToBackend = {
            amount: totalPrice,
            products: orderArr,
            createdAt : new Date().toISOString()
        }
        dataToBackend = JSON.stringify(dataToBackend)
        $.ajax({
            type: 'POST',
            url: "https://5d76bf96515d1a0014085cf9.mockapi.io/order",
            data : dataToBackend,
            dataType: "json",
            contentType: "application/json",
            function(){
            alert("Order Placed Successfully")
            localStorage.setItem("Product List" , [])
            location.assign('./orderplaced.html')
            }
            
        }).fail(function(){
            alert("Order Placed Successfully")
            localStorage.setItem("Product List" , [])
            location.assign('./orderplaced.html')
        })
    }
    else{
        alert("No items in cart")
    }

})
