// API Configuration
const API_BASE_URL = "http://localhost:3000";

let destination = JSON.parse(localStorage.getItem("destination")) || [];
let conty = document.getElementById("conty");

let imgdiv = document.createElement("div");

let paise = destination[0].price;

let backImage = document.createElement("img");
backImage.setAttribute("src", destination[0].image);

let place = document.createElement("h1");
place.innerText = destination[0].name;

let position = document.createElement("h2");
position.textContent = ` ${destination[0].location}`;

imgdiv.append(backImage, place, position);
conty.append(imgdiv);

let from = document.getElementById("city");
let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");
let NoOfPerson = document.getElementById("NoOfperson");

let bookBtn = document.getElementById("bookBtn");

bookBtn.addEventListener("click", function () {
  // Check if user is logged in
  const loginstatus = JSON.parse(localStorage.getItem("logStatus"));

  if (!loginstatus || loginstatus !== true) {
    // User is not logged in
    alert(
      "Please login first to book a destination!\n\nYou will be redirected to the login page."
    );
    window.location.href = "userLoginReg/login.html";
    return;
  }

  // Validate form fields
  if (!from.value || !startDate.value || !endDate.value || !NoOfPerson.value) {
    alert("Please fill in all fields!");
    return;
  }

  // Check if end date is after start date
  if (new Date(endDate.value) <= new Date(startDate.value)) {
    alert("End date must be after start date!");
    return;
  }

  const username = localStorage.getItem("username") || "Guest";
  const destinationName = place.innerText;
  const selectedCity = from.value;
  const selectedStartDate = startDate.value;
  const selectedEndDate = endDate.value;

  // Check for duplicate booking
  fetch(`${API_BASE_URL}/destinationBookings`)
    .then((response) => response.json())
    .then((bookings) => {
      // Check if same user already booked same destination on overlapping dates
      const duplicateBooking = bookings.find(
        (booking) =>
          booking.username === username &&
          booking.name === destinationName &&
          booking.status !== "Cancelled" &&
          // Check for date overlap
          ((selectedStartDate >= booking.start &&
            selectedStartDate <= booking.end) ||
            (selectedEndDate >= booking.start &&
              selectedEndDate <= booking.end) ||
            (selectedStartDate <= booking.start &&
              selectedEndDate >= booking.end))
      );

      if (duplicateBooking) {
        alert(
          "You already have a booking for this destination during these dates!\n\n" +
            `Destination: ${destinationName}\n` +
            `Your existing booking: ${duplicateBooking.start} to ${duplicateBooking.end}\n` +
            `Requested dates: ${selectedStartDate} to ${selectedEndDate}\n\n` +
            "Please choose different dates or cancel your existing booking."
        );
        return;
      }

      // No duplicate found, proceed with booking
      return fetch(`${API_BASE_URL}/destinationBookings`, {
        method: "POST",
        body: JSON.stringify({
          name: destinationName,
          location: `${position.innerText}`,
          image: `${destination[0].image}`,
          city: selectedCity,
          start: selectedStartDate,
          end: selectedEndDate,
          persons: `${NoOfPerson.value}`,
          amount: `${Number(paise) * Number(NoOfPerson.value) * 10}`,
          bookingDate: new Date().toISOString(),
          status: "Confirmed",
          username: username,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
    })
    .then((response) => {
      if (response && response.ok) {
        alert("Your booking is completed. Thank You!");
        location.replace("./discover.html");
      } else if (response) {
        alert("Failed to save booking. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error processing booking:", error);
      alert("An error occurred. Please try again.");
    });
});
