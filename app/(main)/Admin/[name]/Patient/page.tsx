"use client";

import { gql } from 'graphql-request';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { GraphQLClientConnector } from "../../../../lib/API";
const graphQLClient = GraphQLClientConnector();


function PatientPage() {
  
  const [userData, setUserData] = useState<LoginData>();
  const [patientList, setPatientList] = useState<UserInfo[]>([]);
  const [expandedPatientIndex, setExpandedPatientIndex] = useState<number | null>(null);


  function getUserFromCookie(): Promise<string> {
    return new Promise((resolve, reject) => {
      const user = Cookies.get('user');
      if (user) {
        setUserData(JSON.parse(user) as LoginData);
        resolve(user);
      } else {
        const intervalId = setInterval(() => {
          const user = Cookies.get('user');
          if (user) {
            clearInterval(intervalId);
            setUserData(JSON.parse(user) as LoginData);
            resolve(user);
          }
        }, 100);
      }
    });
  }

  useEffect(() => {

    // console.log((JSON.parse(Cookies.get('user')?.toString() || "") as LoginData)?.login?.userInfo?.Firstname);
    // setUserData(JSON.parse(Cookies.get('user') || "") as LoginData);

    const fetchData = async () => {
      const delay = (delayInms: number) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
      }
      // let delayres = await delay(3000)
    };

    fetchData();
    getUserFromCookie().then(async (_) => {
      console.log("Get cookies");
      console.log(userData?.login.userAccount.CID);

      const query = gql`
      query Query($Filter: String) {
        Userinfo(Filter: $Filter) {
          CID
          Firstname
          Lastname
          Gender
          dob
          telephone
          tambon
          amphoe
          province
          homeAddress
          email
          userRole
        }
      }
      `;

      try {
        console.log(userData?.login.userAccount.CID + " try to get patients data")
        const data = await graphQLClient.request<{ Userinfo: UserInfo[] }>(query, { Filter: "PATIENT"});
        const PatientListData = data.Userinfo || [];
        setPatientList(PatientListData);
        console.log(PatientListData || "");
        console.log(data);
      }
      catch (error) {
        console.error(error);
      }

    }
    );
    console.log(typeof userData?.login?.userInfo?.Firstname === 'undefined');
  }, []);


  function routeToPage(destination: string) {
    const newRoute = "/Admin/" + userData?.login.userAccount.username + destination;
    window.location.href = newRoute;
  };


  const handlePatientClick = (index: number) => {
    setExpandedPatientIndex(index === expandedPatientIndex ? null : index);
  };

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
          <button className='side-button' onClick={e => routeToPage("/Main")}>กลับหน้าหลัก</button>
        <br />
        <br />
          <button className='side-button' onClick={e => routeToPage("/Doc")}>ข้อมูลหมอทั้งหมด</button>
        <br />
        <br />
          <button className='side-button' onClick={e => routeToPage("/Obs")}>ข้อมูลเจ้าหน้าที่ทั้งหมด</button>
        <br />
        <br />
          <button className='side-button' onClick={e => routeToPage("/../../logout")}>ออกจากระบบ</button>
        <br />
      </div>
      {/* add more content here */}
      <div className="Block-body">
      <div className="body-text">
        <h2>ข้อมูลคนไข้ทั้งหมด</h2>
            {patientList.map((patient, index) => (
              <div key={index}>
                <p>
                  ขื่อ: {patient.Firstname} {patient.Lastname}
                </p>
                <div className="button-patient">
                  <button onClick={() => handlePatientClick(index)}>
                    ดูรายละเอียดของผู้ป่วย
                  </button>
                </div>
                {expandedPatientIndex === index && (
                <div>
                  <div>
                    <p>{patient.Firstname} {patient.Lastname}</p>
                    <p>{patient.Gender} {patient.dob}</p>
                    <p>{patient.userRole} {patient.province}</p>
                  </div>
                  <button> แก้ไขข้อมูล</button>
                </div>
                )}
              </div>
            ))}
            <hr />
        </div>
      </div>
    </div>
  </>
  
  )
}

export default PatientPage