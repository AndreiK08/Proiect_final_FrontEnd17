

window.addEventListener('load', async () => {

	// folosesc ceea ce da obiectul window, location.search.
	let searchParamString = window.location.search;
	// iau id-ul din fiecare details.html folosind URLSearchParams
	const searchParam = new URLSearchParams(searchParamString);
	const productId = searchParam.get('product-id');

	// pe baza id-ului Fiecare produs se transforma intr-un card
	const productURL = `https://fakestoreapi.com/products/${productId}`;
	const result = await fetch(productURL);
	// rezultatul va fi un singur obiect
	const product = await result.json();
// *************** DE ADAUGAT NR PRODUSE IN STOC SI IMAGINE ************************
	// transform obiectul intr-un card
	const productCard = `
	<div class="container">
				<div class="row">
					<div class="col-md-5">
						<img src="${product.image}" class="img-fluid" alt="Responsive image">
					</div>
					<div class="col-md-7">
						<h2>${product.title}</h2>
						<h5><b>${product.category}</b></h5>
						<br>
						<p class="card-text">${product.description}</p>
						<p class="card-text">Products in stoc: ${product.rating.count}</p>
						<p><b>Rating: &#11088;${product.rating.rate}</b></p>
						<h4 class="price-details">Price: €${product.price}</h4>
						<label value="1">Quantity:</label>
						<input type="text" value="1" >
						<button data-product-id=${product.id} type="button" class="btn btn-success cart add-cart">Add to cart</button>
					</div>
				</div>
			</div>`;

	// pun produsul in div-un .product-details
	document.querySelector('.product-details').innerHTML = productCard;
	onLoadCartNumbers()

});

// la apasarea butonului de Add to cart vom lua id-ul produsului, definit de proprietatea data-product-id
document.querySelector('.product-details').addEventListener('click', addToCart);
export async function addToCart(event){
	// iau atributul data-product-id 
	const addToCartBtn = event.target;
	let productId = addToCartBtn.getAttribute('data-product-id');

	// la click vom avea informatiile despre produs
	const productURL = `https://fakestoreapi.com/products/${productId}`;
	const result = await fetch(productURL);
	const product = await result.json();

	// Punem in local storage, in obiectul cart, produsul meu
	let cart = [];
	// Daca Local Storage este go (null)
	if (localStorage.getItem('cart') == null) {
		// adaug in cos produsul din backend, folosid spread operator, adaug o noua proprietate, nr de produse in cos
		cart.push({ ...product, noOfProducts: 1 });

		// Banner - produs adaugat cu succes in cos
		addToCartBanner();
	


		} else { 
			// Verific daca in cos exista produse cu id-ul produsului din details
			cart = JSON.parse(localStorage.getItem('cart'));
			const productInCart = cart.find((productFromCart) => productFromCart.id == product.id);
			
			if (productInCart != undefined){ // Daca produsul exista in cart
				
	
				// Daca exista produsul, maresc cu unu
				productInCart.noOfProducts++;
				console.log('Produsul exista in cos');
				alreadyInCart();

			}else { // Daca produsul NU exista in cart
				// creez un obiect nou si il adaug
				const productToBeAddedInCart = {...product, noOfProducts: 1};
				cart.push(productToBeAddedInCart);
				console.log('Produsul a fost adaugat prima oara in cos');
				// Banner - produs adaugat cu succes in cos
				addToCartBanner();

			}
	}

	// punem cart-ul updatat in local storage. Daca cart-ul este gol, stergem 
 	if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart));
	cartNumbers()

}

  // Afisare mesaj succes daca un produs adaugat a fost adaugat in cos
function addToCartBanner() {
	const messageBanner = `
		<div class="alert alert-success" role="alert" id="msgCartElem">
			Product added to cart!
		  </div>
	`;
	const addOk = document.querySelector('.product-added-container');
	addOk.innerHTML = messageBanner;
	
  }
//   DE ADAUGAT *******************
function alreadyInCart() {
	const messageBanner = `
		<div class="alert alert-warning" role="alert" id="msgCartElem">
			Product already in cart!
		  </div>
	`;
	const addOk = document.querySelector('.product-added-container');
	addOk.innerHTML = messageBanner;
	
  }


//   Salvez in local storage numarul de produse adaugate in cos si afisez rezultatul in cart span
function cartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if(productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers + 1;
		
	} else {
		localStorage.setItem('cartNumbers',  1);
		document.querySelector('.cart span').textContent = 1;
	}
	console.log(productNumbers)
}

// On load - afisez numarul produselor din local storage
function onLoadCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');
	if (productNumbers){ 
		document.querySelector('.cart span').textContent = productNumbers;
	}
}