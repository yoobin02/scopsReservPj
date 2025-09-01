import './TimeTablePage.css';
import Headers from '../components/Headers';
import '../components/Headers.css';
import { useState } from 'react';
import React from 'react';

const sessions = [
  { name: "송민지", gen: "34th", tags: ["V", "K", "G"] },
  { name: "박서영", gen: "34th", tags: ["V"] },
  { name: "김유빈", gen: "33th", tags: ["G"] },
  { name: "김상연", gen: "36th", tags: ["V", "G", "D"] },
];

const mySchedule = [
  { day: "MON", start: 11, end: 14, subject: "문화상품 브랜딩", place: "전공" },
  { day: "MON", start: 16, end: 19, subject: "비주얼 디자인 스튜디오", place: "전공" },
  { day: "WED", start: 14, end: 17, subject: "가나다라", place: "필수" },
  { day: "FRI", start: 11, end: 14, subject: "노브랜드 버거", place: "일반" },
  { day: "FRI", start: 16, end: 19, subject: "현장답사", place: "멀티캠퍼스" },
];

const TimeTablePage = () => {
  const [expandedSession, setExpandedSession] = useState(null);

  return (
    <div className="app-container">
      <div className="App">
        <Headers />

        <div className="timetable-container">
          {/* 내 시간표 */}
          <div className="my-timetable">
            <h2>내 시간표</h2>
            <div className="calendar">
              {/* 요일 헤더 */}
              <div className="header-cell" style={{ gridColumn: 1, gridRow: 1 }}></div>
              {["SUN","MON","TUE","WED","THU","FRI","SAT"].map((day, idx) => (
                <div
                  key={day}
                  className="header-cell"
                  style={{ gridColumn: idx + 2, gridRow: 1 }}
                >
                  {day}
                </div>
              ))}

              {/* 시간열 + 요일셀 */}
              {Array.from({ length: 11 }, (_, i) => {
                const hour = 10 + i;       // 10시~20시
                const row = i + 2;         // 헤더 1행 포함
                return (
                  <React.Fragment key={hour}>
                    <div className="time-cell" style={{ gridColumn: 1, gridRow: row }}>
                      {hour}
                    </div>
                    {["SUN","MON","TUE","WED","THU","FRI","SAT"].map((day, colIdx) => (
                      <div
                        key={`${day}-${hour}`}
                        className="calendar-cell"
                        style={{ gridColumn: colIdx + 2, gridRow: row }}
                      ></div>
                    ))}
                  </React.Fragment>
                );
              })}

              {/* 수업 블록 */}
              {mySchedule.map((cls, idx) => {
                const col = ["SUN","MON","TUE","WED","THU","FRI","SAT"].indexOf(cls.day) + 2;
                let rowStart = cls.start - 10 + 2;
                let rowEnd = cls.end - 10 + 2;

                if (rowEnd > 12) rowEnd = 12; // 마지막 20시 행 초과 방지

                return (
                  <div
                    key={idx}
                    className="class-block"
                    style={{
                      gridColumn: col,
                      gridRow: `${rowStart} / ${rowEnd}`,
                    }}
                  >
                    <div className="class-subject">{cls.subject}</div>
                    <div className="class-place">{cls.place}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 다른 사람들 */}
          <div className="sessions-list">
            {sessions.map((s, idx) => (
              <div
                key={idx}
                className="session-card"
                onClick={() => setExpandedSession(idx)}
              >
                <span>{s.name}_{s.gen}</span>
                <span className="tags">{s.tags.join(" ")}</span>
              </div>
            ))}
          </div>

          {/* 클릭한 사람 시간표 */}
          {expandedSession !== null && (
            <div className="expanded-timetable">
              <h3>{sessions[expandedSession].name}님의 시간표</h3>
              <div className="calendar small">
                {/* 다른 사람 수업 블록 표시 가능 */}
              </div>
              <button onClick={() => setExpandedSession(null)}>닫기</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTablePage;
