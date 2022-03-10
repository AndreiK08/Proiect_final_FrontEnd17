// la load iau cart-ul din local storage
window.addEventListener('load', () => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	// calculez totalul
	let total = 0;
	if (cart) {
		cart.forEach((product) => {
			// pt fiecare produs din cart, calculez totalul
			total = total + Number(product.price) * product.noOfProducts;
		});

		// fiecare produs din cart e transformat intr-un card cu actiuni, butonul de delete are asociat un id 
		const productCards = cart
			.map(
				(product) =>
					`<div class="card w-75">
      				<div class="card-body">
        					<h5 class="card-title">${product.name}</h5>
        					<p class="card-text">${product.price}</p>
        					<p class="card-text">Number of products:
		  						<button data-product-id=${product.id} class="decrement btn btn-dark"> - </button>
					 				<span class="no-of-products">${product.noOfProducts}</span>
								<button data-product-id=${product.id} class="increment btn btn-dark"> + </button>
							</p>
      				</div>
						<button data-product-id=${product.id} class="delete btn btn-dark"> DELETE </button>
    				</div>`
			)
			.join('');

		// update containerul cu total **********DE MODIFICAT 
		let totalPriceCard = `<div>TOTAL: ${total}</div>`;
		// update product card
		document.querySelector('.cart-container').innerHTML = productCards;
		document.querySelector('.total-price-container').innerHTML = totalPriceCard;
	}
});

const cartContainer = document.querySelector('.cart-container');
cartContainer.addEventListener('click', handleCartActions);

// Oriunde dau click in container, verific elementele din anumite clase
function handleCartActions(event) {
	// iau butonul unde s-a dat click
	const targetButton = event.target;
	let cart = JSON.parse(localStorage.getItem('cart'));
	// o sa ne gaseacsa daca este in cart pe ce am apasat
	const productInCart = cart.find(
		(productFromCart) =>
			productFromCart.id == targetButton.getAttribute('data-product-id')
	);
	// ********** DE VERIFICAT DACA TREBUIE SA MODIFIC ******* p Number of product are copii  ************
	// verific cantitatea
	let quantityParagraph = targetButton.parentNode;

	// din cele trei actiuni, + , - , delete , vom modifica cantitatea
	if (targetButton.classList.contains('increment')) {
		productInCart.noOfProducts++;
	} else if (targetButton.classList.contains('decrement')) {
		if (productInCart.noOfProducts > 1) productInCart.noOfProducts--;

	} else if (targetButton.classList.contains('delete')) {
		productInCart.noOfProducts = 0;
		// Updatez cart-ul sa nu mai contina acel prous, filtrat sa contina doar produsele diferite de acesta
		cart = cart.filter((product) => product.id != productInCart.id);
		targetButton.parentNode.remove();
	}

	// updatez cart-ul in local storage si in pagina 
	localStorage.setItem('cart', JSON.stringify(cart));
	if (productInCart) {
		quantityParagraph.querySelector('.no-of-products').innerHTML =
			productInCart.noOfProducts;

		let total = 0;
		cart.forEach((product) => {
			total = total + Number(product.price) * product.noOfProducts;
		});
		// --------------------- DE MODIFICAT TOTAL PRICE SI STERS CAND COSUL E GOL!! ------------------------
		let totalPriceCard = `<div>TOTAL: ${total}</div>`;
		document.querySelector('.total-price-container').innerHTML = totalPriceCard;
	}
}
