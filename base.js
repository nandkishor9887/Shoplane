$(document).ready(function(){
    var productList = localStorage.getItem("Product List")
    
    if(productList){
        if(productList.length > 0){
            var count = 0
            productList = JSON.parse(productList)
            for(var i=0; i < productList.length; i++){
                count += productList[i].count
                $("#cart-count").text(count)
            }
        }
    }
})

