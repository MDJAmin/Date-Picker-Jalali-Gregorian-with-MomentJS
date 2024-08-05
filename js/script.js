"use strict";

const datepickers = document.querySelectorAll('.datepicker-input');
let useJalaali = false;
let currentDate = {};

datepickers.forEach(picker => {
  const id = picker.dataset.id;
  currentDate[id] = moment();

  // Create calendar elements
  const calendarContainer = document.createElement('div');
  calendarContainer.className = 'calendar';
  picker.parentElement.appendChild(calendarContainer);

  const monthNav = document.createElement('div');
  monthNav.className = 'month-nav';
  calendarContainer.appendChild(monthNav);

  const prevMonthBtn = document.createElement('button');
  prevMonthBtn.className = 'prev-month';
  prevMonthBtn.textContent = 'Prev';
  monthNav.appendChild(prevMonthBtn);

  const currentMonthSpan = document.createElement('span');
  currentMonthSpan.className = 'current-month';
  monthNav.appendChild(currentMonthSpan);

  const nextMonthBtn = document.createElement('button');
  nextMonthBtn.className = 'next-month';
  nextMonthBtn.textContent = 'Next';
  monthNav.appendChild(nextMonthBtn);

  const daysContainer = document.createElement('div');
  daysContainer.className = 'days';
  calendarContainer.appendChild(daysContainer);

  const toggleDateBtn = document.createElement('button');
  toggleDateBtn.className = 'toggle-date';
  toggleDateBtn.innerHTML = `Solar <i class='bx bxs-sun'></i>`;
  calendarContainer.appendChild(toggleDateBtn);

  function renderCalendar() {
    daysContainer.innerHTML = "";
    const startOfMonth = currentDate[id].clone().startOf("month");
    const endOfMonth = currentDate[id].clone().endOf("month");
    const startDay = startOfMonth.day();
    const totalDays = endOfMonth.date();

    currentMonthSpan.textContent = useJalaali
        ? currentDate[id].format("jMMMM jYYYY")
        : currentDate[id].format("MMMM YYYY");

    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "day";
      daysContainer.appendChild(emptyCell);
    }

    for (let i = 1; i <= totalDays; i++) {
      const dayCell = document.createElement("div");
      dayCell.className = "day";
      dayCell.textContent = i;
      dayCell.addEventListener("click", () => {
        const selectedDate = currentDate[id].clone().date(i);
        picker.value = useJalaali
            ? selectedDate.format("jYYYY/jMM/jDD")
            : selectedDate.format("YYYY/MM/DD");
        calendarContainer.style.display = "none";
      });
      daysContainer.appendChild(dayCell);
    }
  }

  function updateCurrentDay() {
    const currentDay = moment().format("dddd, MMMM Do YYYY");
    picker.placeholder = `Current day is : ${currentDay}`;
  }

  prevMonthBtn.addEventListener("click", () => {
    currentDate[id].subtract(1, "month");
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate[id].add(1, "month");
    renderCalendar();
  });

  picker.addEventListener("click", () => {
    calendarContainer.style.display = "block";
  });

  document.addEventListener("click", (event) => {
    if (!calendarContainer.contains(event.target) && !picker.contains(event.target)) {
      calendarContainer.style.display = "none";
    }
  });

  toggleDateBtn.addEventListener("click", () => {
    useJalaali = !useJalaali;
    toggleDateBtn.innerHTML = useJalaali
        ? `Lunar <i class='bx bxs-moon'></i>`
        : `Solar <i class='bx bxs-sun'></i>`;
    switchCalendarType();
  });

  function switchCalendarType() {
    currentDate[id] = useJalaali
        ? moment(currentDate[id].format("YYYY-MM-DD"), "YYYY-MM-DD").locale("fa")
        : moment(currentDate[id].format("jYYYY/jMM/jDD"), "jYYYY/jMM/jDD").locale("en");
    renderCalendar();
  }

  updateCurrentDay();
  renderCalendar();
});
