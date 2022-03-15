const productTableBody = document.querySelector('.admin-products-table');
const addNewProductBtn = document.querySelector('.add-new-product');
const updateProductBtn = document.querySelector('.update-product');

// 
const productsURL = 'https://fakestoreapi.com/products';

window.addEventListener('load', getAllProducts);

// Iau produsele si le afisez
async function getAllProducts() {
	const result = await fetch(productsURL);
	const products = await result.json();

	const tableRows = products
		.map(
			(product) =>
				`<tr>
               <th scope="row">${product.id}</th>
               <th scope="row" class="admin-prod-img"><img src="${product.image}" class="img-fluid" alt="Responsive image"></th>
               <td>${product.title}</td>
               <td>${product.rating.count}</td>
               <td>${product.price}</td>
               <td><button class="btn btn-danger delete" data-product-id=${product.id}>X
               </button></td>
               <td><button class="btn btn-primary edit" data-product-id=${product.id}>✏
               </button></td>
            </tr>`
		)
		.join('');

	productTableBody.innerHTML = tableRows;
}

productTableBody.addEventListener('click', handleProducts);

async function handleProducts(event) {
	const productId = event.target.getAttribute('data-product-id');
	if (event.target.classList.contains('delete')) {
		let response = await fetch(`${productsURL}/${productId}`, {
			method: 'DELETE',
		});
		console.log(response);
		getAllProducts();
	} else if (event.target.classList.contains('edit')) {
		console.log('to edit', productId);
		editProductById(productId);
	}
}

addNewProductBtn.addEventListener('click', addNewProduct);

async function addNewProduct(event) {
	event.preventDefault();

	const newProductName = document.getElementById('name').value;
	const newProductPrice = document.getElementById('price').value;
	const newProductDescription = document.getElementById('description').value;

	let response = await fetch(productsURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			title: newProductName,
			price: newProductPrice,
			description: newProductDescription,
		}),
	});

	let product = await response.json();
	console.log('This is the new product:', product);

	let newProductTableRow = `<tr>
         <th scope="row">${product.id}</th>
		 <th scope="row" class="admin-prod-img"><img src="${product.image}" class="img-fluid" alt="Responsive image"></th>
         <td>${product.title}</td>
         <td>${product.price}</td>
         <td><button class="btn btn-danger" data-product-id=${product.id}>X
         </button></td>
         <td><button class="btn btn-primary" data-product-id=${product.id}>✏
         </button></td>
      </tr>`;

	productTableBody.innerHTML += newProductTableRow;
	alert('Product successfully added to cart but access to the new id you will gets a 404 error.');
}

updateProductBtn.addEventListener('click', updateProduct);

async function updateProduct(event) {
	event.preventDefault();

	const productName = document.getElementById('name').value;
	const productPrice = document.getElementById('price').value;
	const productDescription = document.getElementById('description').value;
	// value from hidden input
	const productId = document.getElementById('productId').value;

	let response = await fetch(`${productsURL}/${productId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id: productId,
			name: productName,
			price: productPrice,
			description: productDescription,
		}),
	});

	let data = await response.json();
	getAllProducts();
	alert('Product updated but that nothing in real is inserted into the database. Access the new id you will get a 404 error. ')
}

async function editProductById(productId) {
	const productNameElement = document.getElementById('name');
	const productPriceElement = document.getElementById('price');
	const productDescriptionElement = document.getElementById('description');
	const productStockElement = document.getElementById('stock');
	const productIdHiddenElement = document.getElementById('productId');

	let response = await fetch(`${productsURL}/${productId}`);
	let product = await response.json();

	productNameElement.value = product.title;
	productPriceElement.value = product.price;
	productDescriptionElement.value = product.description;
	productStockElement.value = product.rating.count;
	productIdHiddenElement.value = product.id;
}
