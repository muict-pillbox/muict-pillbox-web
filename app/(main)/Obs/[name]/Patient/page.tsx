"use client";

import { gql } from 'graphql-request';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { GraphQLClientConnector } from "../../../../lib/API";
import { dobToAge } from '@/app/lib/utility';
import "./ObsPatientInfo.css";
import CalendarApp from './calendar';
const graphQLClient = GraphQLClientConnector();

type VideoPlayerProps = {
  url: string;
  errorText: string;
};

interface SlotActivity {
    activityID: number,
    patientCID: string,
    boxID: string,
    activityDate: string,
    activityTime: string,
    purpose: string,
    youtubeLink: string,
    isDotCompleted: boolean,
    isChecked: boolean,
}

interface ColorBlindData {
  colorBlindID: number;
  patientCID: string;
  colorBlindDate: string;
  colorBlindTime: string;
  correct: number;
  incorrect: number;
  nothing: number;
  unsureCorrect: number;
  unsureIncorrect: number;
}

interface SideEffectData {
  sideEffectID: number;
  patientCID: string;
  effectDate: string;
  effectTime: string;
  effectDesc: string;
}

interface User {
  Firstname: string;
  Lastname: string;
  Gender: string;
  dob: string; // assuming this is a string representation of a date
}

interface UserCardProps {
  user: User;
  onClick: () => void;
}

function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div className="user-card" onClick={onClick}>
      <h3>{user.Firstname} {user.Lastname}</h3>
      <p>{user.Gender} อายุ {dobToAge(user.dob)}</p>
    </div>
  );
}

function formatDate(dateString: string, format: string = "dd/mm/yyyy"): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  
  // Replace "dd", "mm", and "yyyy" with the corresponding components of the date
  return format.replace("dd", `${day < 10 ? "0" + day : day}`)
               .replace("mm", `${month < 10 ? "0" + month : month}`)
               .replace("yyyy", `${year}`);
}

