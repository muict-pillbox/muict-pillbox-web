"use client";

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

function ObsHospitalPage() {
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
    <><div className='content'>
      <div className="sidebar">
      <h2>ข้อมูลผู้ใช้</h2>
      <p>{userData?.login.userInfo.Firstname}   {userData?.login.userInfo.Lastname}</p>
        <button className='side-button' onClick={e => routeToPage("/Main")}>กลับหน้าหลัก</button>
      <br />
      <br />
        <button className='side-button' onClick={e => routeToPage("/EditProfile")}> แก้ไขข้อมูลส่วนตัว</button>
      <br />
      <br />
        <button className='side-button' onClick={e => routeToPage("/Patient")}>ผู้ป่วยในการดูเเล</button>
      <br />
      <br />
        <button className='side-button' onClick={e => routeToPage("/../../logout")}>ออกจากระบบ</button>
      <br />
    </div><section id="boxbody">
        <div className="Block-body">
          <div className="body-text">
            <h2>ข้อมูลโรงพยาบาล</h2>
            <h4>ชื่อโรงพยาบาล</h4>
            <p>โรงพยาบาลปากเกร็ด</p>
            <h4>รหัสโรงพยาบาล</h4>
            <p>1100000000000</p>
            <h4>ที่อยู่</h4>
            <p>99/999 ซอย 1888/99 หมู่ 15 ตำบล หนีน้ำสูง</p>
            <p>อำเภอ เมืองลับแล จังหวัด ลับเเล </p>
          </div>
        </div>
        <div className="Block-body">
          <div className="body-text">
            <h4>ผู้ดูเเลในโรงพยาบาล</h4>
            <h4>จำนวน 4 คน</h4>
          </div>
        </div>
        <div className="Block-body">
          <div className="body-text">
            <p>ผู้ป่วยในโรงพยาบาล</p>
            <h4>จำนวน 4 คน</h4>
          </div>
        </div>
      </section></div></>
  )
}

export default ObsHospitalPage