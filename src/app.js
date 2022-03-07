// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


window.addEventListener('load', async () => {
	const productsURL = 'https://62146cca89fad53b1f136ccd.mockapi.io/products';
	const result = await fetch(productsURL);
	const products = await result.json();

	const productContainer = document.querySelector('.products-container');

	const cards = products
		.map(
			(product) =>
				`<div class="card" style="width: 18rem;">
               <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.price}</p>
                  <a href="details.html?product-id=${product.id}" class="btn btn-primary">Details</a>
               </div>
            </div>`
		)
		.join('');

	productContainer.innerHTML = cards;
});
