"use client";

import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'http://0.tcp.ap.ngrok.io:18905/graphql';
const client = new GraphQLClient(endpoint)


function ObsMainPage() {
  const [userData, setUserData] = useState<LoginData>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idCard, setIdCard] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('ชาย');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [finalprovinces, setfinalProvinces] = useState('');
  const [finalamphures, setfinalAmphures] = useState('');
  const [finaltambons, setfinalTambons] = useState('');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [amphures, setAmphures] = useState<Amphure[]>([]);
  const [tambons, setTambons] = useState<Tambon[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>(0);
  const [selectedAmphure, setSelectedAmphure] = useState<number>(0);
  const [selectedTambon, setSelectedTambon] = useState<number>(0);
  const [localHospitals, setLocalHospitals] = useState<LocalHospitalData[]>([]);
  const [isVisibleUsername, setIsVisibleUsername] = useState<Boolean>();
  const [isValidUsername, setIsValidUsername] = useState<Boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<Boolean>();
  const [isValidPassword, setIsValidPassword] = useState<Boolean>(false);
  const [isVisibleID, setIsVisibleID] = useState<Boolean>();
  const [isValidID, setIsValidID] = useState<Boolean>(false);
  
  useEffect(() => {
    console.log((JSON.parse(Cookies.get('user')?.toString() || "") as LoginData)?.login?.userInfo?.Firstname);
    setUserData(JSON.parse(Cookies.get('user') || "") as LoginData);
    const fetchData = async () => {
      const provinceRes = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json');
      const amphureRes = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json');
      const tambonRes = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json');
      const localHostpital = async () => {
        const graphQLClient = new GraphQLClient(endpoint);

        const query = gql`
        query UserAccountWithUserInfo {
          LocalHospital {
            localHospitalNumber
            localHospitalname
            tambon
            amphoe
            province
          }
        }
        `;

        try {
          const data = await graphQLClient.request<{ LocalHospital: LocalHospitalData[] }>(query);
          const localHospitals = data.LocalHospital || [];
          console.log(localHospitals || "");
          setLocalHospitals(localHospitals);
        }
        catch (error) {
          console.error(error);
        }

      };

      const provinceData: Province[] = await provinceRes.json();
      const amphureData: Amphure[] = await amphureRes.json();
      const tambonData: Tambon[] = await tambonRes.json();

      setProvinces(provinceData);
      setAmphures(amphureData);
      setTambons(tambonData);
      localHostpital();
    };

    fetchData();
  }, []);


  function routeToPage(destination: string) {
    const newRoute = "/Obs/" + userData?.login.userAccount.username + destination;
    window.location.href = newRoute;
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();
    console.log("username: " + username)
    console.log("password: " + password)
    console.log("confirmPassword: " + confirmPassword)
    console.log("idCard: " + idCard)
    console.log("firstName: " + firstName)
    console.log("lastName: " + lastName)
    console.log("gender: " + gender)
    console.log("birthdate: " + birthdate)
    console.log("phone: " + phone)
    console.log("address: " + address)
    console.log("email: " + email)
    console.log("finalprovinces: " + finalprovinces)
    console.log("finalamphures: " + finalamphures)
    console.log("finaltambons: " + finaltambons)

    const createUserMutation = gql`
    mutation Mutation($userInfo: UserAccountInput!, $ObserverCID: String!) {
      createPatient(userInfo: $userInfo, ObserverCID: $ObserverCID) {
        CID
        Firstname
        Lastname
      }
    }
  `;

    const userInfoVariables = {
      userInfo: {
        CID: idCard,
        Firstname: firstName,
        Lastname: lastName,
        Gender: gender,
        dob: birthdate,
        telephone: phone,
        tambon: finaltambons,
        amphoe: finalamphures,
        province: finalprovinces,
        homeAddress: address,
        email: email,
        userRole: "PATIENT",
        username: username,
        password: password,
        createdBy: userData?.login.userAccount.CID
      },
      ObserverCID: userData?.login.userAccount.CID,
    };


    try {
      const userInfoResponse = await client.request(createUserMutation, userInfoVariables);
      console.log(userInfoResponse);
    } catch (error) {
      console.error(error);
    }

  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(parseInt(e.target.value));
    const chooseProvince = provinces.find(loc => loc.id === parseInt(e.target.value));
    setfinalProvinces(chooseProvince?.name_th || "");
    // console.log(chooseProvince?.name_th);
  };

  const handleAmphureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAmphure(parseInt(e.target.value));
    setSelectedTambon(0);
    const chooseAmphures = amphures.find(loc => loc.id === parseInt(e.target.value));
    setfinalAmphures(chooseAmphures?.name_th || "");
  };

  const handleTambonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTambon(parseInt(e.target.value));
    const chooseTambon = tambons.find(loc => loc.id === parseInt(e.target.value));
    setfinalTambons(chooseTambon?.name_th || "");
  };

  async function checkUsername(inputUsername: String) {
    interface userNameCheck {
      UsernameCheck: {
        username: string;
      };
    }
    const input = {
      input: {
        username: inputUsername.toString()
      }
    };
    console.log(inputUsername.toString());
    setUsername(inputUsername.toString());
    if (Object.getOwnPropertyNames(inputUsername).length < 4) {
      setIsValidUsername(false);
      setIsVisibleUsername(false);
    }
    if (Object.getOwnPropertyNames(inputUsername).length >= 4) {
      const usernameCheck = gql`
      query UsernameCheck($input: UsernameCheckInput) {
        UsernameCheck(input: $input) {
          username
          createDate
          createdBy
        }
      }
  `;

  try {
    const userInfoResponse = (await client.request(usernameCheck, input) as userNameCheck);
    try{
      console.log(userInfoResponse + " " + userInfoResponse.UsernameCheck.username);
      setIsValidUsername(false);
    }
    catch{
      console.log("No user found");
      setIsValidUsername(true);
    }
    
  } catch (error) {
    console.error(error);
  }
    setIsVisibleUsername(true);
    }

    // console.log(isValidUsername);
  }

  async function checkUserID(userID: string) {
    interface userIDCheck {
      UserAccountWithUserInfo: [{
        CID: string;
      }];
    }
    setIdCard(userID)
    if (Object.getOwnPropertyNames(userID).length < 14) {
      setIsVisibleID(false);
      setIsValidID(false)
    }
    if (Object.getOwnPropertyNames(userID).length == 14) {
      console.log(userID)
      const input = {
        cid: userID.toString()
      };
      const usernameCheck = gql`
      query UserAccountWithUserInfo($cid: String) {
        UserAccountWithUserInfo(CID: $cid) {
          CID
        }
      }
  `;

      try {
        const userInfoResponse = (await client.request(usernameCheck, input) as userIDCheck);
        console.log(userInfoResponse);
        console.log(idCard);
        userInfoResponse.UserAccountWithUserInfo[0] ? setIsValidID(false) : setIsValidID(true)
        setIsVisibleID(true);
        console.log(isValidID)
      } catch (error) {
        console.error(error);
      }
    }

  }

  function checkPassword(value: string): void {
    setConfirmPassword(value);
    if(Object.getOwnPropertyNames(value).length < Object.getOwnPropertyNames(password).length){
      setIsVisiblePassword(false);
      setIsValidPassword(false);
    }
    if (Object.getOwnPropertyNames(value).length >= Object.getOwnPropertyNames(password).length) {
      if (value !== password) {
        setIsValidPassword(false);
        console.log("false")

      }
      else{
        setIsValidPassword(true);
        console.log("true")
      }
      setIsVisiblePassword(true);
    }
    else{
      setIsValidPassword(false);
      console.log("false")
    }
  }

  
  return <>
    <div className="content">
    <div className="sidebar">
      <h2>ข้อมูลผู้ใช้</h2>
      <p>{userData?.login.userInfo.Firstname}   {userData?.login.userInfo.Lastname}</p>
        {/* <Link type='button' href={"/Obs/" + userData?.login.userAccount.username + "/EditProfile"} className='side-button'>แก้ไขข้อมูลส่วนตัว</Link> */}
        <button className='side-button' onClick={e => routeToPage("/EditProfile")}> แก้ไขข้อมูลส่วนตัว</button>
      <br /><br />
        <button className='side-button' onClick={e => routeToPage("/Patient")}>ผู้ป่วยในการดูเเล</button>
      <br /><br />
        <button className='side-button ' onClick={e => routeToPage("/Hospital")}>ข้อมูลโรงพยาบาล</button>
      <br /><br />
        <button className='side-button' onClick={e => routeToPage("/../../logout")}>ออกจากระบบ</button>
    </div>
    <div className="Block-body">
      <div className="body-text">
        <div>User Role: {userData?.login.userInfo.userRole}</div>
        <div>Username: {userData?.login.userAccount.username}</div>
        <div>CID: {userData?.login.userAccount.CID}</div>
      </div>
    </div>
    <div className="Block-body">
      <h2>เพิ่มผู้ป่วยใหม่</h2>
      <h4>ชื่อผู้ใช้</h4>
      <div>
        <input value={username} onChange={(event) => { checkUsername(event.target.value); }} type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="ชื่อผู้ใช้" />
      </div>
      {isVisibleUsername && (isValidUsername? <div className="Block-bodyforUsersgreen">
    <h2>This username is available ✔ </h2>
    </div> : <div className="Block-bodyforUsers">
    <h2>This user name is taken, Try another ✖</h2>
    </div> )}
      <h4>รหัสผ่าน</h4>
      <div>
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="searchbar" style={{ fontSize: '18px' }} placeholder="********" />
      </div>
      <h4>ยืนรหัสผ่าน</h4>
      <div>
        <input value={confirmPassword} onChange={(event) => checkPassword(event.target.value)} type="password" className="searchbar" style={{ fontSize: '18px' }} placeholder="********" />
      </div>
      {isVisiblePassword && (isValidPassword? <div className="Block-bodyforUsersgreen">
    <h2>Password is matched ✔ </h2>
    </div> : <div className="Block-bodyforUsers">
    <h2>Password is not matched ✖</h2>
    </div> )}
      <h4>เลขบัตรประจำตัวประชาชน</h4>
      <div>
        <input onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }} value={idCard} onChange={(event) => { checkUserID(event.target.value) }} type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="ใส่เลขบัตรประจำตัวประชาชน 13 หลักที่นี่" maxLength={13} />
      </div>
      {isVisibleID && (isValidID? <div className="Block-bodyforUsersgreen">
    <h2>This ID is available ✔ </h2>
    </div> : <div className="Block-bodyforUsers">
    <h2>This ID has been taken, Try another ✖</h2>
    </div> )}
      <h4>ชื่อ</h4>
      <div>
        <input value={firstName} onChange={(event) => setFirstName(event.target.value)} type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="ชื่อจริงผู้ใช้" />
      </div>
      <h4>นามสกุล</h4>
      <div>
        <input value={lastName} onChange={(event) => setLastName(event.target.value)} type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="นามสกุลผู้ใช้" />
      </div>
      <h4>เลือกเพศ</h4>
      <select value={gender} onChange={(event) => setGender(event.target.value)} name="cars" className="selectpillboxbar" style={{ fontSize: '18px' }} id="cars">
        <option value="ชาย">ชาย</option>
        <option value="หญิง">หญิง</option>
        <option value="อื่นๆ">อื่นๆ</option>
        <option value="ไม่ระบุ">ไม่ระบุ</option>
      </select>
      <h4>เลือกวันเกิด</h4>
      <input value={birthdate} onChange={(event) => setBirthdate(event.target.value)} type="date" className="searchbar" id="birthday" name="birthday" />
      <h4>เบอร์โทรศัพท์</h4>
      <div>
        <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" className="searchbar" style={{ fontSize: '18px' }} placeholder="ใส่เบอร์โทรศัพท์ที่นี่" pattern="[0]{1}[0-9]{9}" />
      </div>
      <h4>อีเมล</h4>
      <div>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="searchbar" style={{ fontSize: '18px' }} placeholder="อีเมล" />
      </div>
      <div>
        <h4>ที่อยู่</h4>
        <div>
          <input value={address} onChange={(event) => setAddress(event.target.value)} type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="ใส่บ้านเลขและหมู่ที่นี่" />
        </div>
        <h4>จังหวัด</h4>
        <select
          name="provinces"
          className="selectpillboxbar"
          id="provinces"
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          <option value="0">เลือกจังหวัด</option>
          {provinces
            .slice()
            .sort((a, b) => a.name_th.localeCompare(b.name_th))
            .map((province) => (
              <option key={province.id} value={province.id}>
                {province.name_th}
              </option>
            ))}
        </select>
        <h4>ตำบล</h4>
        <select
          name="amphures"
          className="selectpillboxbar"
          id="amphures"
          value={selectedAmphure}
          onChange={handleAmphureChange}
          disabled={selectedProvince === 0}
        >
          <option value="0">เลือกอำเภอ</option>
          {amphures
            .filter((amphure) => amphure.province_id === selectedProvince)
            .slice()
            .sort((a, b) => a.name_th.localeCompare(b.name_th))
            .map((amphure) => (
              <option key={amphure.id} value={amphure.id}>
                {amphure.name_th}
              </option>
            ))}
        </select>
        <h4>อำเภอ</h4>
        <select
          name="tambons"
          className="selectpillboxbar"
          id="tambons"
          value={selectedTambon}
          onChange={handleTambonChange}
          disabled={selectedAmphure === 0}
        >
          <option value="0">เลือกตำบล</option>
          {tambons
            .filter((tambon) => tambon.amphure_id === selectedAmphure)
            .slice()
            .sort((a, b) => a.name_th.localeCompare(b.name_th))
            .map((tambon) => (
              <option key={tambon.id} value={tambon.id}>
                {tambon.name_th} ({tambon.zip_code})
              </option>
            ))}
        </select>
      </div>
      <div className="Button-align">
        <input type="submit" onClick={handleSubmit} name="signup" id="signup" className="buttonAddPatient" style={{ fontSize: '20px' }} defaultValue="บันทึกข้อมูล" />
      </div>
    </div>
    <div className="Block-body">
      <h2>สร้างกล่องยาใหม่</h2>
      <h4>รหัสกล่องยา</h4>
      <div>
        <input type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="pb0XXX" />
      </div>
      <h4>เบอโทรศัพท์กล่องยา</h4>
      <div>
        <input type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="เบอโทรศัพท์กล่องยา" />
      </div>
      <hr />
      <div className="Button-align">
        <input type="submit" name="signup" id="signup" className="buttonAddPatient" style={{ fontSize: '20px' }} defaultValue="สร้างกล่องยาใหม่" />
      </div>
    </div>
    <div className="Block-body">
      <h2>การคืนกล่องยา</h2>
      <h4>เลขบัตรประจำตัวประชาชน</h4>
      <div>
        <input type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="เลขบัตรประจำตัวประชาชน" />
      </div>
      <h4>รหัสกล่องยา</h4>
      <div>
        <input type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="เลขกล่องยา" />
      </div>
      <h4>สาเหตุการคืน</h4>
      <div>
        <input type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="สาเหตุการคืน" />
      </div>
      <hr />
      <div className="Button-align">
        <input type="submit" name="signup" id="signup" className="buttonAddPatient" style={{ fontSize: '20px' }} defaultValue="คืนกล่อง" />
      </div>
    </div>
    <div className="Block-body">
      <h2>การจับคู่กล่องยา</h2>
      <h4>เลขบัตรประจำตัวประชาชน</h4>
      <div>
        <input type="text" className="searchbar" style={{ fontSize: '18px' }} placeholder="เลขบัตรประจำตัวประชาชน" />
      </div>
      <h4>เลือกกล่องยา</h4>
      <select name="cars" className="selectpillboxbar" style={{ fontSize: '18px' }} id="cars">
        <option value="pb00001">pb00001</option>
        <option value="pb00002">pb00002</option>
        <option value="pb00003">pb00003</option>
        <option value="pb00004">pb00004</option>
      </select>
      <hr />
      <div className="Button-align">
        <input type="submit" name="signup" id="signup" className="buttonAddPatient" style={{ fontSize: '20px' }} defaultValue="จับคู่กล่องยา" />
      </div>
    </div>
  </div></>
}

export default ObsMainPage

interface Province {
  id: number;
  name_th: string;
  name_en: string;
  geography_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

interface Amphure {
  id: number;
  name_th: string;
  name_en: string;
  province_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

interface Tambon {
  id: number;
  zip_code: number;
  name_th: string;
  name_en: string;
  amphure_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}