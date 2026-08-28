let cart = document.querySelectorAll('.add-cart'); /* it will come in some way of an array so well have to loop through them*/

let products = [{
    brand: 'Nike',
    name: 'classic Adizero',
    price: 3500,
    incart: 0
},
{
    brand: 'Nike',
    name: 'air Max',
    price: 3500,
    incart: 0
},
{
    brand: 'The DG',
    name: 'classic dg',
    price: 3500,
    incart: 0
},
{
    brand: 'North Face',
    name: 'north face boot',
    price: 3500,
    incart: 0
}
]

for (let i = 0; i < cart.length; i++) {

    cart[i].addEventListener('click', () => {
        cartNumbers();
    });
}


function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }

    
}


function cartNumbers() {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers',1)
        document.querySelector('.cart span').textContent = 1;
    }

}

onLoadCartNumbers();