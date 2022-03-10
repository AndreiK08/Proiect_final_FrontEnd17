// *** Produsele apar la incarcarea paginii ***
// window.addEventListener('load', async () => {
// 	const productsURL = 'https://62146cca89fad53b1f136ccd.mockapi.io/products';
// 	// produsele sunt tip json
// 	const result = await fetch(productsURL);
// 	// rezultatul produselor il transformam in json
// 	const products = await result.json();

// 	const productContainer = document.querySelector('.products-container');
// 	// products e un array. Fiind array, aplicam metoda map - ia fiecare element la rand, fiecare produs va fi transformat intr-un cod html si costumizat
// 	const cards = products
// 		.map(
// 			(product) =>
// 			// array de stringuri, separate prin virgula
// 				`<div class="card" style="width: 18rem;">
//                <div class="card-body">
//                   <h5 class="card-title">${product.name}</h5>
//                   <p class="card-text">${product.price}</p>
//                   <a href="details.html?product-id=${product.id}" class="btn btn-primary">Details</a>
//                </div>
//             </div>`
// 		)
// 		//.join transforma array-ul intr-un string fara virgula
// 		.join('');
// 	// rezultatul in div-ul .products-container
// 	productContainer.innerHTML = cards;
// });


// Test using Fakestoreapi.com
window.addEventListener('load', async () => {
	const productsURL = 'https://fakestoreapi.com/products';
	// produsele sunt tip json
	const result = await fetch(productsURL);
	// rezultatul produselor il transformam in json
	const products = await result.json();

	const productContainer = document.querySelector('.products-container');
	// products e un array. Fiind array, aplicam metoda map - ia fiecare element la rand, fiecare produs va fi transformat intr-un cod html si costumizat
	const cards = products
		.map(
			(product) =>
			// array de stringuri, separate prin virgula
				`<div class="card" style="width: 18rem;">
               <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.price}</p>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text">${product.category}</p>
				  <img src="${product.image}"  width="50" height="60">
                  <a href="details.html?product-id=${product.id}" class="btn btn-primary">Details</a>
               </div>
            </div>`
		)
		//.join transforma array-ul intr-un string fara virgula
		.join('');
	// rezultatul in div-ul .products-container
	productContainer.innerHTML = cards;
});
