

// Loading screen while products are being fetched
$('body').append('<div style="" id="loadingDiv"><div class="loader">Main page is loading...please wait</div></div>');

$(window).on('load', function(){
	setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});
function removeLoader(){
	$( "#loadingDiv" ).fadeOut(800, function() {
		// fadeOut complete. Remove the loading div
		$( "#loadingDiv" ).remove(); //makes page more lightweight 
	});  
}



// Produse luate de pe fakestoreapi.com
window.addEventListener('load', async () => {
	const productsURL = 'https://fakestoreapi.com/products';
	// produsele sunt tip json
	const result = await fetch(productsURL);
	// rezultatul produselor il transformam in obiect
	const products = await result.json();

	const productContainer = document.querySelector('.products-container');
	// products e un array. Fiind array, aplicam metoda map - ia fiecare element la rand, fiecare produs va fi transformat intr-un cod html si costumizat
	const cards = products
		.map(
			(product) =>
			// array de stringuri, separate prin virgula
				`<div class="container card-group ">
					<div class="container mt-4">
						<div class="row">
							<div class="col-md-4">
								<div class="card" style="width: 20rem;">
									<a href="details.html?product-id=${product.id}"><img src="${product.image}" class="card-img-top mx-auto d-block" alt="..."></a>
									<div class="card-body">
										<h5 class="card-title"><a href="details.html?product-id=${product.id}">${product.title}</a></h5>
										<p class="card-text details">${product.description}</p>
										<ul class="list-group list-group-flush">
											<li class="list-group-item">Rating: &#11088;${product.rating.rate}</li>
											<li class="list-group-item card-price"><span>Price: €</span>${product.price}</li>
										</ul>
										<div class="card-body">
										<a href="details.html?product-id=${product.id}"><button type="button" class="btn btn-secondary details">Details</button></a>
										<button type="button" class="btn btn-success add-cart" data-product-id=${product.id}>Add to cart</button></a>
										
										</div>
									</div>
								</div>
							</div>  
						</div>
					</div>
				</div>`
		)
		//.join transforma array-ul intr-un string fara virgula
		.join('');
	// rezultatul in div-ul .products-container
	productContainer.innerHTML = cards;
	onLoadCartNumbers();

});


// Add to cart ******************************************
document.querySelector('.products-container').addEventListener('click', addToCart);
async function addToCart(event){
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
				// Banner - produs adaugat cu succes in cos
				addToCartBanner();

				// Daca exista produsul, maresc cu unu
				productInCart.noOfProducts++;

			}else { // Daca produsul NU exista in cart
				// creez un obiect nou si il adaug
				const productToBeAddedInCart = {...product, noOfProducts: 1};
				cart.push(productToBeAddedInCart);
			}
	}

	// punem cart-ul updatat in local storage. Daca cart-ul este gol, stergem 
 	if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart));
	console.log(cart.length);

	cartNumbers();
	 
}

  // Afisare mesaj succes daca un produs adaugat a fost adaugat in cos
function addToCartBanner() {
	const messageBanner = `
		<div class="alert alert-success" role="alert" id="msgCartElem">
			Product added to cart!
		  </div>
	`;
	alert('Product added to cart!')
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


 


