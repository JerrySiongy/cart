let cart =
  document.querySelectorAll(
    ".add-cart",
  ); /* it will come in some way of an array so well have to loop through them*/

let products = [
  {
    brand: "Nike",
    name: "adizero",
    price: 3500,
    inCart: 0,
  },
  {
    brand: "Nike",
    name: "airmax_tn",
    price: 3500,
    inCart: 0,
  },
  {
    brand: "The DG",
    name: "dg",
    price: 3500,
    inCart: 0,
  },
  {
    brand: "North Face",
    name: "north_face_boot",
    price: 3500,
    inCart: 0,
  },
];

for (let i = 0; i < cart.length; i++) {
  cart[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(products) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(products);
}

function setItems(products) {
  let cartItems = localStorage.getItem("productsInCart");

  cartItems = JSON.parse(cartItems);

  console.log("My CartItems are", cartItems);

  if (cartItems != null) {
    if (cartItems[products.name] == undefined) {
      cartItems = {
        ...cartItems,
        [products.name]: products,
      };
    }
    cartItems[products.name].inCart += 1;
  } else {
    products.inCart = 1;
    cartItems = {
      [products.name]: products,
    };
  }

  

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products) {
  //console.log('the product price is', products.price);
  let cartCost = localStorage.getItem("totalCost");

  console.log("My cart Cost is:", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + products.price);
  } else {
    localStorage.setItem("totalCost", products.price);
  }
}

function displayCart(){

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let productsContainer = document.querySelector('.products-container');
    
    if(cartItems && productsContainer){
        productsContainer.innerHTML = ``;
        Object.values(cartItems).map(item =>{
            productsContainer.innerHTML += `
            <div class='products'>
                 <img src="static/shoes/${item.name}.jpeg">
                <span>${item.name}</span>
            </div> 
            `

        });
    }
}

onLoadCartNumbers();
displayCart();
