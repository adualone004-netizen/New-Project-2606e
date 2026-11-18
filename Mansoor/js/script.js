
let allWatches = [];

fetch("data/watches.json")
    .then(response => {showCategories();
showProducts("All");
showGallery();
        if (!response.ok) {
            throw new Error("Unable to load watch data");
        }
        return response.json();
    })
    .then(data => {
        allWatches = data;
        showCategories();
        showProducts("All");
    })
    .catch(error => {
        console.log(error);
        document.getElementById("productList").innerHTML =
            "<p>Watch products could not be loaded.</p>";
    });

function showCategories() {
    let categories = ["All", "Vintage", "Luxury", "Smart Watches"];

    let categoryBox = document.getElementById("productCategories");

    categoryBox.innerHTML = "";

    categories.forEach(category => {
        categoryBox.innerHTML += `
            <button onclick="showProducts('${category}')">
                ${category}
            </button>
        `;
    });
}

function showProducts(category) {
    let productBox = document.getElementById("productList");

    productBox.innerHTML = "";

    let filteredWatches = category === "All"
        ? allWatches
        : allWatches.filter(watch => watch.category === category);

    filteredWatches.forEach(watch => {
        productBox.innerHTML += `
            <div class="product-card">
                <img src="${watch.image}" alt="${watch.name}">
                <h3>${watch.name}</h3>
                <p>${watch.category}</p>
                <h4>PKR ${Number(watch.price).toLocaleString()}</h4>
                <button onclick="showDetails(${watch.id})">
                    View Details
                </button>
            </div>
        `;
    });
}

function showDetails(id) {
    let watch = allWatches.find(item => item.id === id);

    document.getElementById("modalImage").src = watch.image;
    document.getElementById("modalName").textContent = watch.name;
    document.getElementById("modalCategory").textContent = watch.category;
    document.getElementById("modalPrice").textContent =
        "PKR " + Number(watch.price).toLocaleString();
    document.getElementById("modalDescription").textContent =
        watch.description;

    document.getElementById("watchModal").style.display = "flex";
}

function closeDetails() {
    document.getElementById("watchModal").style.display = "none";
}
let navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});
let visitors = localStorage.getItem("albertoVisitors");

if (visitors === null) {
    visitors = 1;
} else {
    visitors = Number(visitors) + 1;
}

localStorage.setItem("albertoVisitors", visitors);

document.getElementById("visitorCount").textContent = visitors;
function updateTicker() {
    let now = new Date();

    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    document.getElementById("tickerText").textContent =
        "Date: " + date + " | Time: " + time + " | Alberto Watch Company";
}

updateTicker();
setInterval(updateTicker, 1000);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            document.getElementById("tickerText").textContent +=
                " | Location: " + latitude.toFixed(2) + ", " +
                longitude.toFixed(2);
        },
        function () {
            console.log("Location permission not granted");
        }
    );
}
function showGallery() {
    let gallery = document.getElementById("galleryImages");

    gallery.innerHTML = "";

    allWatches.forEach(watch => {showPriceList();
        gallery.innerHTML += `
            <div class="gallery-item">
                <img src="${watch.image}" alt="${watch.name}">
                <h3>${watch.name}</h3>
            </div>
        `;
    });
}
function showPriceList() {
    let table = document.getElementById("priceTable");

    table.innerHTML = "";

    allWatches.forEach(watch => {
        table.innerHTML += `
            <tr>
                <td>${watch.name}</td>
                <td>${watch.category}</td>
                <td>PKR ${Number(watch.price).toLocaleString()}</td>
            </tr>
        `;
    });
}