function ObsPatientPage() {
  const [userData, setUserData] = useState<LoginData>();
  const [patientList, setPatientList] = useState<UserInfo[]>([]);
  const [expandedPatientIndex, setExpandedPatientIndex] = useState<number | null>(null);
  const [patientSlotActivity, setPatientSlotActivity] = useState<SlotActivity[]>([]);
  const [patientColorBlind, setPatientColorBlind] = useState<ColorBlindData[]>([]);
  const [patientSideEffect, setPatientSideEffect] = useState<SideEffectData[]>([]);
  const [url, setUrl] = useState<string | null>(null);


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
      query Query($observerCid: String) {
        Userinfo(ObserverCID: $observerCid) {
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
        const data = await graphQLClient.request<{ Userinfo: UserInfo[] }>(query, { observerCid: (JSON.parse(Cookies.get('user')?.toString() || "") as LoginData)?.login.userAccount.CID });
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
    const newRoute = "/Obs/" + userData?.login.userAccount.username + destination;
    window.location.href = newRoute;
  }


  const handlePatientClick = (index: number) => {
    if (index === null) {
      setExpandedPatientIndex(index === expandedPatientIndex ? null : index);
    }
    else{
      getSlotActivityFromPatient(patientList[index].CID)
      getPatientColorBlind(patientList[index].CID)
      getPatientSideEffect(patientList[index].CID)
      setExpandedPatientIndex(index);
    }
  };

  async function getSlotActivityFromPatient (PatientCID : string) {
    console.log("getSlotActivityFromPatient");
      console.log(PatientCID);

      const query = gql`
      query ActivitiesQuery($patientCid: String!) {
        activitiesByPatientCID(patientCID: $patientCid) {
          activityID
          patientCID
          boxID
          activityDate
          activityTime
          purpose
          youtubeLink
          isDotCompleted
          isChecked
        }
      }
    `;

    try {
      console.log(userData?.login.userAccount.CID + " try to get patients data")
      const data = await graphQLClient.request<{ activitiesByPatientCID: SlotActivity[] }>(query, {patientCid: PatientCID});
      const SlotActivityData = data.activitiesByPatientCID || [];
      setPatientSlotActivity(SlotActivityData);
      console.log(SlotActivityData || "");
      console.log(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  async function getPatientColorBlind (PatientCID : string) {
    console.log("getSlotActivityFromPatient");
      console.log(PatientCID);

      const query = gql`
      query GetColorBlind($patientCid: String!) {
        getColorBlind(patientCID: $patientCid) {
          colorBlindID
          patientCID
          colorBlindDate
          colorBlindTime
          correct
          incorrect
          nothing
          unsureCorrect
          unsureIncorrect
        }
      }
    `;

    try {
      console.log(userData?.login.userAccount.CID + " try to get patients data")
      const data = await graphQLClient.request<{ getColorBlind: ColorBlindData[] }>(query, {patientCid: PatientCID});
      const ColorBlindData = data.getColorBlind || [];
      setPatientColorBlind(ColorBlindData);
      console.log(ColorBlindData || "");
      console.log(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  async function getPatientSideEffect (PatientCID : string) {
    console.log("getSlotActivityFromPatient");
      console.log(PatientCID);

      const query = gql`
      query GetSideEffect($patientCid: String!) {
        getSideEffect(patientCID: $patientCid) {
          sideEffectID
          patientCID
          effectDate
          effectTime
          effectDesc
        }
      }
    `;

    try {
      console.log(userData?.login.userAccount.CID + " try to get patients data")
      const data = await graphQLClient.request<{ getSideEffect: SideEffectData[] }>(query, {patientCid: PatientCID});
      const SideEffectData = data.getSideEffect || [];
      setPatientSideEffect(SideEffectData);
      console.log(SideEffectData || "");
      console.log(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const VideoPlayer = ({ url, errorText }: VideoPlayerProps) => {
    const [error, setError] = useState(false);
  
    const handleCloseClick = () => {
      setUrl(null);
    };
  
    const handleError = () => {
      setError(true);
    };
  
    const handleVideoEnded = () => {
      setUrl(null);
    };
  
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid black",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: "0",
            right: "0",
          }}
          onClick={handleCloseClick}
        >
          X
        </button>
        {error ? (
          <div>{errorText}</div>
        ) : (
          <video
            controls
            onError={handleError}
            onEnded={handleVideoEnded}
            style={{
              maxHeight: "90vh",
              maxWidth: "90vw",
            }}
          >
            <source src={url} type="video/mp4" />
          </video>
        )}
      </div>
    );
  };


  function handleVideoPageView(videoLink: string) {
    setUrl(videoLink);
    // console.log(videoLink);

  }

  return (
    <div className='content'><div className="sidebar">
      <h2>ข้อมูลผู้ใช้</h2>
      <p>{userData?.login.userInfo.Firstname}   {userData?.login.userInfo.Lastname}</p>
      <button className='side-button' onClick={e => routeToPage("/Main")}>กลับหน้าหลัก</button>
      <br />
      <br />
      <button className='side-button' onClick={e => routeToPage("/EditProfile")}> แก้ไขข้อมูลส่วนตัว</button>
      <br />
      <br />
      <button className='side-button' onClick={e => routeToPage("/Hospital")}>ข้อมูลโรงพยาบาล</button>
      <br />
      <br />
      <button className='side-button' onClick={e => routeToPage("/../../logout")}>ออกจากระบบ</button>
    </div>
      {/* add more content here */}
      <div className="Block-body">
        <div className="body-text">
          <h2>ผู้ป่วยในการดูเเล</h2>
          <div className='patient-data-container'>
            <div className="body-text">
              {patientList.map((patient, index) => (
                <UserCard key={index} user={patient} onClick={() => handlePatientClick(index)} />
              ))}
              <hr />
            </div>
            <div className="user-details">
              <div className="user-details">
                {expandedPatientIndex !== null && (
                  <div>
                    <h2>{patientList[expandedPatientIndex].Firstname} {patientList[expandedPatientIndex].Lastname}</h2>
                    <h3>{patientList[expandedPatientIndex].CID}</h3>
                    <p>{patientList[expandedPatientIndex].Gender} อายุ {dobToAge(patientList[expandedPatientIndex].dob)}</p>
                    <p>{patientList[expandedPatientIndex].userRole} {patientList[expandedPatientIndex].province}</p>
                    <button>แก้ไขข้อมูล</button>
                    <CalendarApp />
                    {url && (
                          <VideoPlayer
                            url={url}
                            errorText="Error loading video. Please try again later."
                          />
                        )}
                    <div className="Block-body">
                      <h2>ประวัติการทานยา</h2>
                      <table style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>ตรวจสอบแล้ว</th>
                            <th>วันที่</th>
                            <th>เวลา</th>
                            <th>ประเภท</th>
                            <th>วีดีโอ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patientSlotActivity
                            .filter((activity) => activity.purpose === "EAT")
                            .map((activity) => (
                              <tr key={activity.activityID}>
                                <td>{activity.isChecked ? "ใช่" : "ยัง"}</td>
                                <td>{new Date(parseInt(activity.activityDate)).toLocaleDateString()}</td>
                                <td>{new Date(parseInt(activity.activityTime)).toLocaleTimeString()}</td>
                                <td>{activity.purpose}</td>
                                <td>
                                    <button className="side-button" onClick={(e) => {handleVideoPageView("https://iot.ict.mahidol.ac.th/data/video/" + activity.youtubeLink)}}>วิดีโอ</button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="Block-body">
                      <h2>ผลการทดสอบตาบอดสี</h2>
                      <table style={{ width: "100%" }}>
                        <tbody>
                        <tr>
                            <th>วันที่</th>
                            <th>ถูกต้อง</th>
                            <th>ไม่ถูกต้อง</th>
                            <th>ข้าม</th>
                            <th>ไม่แน่ใจถูก</th>
                            <th>ไม่แน่ใจผิด</th>
                          </tr>
                          {patientColorBlind.map((colorBlind) => (
                            <tr key={colorBlind.colorBlindID}>
                              <td>{new Date(parseInt(colorBlind.colorBlindDate)).toLocaleDateString()}</td>
                              <td>{colorBlind.correct}</td>
                              <td>{colorBlind.incorrect}</td>
                              <td>{colorBlind.nothing}</td>
                              <td>{colorBlind.unsureCorrect}</td>
                              <td>{colorBlind.unsureIncorrect}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="Block-body">
                      <h2>รายงานผลข้างเคียง</h2>
                      <table style={{ width: "100%" }}>
                      <tbody>
                          <tr>
                            <th>วันที่</th>
                            <th>เวลา</th>
                            <th>รายละเอียดของอาการ</th>
                          </tr>
                          {patientSideEffect.map((sideEffect) => (
                            <tr key={sideEffect.sideEffectID}>
                              <td>{formatDate(sideEffect.effectDate)}</td>
                              <td>{new Date(parseInt(sideEffect.effectTime)).toLocaleTimeString()}</td>
                              <td>{sideEffect.effectDesc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ObsPatientPage