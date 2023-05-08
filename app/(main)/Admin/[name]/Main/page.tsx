"use client";

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

function Main
() {
  const [userData, setUserData] = useState<LoginData>();
  
  useEffect(() => {
    console.log((JSON.parse(Cookies.get('user')?.toString() || "") as LoginData)?.login?.userInfo?.Firstname);
    setUserData(JSON.parse(Cookies.get('user') || "") as LoginData);
  }, []);


  function routeToPage(destination: string) {
    const newRoute = "/Admin/" + userData?.login.userAccount.username + destination;
    window.location.href = newRoute;
  }

  return (
<>
  {/* Main content */}
  <div className="content">
    <header>
      <div id="header-text">
        <h1 id="header-text-char">d-DOT 2022 by MUICT</h1>
        <div className="search-container">
          <form>
            <input type="text" placeholder="ค้นหาการตั้งค่า..." />
            <button type="submit">Search</button>
            <button type="reset">Clear</button>
          </form>
        </div>
      </div>
    </header>
    {/* Sidebar */}
    <div className="sidebar">
      <h2>Admin</h2>
      <p>Administrator: {userData?.login.userInfo.Firstname}</p>
        <button className='side-button' onClick={e => routeToPage("/Obs")}>ข้อมูลเจ้าหน้าที่ทั้งหมด</button>
      <br />
      <br />
        <button className='side-button' onClick={e => routeToPage("/Doc")}>ข้อมูลหมอทั้งหมด</button>
      <br />
      <br />
        <button className='side-button' onClick={e => routeToPage("/Patient")}>ข้อมูลคนไข้ทั้งหมด</button>
      <br />
      <br />
        <button className='side-button' onClick={e => routeToPage("/../../logout")}>ออกจากระบบ</button>
        <br />
      <br />
        <button className='side-button' onClick={e => routeToPage(window.location.href = "/../../Obs/" + userData?.login.userAccount.username +"/Main")}>Log in as Observer</button>
        <br />
      <br />
        <button className='side-button' onClick={e => routeToPage(window.location.href = "/../../Doc/" + userData?.login.userAccount.username +"/Main")}>Log in as Doctor</button> 
    
    </div>
    {/* ----------- ------------------------------------------------------------------------------------------------------------------------- */}
    {/* เพิ่มผู้ป่วยใหม่ ------------------------------------------------------------------------------------------------------------------------- */}
    <div className="Block-body">
      <h2>เพิ่มผู้ป่วยใหม่</h2>
      <h4>ชื่อผู้ใช้</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ชื่อผู้ใช้"
        />
      </div>
      <h4>รหัสผ่าน</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="********"
        />
      </div>
      <h4>เลขบัตรประจำตัวประชาชน</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่เลขบัตรประจำตัวประชาชน 13 หลักที่นี่"
        />
      </div>
      <h4>เลือกเพศ</h4>
      <select
        name="cars"
        className="selectpillboxbar"
        style={{ fontSize: 18 }}
        id="cars"
      >
        <option value="volvo">ชาย</option>
        <option value="saab">หญิง</option>
      </select>
      <h4>เลือกวันเกิด</h4>
      <input type="date" className="searchbar" id="birthday" name="birthday" />
      <h4>เบอร์โทรศัพท์</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่เบอร์โทรศัพท์ที่นี่"
        />
      </div>
      <h4>ที่อยู่</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่บ้านเลขและหมู่ที่นี่"
        />
      </div>
      <h4>ตำบล</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่ตำบลที่นี่"
        />
      </div>
      <h4>อำเภอ</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่อำเภอที่นี่"
        />
      </div>
      <h4>จังหวัด</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่จังหวัดที่นี่"
        />
      </div>
      <hr />
      <div className="Button-align">
        <input
          type="submit"
          name="signup"
          id="signup"
          className="buttonAddPatient"
          style={{ fontSize: 20 }}
          defaultValue="ตกลง"
        />
      </div>
    </div>
    {/* ----------- ------------------------------------------------------------------------------------------------------------------------- */}
    {/* เพิ่มเจ้าหน้าที่ใหม่ ----------------------------------------------------------------------------------------------------------------------- */}
    <div className="Block-body">
      <h2>เพิ่มเจ้าหน้าที่ใหม่</h2>
      <h4>สังกัดโรงพยาบาล</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ชื่อผู้ใช้"
        />
      </div>
      <h4>ชื่อผู้ใช้</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ชื่อโรงพยาบาล"
        />
      </div>
      <h4>รหัสผ่าน</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="********"
        />
      </div>
      <h4>เลขบัตรประจำตัวประชาชน</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่เลขบัตรประจำตัวประชาชน 13 หลักที่นี่"
        />
      </div>
      <h4>เลือกเพศ</h4>
      <select
        name="cars"
        className="selectpillboxbar"
        style={{ fontSize: 18 }}
        id="cars"
      >
        <option value="volvo">ชาย</option>
        <option value="saab">หญิง</option>
      </select>
      <h4>เลือกวันเกิด</h4>
      <input type="date" className="searchbar" id="birthday" name="birthday" />
      <h4>เบอร์โทรศัพท์</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่เบอร์โทรศัพท์ที่นี่"
        />
      </div>
      <h4>ที่อยู่</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่บ้านเลขและหมู่ที่นี่"
        />
      </div>
      <h4>ตำบล</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่ตำบลที่นี่"
        />
      </div>
      <h4>อำเภอ</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่อำเภอที่นี่"
        />
      </div>
      <h4>จังหวัด</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="ใส่จังหวัดที่นี่"
        />
      </div>
      <hr />
      <div className="Button-align">
        <input
          type="submit"
          name="signup"
          id="signup"
          className="buttonAddPatient"
          style={{ fontSize: 20 }}
          defaultValue="ตกลง"
        />
      </div>
    </div>
    {/* ----------- ------------------------------------------------------------------------------------------------------------------------- */}
    {/* สร้างกล่องยาใหม่ ----------------------------------------------------------------------------------------------------------------------- */}
    <div className="Block-body">
      <h2>สร้างกล่องยาใหม่</h2>
      <h4>รหัสกล่องยา</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="รหัสกล่องยา"
        />
      </div>
      <h4>เลขโทรศัพท์กล่องยา</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="เลขกล่องยา"
        />
      </div>
      <hr />
      <div className="Button-align">
        <input
          type="submit"
          name="signup"
          id="signup"
          className="buttonAddPatient"
          style={{ fontSize: 20 }}
          defaultValue="สร้างกล่องยาใหม่"
        />
      </div>
    </div>
    {/* ----------- ------------------------------------------------------------------------------------------------------------------------- */}
    {/* เพิ่มกล่องยาใหม่ ------------------------------------------------------------------------------------------------------------------------ */}
    <div className="Block-body">
      <h2>เพิ่มกล่องยาใหม่</h2>
      <h4>รหัสกล่องยา</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="เลขบัตรประจำตัวประชาชน"
        />
      </div>
      <h4>เลขโทรศัพท์กล่องยา</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="เลขกล่องยา"
        />
      </div>
      <hr />
      <div className="Button-align">
        <input
          type="submit"
          name="signup"
          id="signup"
          className="buttonAddPatient"
          style={{ fontSize: 20 }}
          defaultValue="สร้างกล่องยาใหม่"
        />
      </div>
    </div>
    {/* ----------- ------------------------------------------------------------------------------------------------------------------------- */}
    {/* การคืนกล่องยา ------------------------------------------------------------------------------------------------------------------------- */}
    <div className="Block-body">
      <h2>การคืนกล่องยา</h2>
      <h4>เลขบัตรประจำตัวประชาชน</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="เลขบัตรประจำตัวประชาชน"
        />
      </div>
      <h4>เลขกล่องยา</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="เลขกล่องยา"
        />
      </div>
      <h4>สาเหตุการคืน</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="สาเหตุการคืน"
        />
      </div>
      <hr />
      <div className="Button-align">
        <input
          type="submit"
          name="signup"
          id="signup"
          className="buttonAddPatient"
          style={{ fontSize: 20 }}
          defaultValue="คืนกล่อง"
        />
      </div>
      {/* ----------- ------------------------------------------------------------------------------------------------------------------------- */}
      {/* การจับคู่กล่องยา ------------------------------------------------------------------------------------------------------------------------ */}
    </div>
    <div className="Block-body">
      <h2>การจับคู่กล่องยา</h2>
      <h4>เลขบัตรประจำตัวประชาชน</h4>
      <div>
        <input
          type="text"
          className="searchbar"
          style={{ fontSize: 18 }}
          placeholder="เลขบัตรประจำตัวประชาชน"
        />
      </div>
      <h4>เลือกกล่องยา</h4>
      <select
        name="cars"
        className="selectpillboxbar"
        style={{ fontSize: 18 }}
        id="cars"
      >
        <option value="volvo">pb00001</option>
        <option value="saab">pb00002</option>
        <option value="opel">pb00003</option>
        <option value="audi">pb00004</option>
      </select>
      <hr />
      <div className="Button-align">
        <input
          type="submit"
          name="signup"
          id="signup"
          className="buttonAddPatient"
          style={{ fontSize: 20 }}
          defaultValue="จับคู่กล่องยา"
        />
      </div>
    </div>
  </div>
</>

  )
}

export default Main
