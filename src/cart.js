let total = 0;

// la load iau cart-ul din local storage
window.addEventListener('load', () => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	// calculez totalul
	if (cart) {
		cart.forEach((product) => {
			// pt fiecare produs din cart, calculez totalul
			total = total + Number(product.price) * product.noOfProducts;
		});

		// fiecare produs din cart e transformat intr-un card cu actiuni, butonul de delete are asociat un id 
		const productCards = cart
			.map(
				(product) =>
			`
				<tr>
					<td><img src="${product.image}" class="img-thumbnail"  width="50"  alt="..."></a></td>
					<td><a href="details.html?product-id=${product.id}">${product.title}</td>
					<td><b>${product.price}</b></td>
					<td>
						<button data-product-id=${product.id} class="decrement btn-info btn-xsm"> - </button>
						<span class="no-of-products">${product.noOfProducts}</span>
						<button data-product-id=${product.id} class="increment btn-info btn-xsm"> + </button>
					</td>
					<td class="subtotal">${product.price}DE MODIF</td>
					<td><button data-product-id=${product.id} class="delete btn btn-dark btn-sm">x</button></td>
				</tr>
			`
			)
			.join('');

		// update containerul cu total 
		let totalPriceCard = `<b>Total price: ${total}</b>`;
		// update product card
		document.querySelector('.products-in-cart').innerHTML = productCards;
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
	// o sa ne gaseasca daca este in cart pe ce am apasat
	const productInCart = cart.find(
		(productFromCart) =>
			productFromCart.id == targetButton.getAttribute('data-product-id')
	);
	// verific cantitatea
	let quantityParagraph = targetButton.parentNode;

	// din cele trei actiuni, + , - , delete , vom modifica cantitatea
	if (targetButton.classList.contains('increment')) {
		productInCart.noOfProducts++;
		increaseCartNumbers();
	} else if (targetButton.classList.contains('decrement')) {
		if (productInCart.noOfProducts > 1) productInCart.noOfProducts--;
		decreseCartNumbers();

	} else if (targetButton.classList.contains('delete')) {
		productInCart.noOfProducts = 0;
		// Updatez cart-ul sa nu mai contina acel prous, filtrat sa contina doar produsele diferite de acesta
		cart = cart.filter((product) => product.id != productInCart.id);
		targetButton.parentNode.parentNode.remove();

	}

	// updatez cart-ul in local storage si in pagina 
	localStorage.setItem('cart', JSON.stringify(cart));
	if (productInCart) {
		quantityParagraph.querySelector('.no-of-products').innerHTML =
			productInCart.noOfProducts;

		

	}

	let total = 0;
	cart.forEach((product) => {
		total = total + parseFloat(product.price) * product.noOfProducts;
	});
	let totalPriceCard = `<b>Total price: ${total}</b>`;
	document.querySelector('.total-price-container').innerHTML = totalPriceCard;
}




// Update numarul de produse din cart - local storage
function decreseCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if(productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers - 1);
		nrOfProducts();
	} else {
		localStorage.setItem('cartNumbers',  1);
		document.querySelector('.cart span').textContent = 1;
	}
	console.log(productNumbers)
}

function increaseCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if(productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		nrOfProducts();
	} else {
		localStorage.setItem('cartNumbers',  1);
		document.querySelector('.cart span').textContent = 1;
	}
	console.log(productNumbers)
}


// Sterg toate produsele din cos si golesc local storage  key - carst si cartNumbers
const totalContainer = document.querySelector('.cart-container');
cartContainer.addEventListener('click', deleteAll);

function deleteAll(event) {
	const addToCartBtn = event.target;
	let btnDeleteAll = addToCartBtn.classList.contains('delete-all');
	let cartContainer = document.querySelector('.cart-container .table');

	
	if (btnDeleteAll){
		// update containerul cu total 
		total = 0;	
		let totalPriceCard = `<b>Total price: ${total}</b>`;
		document.querySelector('.total-price-container').innerHTML = totalPriceCard;

		// update nr de producs ****************************************

		// delete produsele afisate in cart
		cartContainer.style.visibility = 'hidden';

		// delete storage keys: cart and cartNumbers
		localStorage.removeItem('cart');
		localStorage.removeItem('cartNumbers');

	}
}

// Update afisez nr de produse 
function nrOfProducts(){
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	console.log(productNumbers + 'test')

	// nrOfProductsInCart = document.getElementById('nrOfProductsInCart');
	// console.log(nrOfProducts)

	// if(productNumbers) {
	// 	nrOfProductsInCart.innerHTML = productNumbers;
		
	// } 
	// console.log(productNumbers)
}