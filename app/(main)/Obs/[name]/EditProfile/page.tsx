"use client";

import Cookies from 'js-cookie';

import React, { useEffect, useState } from 'react'

function ObsEditProfilePage() {
    const [userData, setUserData] = useState<LoginData>();
  
  useEffect(() => {
    console.log((JSON.parse(Cookies.get('user')?.toString() || "") as LoginData)?.login?.userInfo?.Firstname);
    setUserData(JSON.parse(Cookies.get('user') || "") as LoginData);
  }, []);


  function routeToPage(destination: string) {
    const newRoute = "/Obs/" + userData?.login.userAccount.username + destination;
    window.location.href = newRoute;
  }
  
    return (
        <div className='content'>
      <div className="sidebar">
        <h2>ข้อมูลผู้ใช้</h2>
        <p>{userData?.login.userInfo.Firstname}   {userData?.login.userInfo.Lastname}</p>
        {/* <Link type='button' href={"/Obs/" + userData?.login.userAccount.username + "/EditProfile"} className='side-button'>แก้ไขข้อมูลส่วนตัว</Link> */}
          <button className='side-button' onClick={e => routeToPage("/Main")}> กลับหน้าหลัก</button>
        <br /><br />
          <button className='side-button' onClick={e => routeToPage("/Patient")}>ผู้ป่วยในการดูเเล</button>
        <br /><br />
          <button className='side-button' onClick={e => routeToPage("/Hospital")}>ข้อมูลโรงพยาบาล</button>
        <br /><br />
          <button className='side-button' onClick={e => routeToPage("/../../logout")}>ออกจากระบบ</button>
      </div>
      <div className="Block-body">
        <h2>แก้ไขข้อมูล</h2>
        <h4>เลขบัตรประจำตัวประชาชน</h4>
        <div>
          <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="ใส่เลขบัตรประจำตัวประชาชน 13 หลักที่นี่" />
        </div>
        <h4>ชื่อ</h4>
        <div>
          <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="ชื่อจริงผู้ใช้" />
        </div>
        <h4>นามสกุล</h4>
        <div>
          <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="นามสกุลผู้ใช้" />
        </div>
        <h4>เลือกเพศ</h4>
        <select name="cars" className="selectpillboxbar" style={{fontSize: '18px'}} id="cars">
          <option value="volvo">ชาย</option>
          <option value="saab">หญิง</option>
        </select>
        <h4>เลือกวันเกิด</h4>
        <input type="date" className="searchbar" id="birthday" name="birthday" />
        <h4>เบอร์โทรศัพท์</h4>
        <div>
          <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="ใส่เบอร์โทรศัพท์ที่นี่" />
        </div>
        <h4>ที่อยู่</h4>
        <div>
          <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="ใส่บ้านเลขและหมู่ที่นี่" />
        </div>
        <h4>ตำบล</h4>
        <div>
          <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="ใส่ตำบลที่นี่" />
        </div>
        <h4>อำเภอ</h4>
        <div>
          <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="ใส่อำเภอที่นี่" />
        </div>
        <h4>จังหวัด</h4>
        <div>
          <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="ใส่จังหวัดที่นี่" />
        </div>
        <h4>อีเมล</h4>
        <div>
          <input type="text" className="searchbar" style={{fontSize: '18px'}} placeholder="อีเมล" />
        </div>
        <hr />
        <div className="Button-align">
          <form action="D:\Work\Tamakorn\webapp\StaffMainPage\StaffMainPage.html">
            <input type="submit" name="signup" id="signup" className="buttonAddPatient" style={{fontSize: '20px'}} defaultValue="บันทึกข้อมูล" />
          </form>
        </div>
      </div>
    </div>
    
      )
}

export default ObsEditProfilePage