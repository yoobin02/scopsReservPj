import './SongRegisterPage.css';
import Headers from '../components/Headers';
import  '../components/Headers.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function SongRegisterPage(){
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const [dropDownEvent, setDropDownEvent] = useState("행사이름")
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/') // ✅ 백엔드 주소
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('요일 데이터를 불러오지 못했습니다.', err);
      });
  }, []);

  const handleChange = (e) => {
    setDropDownEvent(e.target.value);
  };

    return (
      <div className="phone-frame">
        <div className="App"> 
          <Headers onMenuClick={toggleMenu} username="김유빈" isOpen={menuOpen} onClose={closeMenu}></Headers>
        </div>
        <div className="App">
            <select value={dropDownEvent} onChange={handleChange}>
                {data.map((data, idx) => (
                <option key={idx} value={data}>
                    {data}
                </option>
                ))}
            </select>
        </div>
      </div>
    );
}
export default SongRegisterPage;