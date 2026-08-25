let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));

if(!productsInCart){
    productsInCart = [];  /*so that we dont get an error if the cart has no product since no product is null and the null value has no length well change it to an empty array*/
}


const parentElement = document.querySelector('#buyItems');

const cartSumPrice = document.querySelector('#sum-prices');

const products =document.querySelectorAll('.product-under');

const countTheSumPrice = function(){
    let sumPrice = 0;
    productsInCart.forEach(product =>{
        sumPrice += product.price;

    });
    
    return sumPrice
}



const updateShoppingCartHTML = function(){

    localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));

    if (productsInCart.length > 0){
        let result = productsInCart.map(product => {
            return ` <li class="buyItem">
          <img src="${product.image}" alt="">
          <h5>${product.name}</h5>
          <h6>${product.price}</h6>
          <div>
            <button class="button-minus" data-id="${product.id}">-</button> 
            <span class="countOfProduct">${product.count}</span>
            <button class="button-plus" data-id = '${product.id}'>+</button>
          </div>
        </li> `
        });
        parentElement.innerHTML = result.join(''); /*because the result of map functioin is an array and we only want on html code and not an array of html codes so the join joins it all into one string */
        document.querySelector('.checkout').classList.remove('hidden');
        cartSumPrice.innerHTML = "$" + countThePrice();     
    }
    else{
        document.querySelector('.checkout').classList.add('hidden');
        parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>'
        cartSumPrice.innerHTML = '';
    }

}

/*this function will first check if theres any product in the product list if it does then it will loop throgh all the products and generate the html for it then add it to the parent element*/


function updateProductsInCart(product){
    for(let i=0; i<productsInCart.length; i++){
        if(productsInCart[i].id == product.id){
            productsInCart[i].count += 1;
            productsInCart[i].price = productsInCart.basePrice * productsInCart[i].count;

            return;
        }

    }
/*if it loops and doesnt find the products with the same id then the product doesnt exist in the list and we can add the push the product*/
    productsInCart.push(product); 
}



products.forEach(product => {
    product.addEventListener('click', (e) =>{
        if(e.target.classList.contains('addToCart')){
            const productID = e.target.dataset.productID;
            const productName = product.querySelector('.productName').innerHTML;
            const productPrice = product.querySelector('.priceValue').innerHTML;
            const productImage = product.querySelector('img').src;

            let productToCart = {
                name :productName,
                image : productImage,
                id : productID,
                count : 1,
                price : +productPrice,
                basePrice : +productPrice, /*base price because the price will change everytime the count changes*/
            }

            updateProductsInCart(productToCart);
            updateShoppingCartHTML()
        }
    });
   
});


parentElement.addEventListener('click', (e) => {
    const isPlusButton = e.targetclassList.contains('button-plus'); /* will return true if the button has the plus button */
    const isMinusButton = e.targetclassList.contains('button-minus'); /* will return true if the button has the minus button */

    if (isPlusButton || isMinusButton){
        for(let i=0; i< productsInCart.length;i++ ){
            if(productsInCart[i].id == e.target.dataset.id){
                if(isPlusButton){
                    productsInCart[i].count += 1;

                }
                else if(isMinusButton){
                    productsInCart[i].count -= 1;

                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            }
            if(productsInCart[i].count <=0){
                productsInCart.splice(i, 1);

            }
        }
        updateShoppingCartHTML();
    }
});

updateShoppingCartHTML();