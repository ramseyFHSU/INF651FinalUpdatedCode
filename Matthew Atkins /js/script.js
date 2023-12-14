// External JavaScript file

// Get references to the DOM elements
const calendarBody = document.getElementById("calendar-body");
const emailInput = document.getElementById("email");
const currentMonthYear = document.getElementById("current-month-year");
let selectedDateElement;
let currentDate = new Date();

// Function to generate the calendar for a given month and year
function generateCalendar(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  let calendarContent = "";
  let dayCounter = 1;

  for (let i = 0; i < 6; i++) {
    calendarContent += "<tr>";

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        calendarContent += "<td></td>";
      } else if (dayCounter <= daysInMonth) {
        calendarContent += `<td onclick="selectDate(this, ${dayCounter})">${dayCounter}</td>`;
        dayCounter++;
      } else {
        calendarContent += "<td></td>";
      }
    }

    calendarContent += "</tr>";
  }

  calendarBody.innerHTML = calendarContent;
  currentMonthYear.innerText = `${getMonthName(month)} ${year}`;
}

// Function to select a date in the calendar
function selectDate(cell, day) {
  if (selectedDateElement) {
    selectedDateElement.classList.remove("selected-date");
  }

  cell.classList.add("selected-date");
  selectedDateElement = cell;
}

// Function to book a tour
function bookNow() {
  const selectedDate = document.querySelector(".selected-date");
  const userEmail = emailInput.value;

  if (!selectedDate || !userEmail) {
    alert("Please select a date and enter your email.");
    return;
  }

  const selectedDay = selectedDate.innerText;
  const selectedMonthYear = currentMonthYear.innerText.split(" ");
  const selectedMonth = selectedMonthYear[0];
  const selectedYear = selectedMonthYear[1];

  // Here you would typically send the booking information to a server
  // For demonstration purposes, we'll just show an alert
  alert(
    `Booking confirmed! You will receive a confirmation email for ${selectedMonth} ${selectedDay}, ${selectedYear} shortly.`
  );
}

// Functions to navigate the calendar
function previousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
}

// Utility function to get the name of a month
function getMonthName(month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
}

// Initialize the calendar
generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
