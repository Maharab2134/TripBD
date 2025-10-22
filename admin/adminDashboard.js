// API Configuration
const API_BASE_URL = "http://localhost:3000";

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

// Fetch destinations data
fetch(`${API_BASE_URL}/destinations`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);

    // Calculate statistics
    let totalDestinations = data.length;
    let totalRevenue = 0;
    let totalProfit = 0;

    data.forEach((destination) => {
      let revenue = Number(destination.price) * 10;
      let profit = (revenue * 25) / 100;
      totalRevenue += revenue;
      totalProfit += profit;
    });

    // Update metrics
    document.getElementById("total-deals").innerText = totalDestinations;
    document.getElementById(
      "total-sale"
    ).innerText = `৳ ${totalProfit.toLocaleString()}`;
    document.getElementById(
      "income"
    ).innerText = `৳ ${totalRevenue.toLocaleString()}`;

    // Display latest 6 destinations
    let adminDataAppend = document.getElementById("adminSiteBoxId");
    let latestDestinations = data.slice(-6).reverse(); // Get last 6 and reverse

    let cardsHTML = "";
    latestDestinations.forEach((destination) => {
      cardsHTML += `
        <div class="destination-card">
          <div class="destination-image"> 
            <img src="${destination.image}" alt="${destination.name}" />
            <div class="destination-overlay">
              <span class="destination-price">৳${destination.price}</span>
            </div>
          </div>
          <div class="destination-info">
            <h3 class="destination-name">${destination.name}</h3>
            <p class="destination-location">
              <span class="material-icons">location_on</span>
              ${destination.location}
            </p>
            <div class="destination-meta">
              <div class="rating">
                <span class="material-icons">star</span>
                <span>${destination.rating}%</span>
              </div>
              <a href="admin.html" class="edit-btn">
                <span class="material-icons">edit</span>
              </a>
            </div>
          </div>
        </div>
      `;
    });

    adminDataAppend.innerHTML = cardsHTML;
  })
  .catch((error) => {
    console.error("Error fetching destinations:", error);
    document.getElementById("adminSiteBoxId").innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
        <p style="color: var(--color-danger);">Failed to load destinations. Please try again.</p>
      </div>
    `;
  });

let logOut = document.getElementById("logout");
logOut.addEventListener("click", () => {
  window.location.href = "../index.html";
});
