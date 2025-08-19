import './TimeTablePage.css';
import Headers from '../components/Headers';
import '../components/Headers.css';
import { useState } from 'react';

const scheduleData = {
  me: {
    name: "김유빈",
    year: "33th",
    sessions: ["G"],
    timetable: [
      { day: "MON", start: 11, end: 13, title: "문화사표 브레드" },
      { day: "FRI", start: 11, end: 13, title: "노브랜드 버거" },
    ],
  },
  others: [
    {
      name: "송민지",
      year: "34th",
      sessions: ["V", "K", "G"],
      timetable: [
        { day: "MON", start: 14, end: 16, title: "보컬 연습" },
        { day: "THU", start: 15, end: 18, title: "합주" },
      ],
    },
    {
      name: "박서영",
      year: "34th",
      sessions: ["V"],
      timetable: [
        { day: "TUE", start: 10, end: 12, title: "수업" },
        { day: "FRI", start: 13, end: 15, title: "팀 연습" },
      ],
    },
    {
      name: "김상연",
      year: "36th",
      sessions: ["V", "G", "D"],
      timetable: [
        { day: "WED", start: 12, end: 14, title: "드럼 연습" },
        { day: "SAT", start: 10, end: 13, title: "합주" },
      ],
    },
  ],
};

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function TimeTablePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPerson, setOpenPerson] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const renderTable = (schedule) => (
    <div className="timetable">
      <div className="timetable-header">
        {days.map((day) => (
          <div key={day} className="timetable-cell header-cell">
            {day}
          </div>
        ))}
      </div>
      {Array.from({ length: 11 }, (_, i) => i + 10).map((hour) => (
        <div key={hour} className="timetable-row">
          {days.map((day) => {
            const event = schedule.timetable.find(
              (t) => t.day === day && t.start <= hour && t.end > hour
            );
            return (
              <div key={day} className="timetable-cell">
                {event && hour === event.start && (
                  <div
                    className="timetable-event"
                    style={{
                      gridRow: `span ${event.end - event.start}`,
                    }}
                  >
                    {event.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="phone-frame">
      <div className="App">
        <Headers
          onMenuClick={toggleMenu}
          username="김유빈"
          isOpen={menuOpen}
          onClose={closeMenu}
        />

        <div className="timetable-container">
          <h3>내 시간표</h3>
          {renderTable(scheduleData.me)}

          <div className="people-list">
            {scheduleData.others.map((person) => (
              <div key={person.name} className="person-block">
                <div
                  className="person-summary"
                  onClick={() =>
                    setOpenPerson(
                      openPerson === person.name ? null : person.name
                    )
                  }
                >
                  {person.name}_{person.year}{" "}
                  {person.sessions.join(" ")}
                </div>
                {openPerson === person.name && (
                  <div className="person-timetable">
                    {renderTable(person)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeTablePage;
