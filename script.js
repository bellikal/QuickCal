// Getting references to DOM-Elements
const calendarContainer = document.querySelector('.calendar-container');
const monthContainer = document.querySelector('.month-container');
const monthTitle = document.querySelector('.month');
const calendarBoxes = document.querySelector('.calendar-boxes');

// Array for month names
const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

// Initialize current date
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let yearShort = currentYear.toString().slice(-2);
let today = currentDate.getDate()

// Updating the month title
const updateMonthTitle = () => {
    monthTitle.textContent = `${months[currentMonth]}`;
}

updateMonthTitle(); // Set the current month and year title

// Calculate the number of days in a month
const getDaysInMonth = (month, year) => {
    return new Date(year, month +1, 0).getDate(); // Liefert Anzahl der Tage im Monat
}

// Populating the calendar with day boxes
const populateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    // Clear existing calendar boxes before repopulation
    calendarBoxes.innerHTML= '';

    // Loop to create calendar boxes for each day
    for (let date = 1; date <= daysInMonth; date++) {
        // Determine if the current date is today
        const isToday = (date === today && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear());
        const boxClass = isToday ? 'calendar-box current' : 'calendar-box';

            // Adding day boxes to the calendar
            calendarBoxes.innerHTML += `
                <article class="${boxClass}">
                    <h3 class="date">${date}</h3>
                </article>
            `;
    }
}

populateCalendar(); // Populating the calendar on page load

// Event listener to handle month navigation
monthContainer.addEventListener("click", (event) => {
    const clickedButton = event.target;

    if (clickedButton.classList.contains('prev-month')) {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    } else if (clickedButton.classList.contains('next-month')) {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    }
});

// Updating month title and calendar content at the same time
const updateCalendar = () => {
    updateMonthTitle(); // Updating the month label
    populateCalendar(); // Refreshing the calendar with new days
}