"use client";

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

function HospitalMainPage() {
  const [userData, setUserData] = useState<LoginData>();
  
  useEffect(() => {
    console.log((JSON.parse(Cookies.get('user')?.toString() || "") as LoginData)?.login?.userInfo?.Firstname);
    setUserData(JSON.parse(Cookies.get('user') || "") as LoginData);
  }, []);


  function routeToPage(destination: string) {
    const newRoute = "/Doc/" + userData?.login.userAccount.username + destination;
    window.location.href = newRoute;
  }

  return (
    <>
    {/* Main content */}
    <div className="content">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>ข้อมูลผู้ใช้</h2>
        <p>{userData?.login.userInfo.Firstname} {userData?.login.userInfo.Lastname}</p>
          <button className='side-button' onClick={e => routeToPage("/EditProfile")}>แก้ไขข้อมูลส่วนตัว</button>
        <br />
        <br />
          <button className='side-button' onClick={e => routeToPage("/Patient")}>ผู้ป่วยในการดูเเล</button>
        <br />
        <br />
          <button className='side-button' onClick={e => routeToPage("/Hospital")}>ข้อมูลโรงพยาบาล</button>
        <br />
        <br />
          <button className='side-button' onClick={e => routeToPage("/../../logout")}>ออกจากระบบ</button>
      </div>
      <div className="Block-body">
        <div className="body-text">
          <h2>ข้อมูลผู้ใช้</h2>
          <h4>ชื่อ</h4>
          <p>{userData?.login.userInfo.Firstname} {userData?.login.userInfo.Lastname}</p>
          <h4>รหัส</h4>
          <p>{userData?.login.userAccount.CID}</p>
          <h4>เพศ</h4>
          <p>{userData?.login.userInfo.Gender}</p>
          <h4>เบอร์โทรศัพท์</h4>
          <p>{userData?.login.userInfo.telephone}</p>
          <h4>ที่อยู่</h4>
          <p>{userData?.login.userInfo.homeAddress}</p>
          <p>อำเภอ {userData?.login.userInfo.amphoe} ตำบล {userData?.login.userInfo.tambon} จังหวัด {userData?.login.userInfo.province} </p>
        </div>
      </div>
    </div>
  </>
  )  
}

export default HospitalMainPage