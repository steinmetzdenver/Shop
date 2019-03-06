$(document).ready(function(){
//*************load item photos from file*******
accessoryPhotos.forEach(function(item){
 let imageRow = '<div class="img-row"> <img src="' + item.url +  '" class="row-image"></div>';
 let spanDescription = '<span class="item-description">' + item.description + '</span>' + '<br>';
 let spanId = '<span class="item-id">Item# ' + item.id + ' </span>' + '<br>';
 let spanPrice = '<span>$</span>' + '<span class="item-price">' + item.price + ' </span>' + '<br>';
 let addToCartButton = '<button class="add-to-cart-button" type="button"> Add To Cart </button>';
 let spanGroup = '<div class="span-group">' +  spanDescription + spanId + spanPrice + addToCartButton + '</div>';
 let divRow = '<div class="item-row">' + imageRow + spanGroup + '</div>';
 $("#item-list").append(divRow);
 }); // end load item photos from file************

 // ************begin item image mouseover event*************
 $("#item-list").on(
   {mouseover:function(){
     $(this).animate({"height":"400px","width":"400px","transition":"0.3"}, 1000)}
   ,
    mouseout:function(){
     $(this).animate({"height":"100px","width":"100px"}, 1000)}
   }
 , ".row-image");  
 // **************end item image mouseover event*****************

//*****check if item is already in cart***************
  function checkCartItemExists(newItem){
    let cartRows = $(".cart-item-row");
    let proceed = true;
   for (let i=0;i<cartRows.length;i++)
   {   
      let cartRow = cartRows[i];
      let rowID = cartRow.getElementsByClassName("cart-item-id")[0].innerText;
      if (rowID == newItem) {proceed = false}
   } return proceed;}

// ****************** begin add to shopping cart **************
 $("#item-list").on({"click":function(){addToShoppingCart(event)}},".add-to-cart-button" );

  function addToShoppingCart(event)
   {
    let buttonClicked = event.target;
    let rowGroup = buttonClicked.parentElement.parentElement;
    let price = rowGroup.getElementsByClassName("item-price")[0].innerText;
    let itemID = rowGroup.getElementsByClassName("item-id")[0].innerText;
    let description = rowGroup.getElementsByClassName("item-description")[0].innerText;
    let imageURL = rowGroup.getElementsByClassName("row-image")[0].src;
          //****if item already in shopping cart send alert*****
          if(checkCartItemExists(itemID)){
          let imageRow = '<div class="cart-img-row"> <img src="' + imageURL +  '" class="cart-row-image"></div>';
          let spanDescription = '<span class="cart-item-description">' + description + '</span>' + '<br>';
          let spanId = '<span class="cart-item-id">' + itemID + ' </span>' + '<br>';
           let spanPrice = '<span>$</span>' + '<span class="cart-price">' + price + '</span>' + '<span>, Quantity: </span>' + '<input class="quantity" " type="number" value="1" style="width:30px;font-size:12px;text-align:right"/> <br>';
          let removeButton = '<button class="remove-button" type="button"> Remove </button>';
          let spanGroup = '<div class="cart-span-group">' +  spanDescription + spanId + spanPrice + removeButton + '</div>';
          let divRow = '<div class="cart-item-row">' + imageRow + spanGroup + '</div>';
          $("#shopping-cart").append(divRow);
          updateTotal();
          }
          else {alert("You have already added this item to your shopping cart")}
          //******end if item already in shopping cart alert****
   } 
   // ************* end add to shopping cart****************
  //**************** begin remove item from shopping cart*************8         
 $("#shopping-cart").on({"click":function(){removeShoppingCart(event)}},".remove-button" );

 function removeShoppingCart(event){
   let removeButton = event.target;
   let removeItem = removeButton.parentElement.parentElement;
   $(removeItem).remove();
   updateTotal();
  }
  //****************** end remove item from shopping cart************
  //************** begin change quantity input event handler*********
  $("#shopping-cart").on({"change":function(){changeQuantity(event)}},".quantity" );   

  function changeQuantity(event)
   {   input = event.target;
       if ((input.value==" ") || (input.value <=0))
       {   alert("Please select a quantity greater than 0")
           input.value = 1;
       }
       updateTotal()
   }
  //**************** end change quantity input event handler*********
  //********** begin update total purchase price*******************
  function updateTotal(){
    let totalPrice = 0;
    let quantity = 1;
    let cartRows = $(".cart-item-row");
   for (let i=0;i<cartRows.length;i++)
   {   
      let cartRow = cartRows[i];
      let price = parseFloat(cartRow.getElementsByClassName("cart-price")[0].innerText);
      quantity = parseInt(cartRow.getElementsByClassName("quantity")[0].value);
      totalPrice = totalPrice + (price*quantity);  
      totalPrice = Math.round(totalPrice*100)/100;  
   }
   $("#total-purchase").text(totalPrice)}
  //************** end update total purchase price********
}); //end document ready


