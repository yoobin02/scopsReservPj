import './UserRegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const sectionList = [
  "V", "G", "B", "D", "etc"
];

const UserRegisterPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [userYear, setUserYear] = useState("");
  const [userSession, setUserSession] = useState("");
  const [customSession, setCustomSession] = useState("");
  //const [userRole, setUserRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserRegister = () => {
    if (userPassword !== userPasswordConfirm) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }

    axios.post('http://localhost:8080/scops/userRegister', {
      userName,
      userYear,
      session: userSession,
      userID: userId,
      userPassword,
      //role: userRole,
    })
    .then(res => {
      console.log('회원가입:', res.data);
      alert("회원가입이 완료되었습니다.")
      navigate('/scops/login');
    })
    .catch(err => {
      console.error('회원가입 실패:', err);
    });
  };

  const handleSelect = (sec) => {
    setUserSession(sec);
    setDropdownOpen(false);
    if (sec !== "기타") setCustomSession("");
  };

  return (
    <div className="phone-frame">
      <div className="App">
        <div className='login-container'>
          <div className='logo-box'>
            <img src={`/images/scopsLogo.png`} alt="Scops Logo" />
          </div>

          <input
            type="text"
            placeholder="이름"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input-box"
          />
          <input
            type="text"
            placeholder="기수 입력"
            value={userYear}
            onChange={(e) => setUserYear(e.target.value)}
            className="input-box"
          />

          {/* 세션 드롭다운 */}
          <div className="input-box" ref={dropdownRef}>
            <div className="section-label">
              세션
            </div>

            <div
              className={`custom-select-display ${!userSession ? 'custom-select-placeholder' : ''}`}
              onClick={() => setDropdownOpen(o => !o)}
            >
              {userSession || '세션 선택'}
              <span className="custom-select-arrow">▼</span>
            </div>

            {dropdownOpen && (
              <ul className="custom-select-list">
                {sectionList.map((sec, idx) => (
                  <li
                    key={idx}
                    className="custom-select-list-item"
                    onClick={() => handleSelect(sec)}
                  >
                    {sec}
                  </li>
                ))}
              </ul>
            )}

            {userSession === "기타" && (
              <input
                type="text"
                placeholder="직접 입력"
                value={customSession}
                onChange={(e) => {
                  setCustomSession(e.target.value);
                  setUserSession(e.target.value);
                }}
                className="input-etc"
                style={{ marginTop: '8px', padding: '6px', width: '100%' }}
              />
            )}
          </div>

          <input
            type="text"
            placeholder="학번"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="input-box"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="input-box"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={userPasswordConfirm}
            onChange={(e) => setUserPasswordConfirm(e.target.value)}
            className="input-box"
          />

          <button
            onClick={handleUserRegister}
            style={{ cursor: 'pointer'}}
            className="submit-button"
          >
            등 록 완 료
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
