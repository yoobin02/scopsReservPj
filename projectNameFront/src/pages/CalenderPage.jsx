import './CalenderPage.css';
import Headers from '../components/Headers';
import  '../components/Headers.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const rangeEvents = [
  { start: "2025-07-11", end: "2025-07-13", color: "pink", title: "합주실 단장" },
  { start: "2025-07-15", end: "2025-07-17", color: "lightgreen", title: "스콥스 정기공연" },
  { start: "2025-07-17", end: "2025-07-18", color: "skyblue", title: "행사" },
  { start: "2025-07-28", end: "2025-07-31", color: "lightgreen", title: "다른 일정" },
  { start: "2025-07-30", end: "2025-08-01", color: "lightcoral", title: "한강 버스킹" }
];

const dailyEvents = [
  { date: "2025-07-05", title: "머큐리얼" },
  { date: "2025-07-05", title: "아지랑이" },
  { date: "2025-07-11", title: "머큐리얼" },
  { date: "2025-07-11", title: "아지랑이" },
  { date: "2025-07-17", title: "머큐리얼" },
  { date: "2025-07-25", title: "정기공연" }
];

function CalenderPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const days = [];
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = daysInMonth[0].getDay();
  const calendarCells = Array(firstDay).fill(null).concat(daysInMonth);
  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  const getDailyEvents = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split("T")[0];
    return dailyEvents.filter(event => event.date === dateStr);
  };

  const getRangeEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split("T")[0];
    return rangeEvents
      .filter((event) => dateStr >= event.start && dateStr <= event.end)
      .map((event) => ({
        ...event,
        showTitle: dateStr === event.start // 시작일에만 제목 표시
      }));
  };

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="phone-frame">
      <div className="App">
        <Headers
          onMenuClick={toggleMenu}
          username="김유빈"
          isOpen={menuOpen}
          onClose={closeMenu}
        />

        <div className="calendarPage-calendar-container">
          <button className="circle-btn left-btn" onClick={prevMonth}>{"<"}</button>
          <h2 className="month-title">{currentMonth}월</h2>
          <button className="circle-btn right-btn" onClick={nextMonth}>{">"}</button>

          <div className="calendarPage-calendar-grid">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
            {calendarCells.map((date, idx) => (
              <div key={idx} className="calendarPage-calendar-cell">
                {date && (
                  <>
                    <div className="date-number">{date.getDate()}</div>
                    {getRangeEventsForDate(date).map((event, i) => (
                      <div
                        key={i}
                        className="event-bar"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.showTitle ? event.title : ""}
                      </div>
                    ))}
                    <div className="events">
                      {getDailyEvents(date).map((event, i) => (
                        <div key={i} className="event-item">
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderPage;