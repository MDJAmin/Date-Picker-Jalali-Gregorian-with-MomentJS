"use strict";

let currentDate = moment();
let useJalaali = false;

function renderCalendar() {
    const daysContainer = document.querySelector('.days');
    daysContainer.innerHTML = '';

    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const startDay = startOfMonth.day();
    const totalDays = endOfMonth.date();

    document.getElementById('current-month').textContent = useJalaali ? currentDate.format('jMMMM jYYYY') : currentDate.format('MMMM YYYY');

    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day';
        daysContainer.appendChild(emptyCell);
    }

    for (let i = 1; i <= totalDays; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = i;
        dayCell.addEventListener('click', () => {
            const selectedDate = currentDate.clone().date(i);
            document.getElementById('selected-date').value = useJalaali ? selectedDate.format('jYYYY/jMM/jDD') : selectedDate.format('YYYY/MM/DD');
            document.getElementById('calendar').style.display = 'none';
        });
        daysContainer.appendChild(dayCell);
    }
}

// Display the current system date
function displayCurrentDate() {
    document.getElementById('current-day').textContent = useJalaali ? currentDate.format('jYYYY/jMM/jDD') : currentDate.format('YYYY/MM/DD');
}

// Events

document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.subtract(1, 'month');
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.add(1, 'month');
    renderCalendar();
});

document.getElementById('selected-date').addEventListener('click', () => {
    document.getElementById('calendar').style.display = 'block';
});

document.addEventListener('click', (event) => {
    if (!document.getElementById('datepicker').contains(event.target)) {
        document.getElementById('calendar').style.display = 'none';
    }
});

document.getElementById('clear-input').addEventListener('click', () => {
    document.getElementById('selected-date').value = '';
});

function switchCalendarType() {
    useJalaali = !useJalaali;
    currentDate = useJalaali ? moment(currentDate.format('YYYY-MM-DD'), 'YYYY-MM-DD').format('jYYYY/jMM/jDD') : moment(currentDate.format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD');
    renderCalendar();
}

// Initialize the calendar and display the current date
renderCalendar();
displayCurrentDate();
