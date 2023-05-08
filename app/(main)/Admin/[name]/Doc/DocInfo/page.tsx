import React from 'react'

function PatientInfoPage() {
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
        <p>Administrator</p>
        <form action="C:\Users\Pillbox2022\Desktop\NewWeb\Login\1login.html">
          <button >ออกจากระบบ</button>
        </form>
        <br />
        <br />
        <form action="C:\Users\Pillbox2022\Desktop\NewWeb\AdminAllObserverPage\AdminAllOBSPage.html">
          <button >ข้อมูลเจ้าหน้าที่ทั้งหมด</button>
        </form>
        <br />
        <br />
        <form action="C:\Users\Pillbox2022\Desktop\NewWeb\AdminAllDoctorPage\AdminAllDoctorPage.html">
          <button >ข้อมูลหมอทั้งหมด</button>
        </form>
        <br />
        <br />
        <form action="C:\Users\Pillbox2022\Desktop\NewWeb\AdminAllPatientPage\AdminAllPatientPage.html">
          <button >ข้อมูลคนไข้ทั้งหมด</button>
        </form>
        <br />
        <br />
        <form action="C:\Users\Pillbox2022\Desktop\NewWeb\Admin\AdminMainPage.html">
          <button >กลับหน้าหลัก</button>
        </form>
      </div>
      {/* add more content here */}
      <div className="Block-body">
        <h2>รายชื่อเจ้าหน้าที่ทั้งหมด</h2>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th>CID</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>เพศ</th>
              <th>วันเกิด</th>
              <th>เบอร์โทรศัพท์</th>
              <th>ตำบล</th>
              <th>อำเภอ</th>
              <th>จังหวัด</th>
              <th>ที่อยู่</th>
              <th>อีเมล</th>
            </tr>
            <tr>
              <td>1103702461958</td>
              <td>จอนนี่</td>
              <td>อิงลิช</td>
              <td>ชาย</td>
              <td>1975-08-15</td>
              <td>0841001761</td>
              <td>บ้านใหม่</td>
              <td>ปากเกร็ด</td>
              <td>นนทบุรี</td>
              <td>1/2 หมู่ 3</td>
              <td>email</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
  )  
}

export default PatientInfoPage