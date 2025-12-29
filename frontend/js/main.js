BASE_URL = "http://127.0.0.1:8000"
PRODUCTS_URL = "http://127.0.0.1:8000/products/all"
PRODUCT_URL = "http://127.0.0.1:8000/products/product"
CART_URL = "http://127.0.0.1:8000/cart"
PER_PRODUCT_TOTAL_URL = "http://127.0.0.1:8000/perproducttotal"

AOS.init({
	duration: 800,
	easing: 'slide',
	once: true
});

jQuery(document).ready(function ($) {

	"use strict";

	var slider = function () {
		$('.nonloop-block-3').owlCarousel({
			center: false,
			items: 1,
			loop: false,
			stagePadding: 15,
			margin: 20,
			nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
			responsive: {
				600: {
					margin: 20,
					items: 2
				},
				1000: {
					margin: 20,
					items: 3
				},
				1200: {
					margin: 20,
					items: 3
				}
			}
		});
	};
	slider();


	var siteMenuClone = function () {

		$('<div class="site-mobile-menu"></div>').prependTo('.site-wrap');

		$('<div class="site-mobile-menu-header"></div>').prependTo('.site-mobile-menu');
		$('<div class="site-mobile-menu-close "></div>').prependTo('.site-mobile-menu-header');
		$('<div class="site-mobile-menu-logo"></div>').prependTo('.site-mobile-menu-header');

		$('<div class="site-mobile-menu-body"></div>').appendTo('.site-mobile-menu');



		$('.js-logo-clone').clone().appendTo('.site-mobile-menu-logo');

		$('<span class="ion-ios-close js-menu-toggle"></div>').prependTo('.site-mobile-menu-close');


		$('.js-clone-nav').each(function () {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function () {

			var counter = 0;
			$('.site-mobile-menu .has-children').each(function () {
				var $this = $(this);

				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});

				counter++;

			});

		}, 1000);

		$('body').on('click', '.arrow-collapse', function (e) {
			var $this = $(this);
			if ($this.closest('li').find('.collapse').hasClass('show')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();

		});

		$(window).resize(function () {
			var $this = $(this),
				w = $this.width();

			if (w > 768) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	};
	siteMenuClone();


	var sitePlusMinus = function () {
		$('.js-btn-minus').on('click', function (e) {
			e.preventDefault();
			if ($(this).closest('.input-group').find('.form-control').val() != 0) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function (e) {
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	sitePlusMinus();


	var siteSliderRange = function () {
		$("#slider-range").slider({
			range: true,
			min: 0,
			max: 500,
			values: [75, 300],
			slide: function (event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) +
			" - $" + $("#slider-range").slider("values", 1));
	};
	siteSliderRange();


	var siteMagnificPopup = function () {
		$('.image-popup').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				verticalFit: true
			},
			zoom: {
				enabled: true,
				duration: 300 // don't foget to change the duration also in CSS
			}
		});

		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	};
	siteMagnificPopup();

	var searchShow = function () {
		// alert();
		var searchWrap = $('.search-wrap');
		$('.js-search-open').on('click', function (e) {
			e.preventDefault();
			searchWrap.addClass('active');
			setTimeout(function () {
				searchWrap.find('.form-control').focus();
			}, 300);
		});
		$('.js-search-close').on('click', function (e) {
			e.preventDefault();
			searchWrap.removeClass('active');
		})
	};
	searchShow();

});

//to get products in products.html//
async function load_products() {
	const res = await fetch(PRODUCTS_URL);
	const data = await res.json();
	const container = document.querySelector(".products_listing");

	data.forEach(p => {
		const div = document.createElement("div");
		div.className = "product_card";
		div.dataset.id = p.p_id;

		div.innerHTML = `
            <img src="http://127.0.0.1:8000/static/${p.p_image}" class="product_img" />
            <h2>${p.p_name}</h2>
            <p>${p.p_desc}</p>
            <p1>₹${p.p_price}</p1>
        `;

		div.addEventListener("click", () => {
			window.location.href = `product.html?id=${p.p_id}`;
		});

		container.appendChild(div);
	});
}

if (window.location.pathname.includes("products.html")) {
	load_products();
}

//to load single product in product.html//
async function load_single_product() {
	const params = new URLSearchParams(window.location.search);
	const productId = params.get("id");

	if (!productId) return;

	const res = await fetch(`${PRODUCT_URL}/${productId}`);
	const p = await res.json();

	document.getElementById("product_detail").innerHTML = `
        <img src="http://127.0.0.1:8000/static/${p.p_image}" class="product_img" />
        <h1>${p.p_name}</h1>
        <p>${p.p_desc}</p>
        <h3>₹${p.p_price}</h3>
    `;
}

if (window.location.pathname.includes("product.html")) {
	load_single_product();
}

const addBtn = document.getElementById("addToCartBtn");
if (addBtn) {
	addBtn.addEventListener("click", async () => {
		const params = new URLSearchParams(window.location.search);
		const productId = params.get("id");

		const size = document.querySelector(
			'input[name="shop-size"]:checked'
		)?.value;

		const quantity = parseInt(
			document.getElementById("quantity-input").value
		);

		if (!size) {
			alert("Please select a size");
			return;
		}

		await fetch(`http://127.0.0.1:8000/cart/add/${productId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				p_size: size,
				p_quantity: quantity
			})

		});

		window.location.href = "cart.html";
		updateCartCount();
	});
}

//cart per product total//
async function loadCart() {
	const res = await fetch("http://127.0.0.1:8000/cart/perproducttotal");
	const data = await res.json();

	const tbody = document.querySelector(".table-cart");

	tbody.innerHTML = "";

	data.items.forEach(p => {
		const tr = document.createElement("tr");

		tr.innerHTML = `
      <td><img src="http://127.0.0.1:8000/static/${p.p_image}" width="80"></td>
      <td>${p.p_name}</td>
      <td>${p.p_size}</td>
      <td>₹${p.p_price}</td>
      <td>${p.p_quantity}</td>
      <td>₹${p.total_price}</td>
      <td><button type="button"class="btn btn-danger btn-sm"onclick="removeItem(this, ${p.c_id})"> X</button></td>
    `;

		tbody.appendChild(tr);
	});
}

loadCart();


function removeItem(btn, c_id) {
	fetch(`http://127.0.0.1:8000/cart/${c_id}`, {
		method: "DELETE"
	})
		.then(res => {
			if (!res.ok) throw new Error("Delete failed");
			const row = btn.closest("tr");
			row.remove();
			updateCartCount();
			loadtotals();
		})
		.catch(err => {
			console.error(err);
			alert("Unable to delete item");
		});
}


// checkout per product total//
async function loadCheckout() {
	const res = await fetch("http://127.0.0.1:8000/cart/perproducttotal");
	const data = await res.json();

	const tbody = document.getElementById("checkout_table");
	tbody.innerHTML = "";

	data.items.forEach(p => {
		const tr = document.createElement("tr");

		tr.innerHTML = `
		<tr>
      		<td>${p.p_name} x ${p.p_quantity}</td>
      		<td>₹${p.total_price}</td>
	    </tr>
    `;
		tbody.appendChild(tr);
	});
}

//cart subtotal and grand total//
async function loadtotals() {
	const res = await fetch("http://127.0.0.1:8000/cart/total");
	const data = await res.json();
	document.getElementById("Subtotal").innerText = `₹${data.grand_total}`;
	document.getElementById("grand_total").innerText = `₹${data.grand_total}`;
}
document.addEventListener("DOMContentLoaded", () => {
	loadCheckout();
	loadtotals();
});

async function loadcheckouttotals() {
	const res = await fetch("http://127.0.0.1:8000/cart/total");
	const data = await res.json();

	const total = data.grand_total;

	document.getElementById("checkout_total").innerHTML = `
		<tr>
			<td><strong>Cart Subtotal<strong></td>
			<td><strong>₹${total}</strong></td>
		</tr>
		<tr>
			<td><strong>Order Total</strong></td>
			<td><strong>₹${total}</strong></td>
		</tr>
	`;

	return total;
}
document.addEventListener("DOMContentLoaded", () => {

	if (document.getElementById("cart_table")) {
		loadCheckout();
	}


	if (document.getElementById("checkout_table")) {
		loadtotals();
	}

	if (document.getElementById("checkout_total")) {
		loadcheckouttotals();
	}
});

//update bag number//
async function updateCartCount() {
	try {
		const res = await fetch("http://127.0.0.1:8000/cart/perproducttotal");
		const data = await res.json();

		const countSpan = document.querySelector(".bag .number");

		if (!data.items || data.items.length === 0) {
			countSpan.innerText = "0";
			return;
		}

		// Sum quantities
		const totalQty = data.items.reduce(
			(sum, item) => sum + item.p_quantity,
			0
		);

		countSpan.innerText = totalQty;
	} catch (err) {
		console.error("Failed to update cart count:", err);
	}
}
document.addEventListener("DOMContentLoaded", () => {
	updateCartCount();
});

