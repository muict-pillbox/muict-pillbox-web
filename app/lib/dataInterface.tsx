interface LoginData {
    login: {
        userAccount: {
            CID: String,
            username: String,
        }
        userInfo: {
            Firstname: String,
            Lastname: String,
            userRole: String,
            Gender: String,
            telephone: String,
            email: String,
            homeAddress: String,
            tambon: String,
            amphoe: String,
            province: String,
        }
    }
}

interface LocalHospitalData {
    localHospitalNumber: String
    province: String,
    amphoe: String,
    localHospitalname: String,
    LocalHospital:{
    LocalHospitalNumber: String,
    localHospitalname: string;
    tambon: string;
    amphoe: string;
    province: string;}
  }
  
  interface HospitalProps {
    LocalHospital: LocalHospitalData[];
  }

  interface UserInfo {
    CID: string;
    Firstname: string;
    Lastname: string;
    Gender: string;
    dob: string;
    telephone: string;
    tambon: string;
    amphoe: string;
    province: string;
    homeAddress: string;
    email: string;
    userRole: string;
  }
