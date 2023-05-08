"use client";
import "./login.css";

import React, { useState } from 'react'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { gql } from 'graphql-request';
import { GraphQLClientConnector } from "../lib/API";
const graphQLClient = GraphQLClientConnector();

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (username: String, path: String) => {
        console.log(username, path);
      };
    
      function getUserFromCookie(): Promise<string> {
        return new Promise((resolve, reject) => {
          const user = Cookies.get('user');
          if (user) {
            resolve(user);
          } else {
            const intervalId = setInterval(() => {
              const user = Cookies.get('user');
              if (user) {
                clearInterval(intervalId);
                resolve(user);
              }
            }, 100);
          }
        });
      }
    
      function setCookie(key: string, value: string) {
        return new Promise((resolve, reject) => {
          Cookies.set(key, value, {
            // set any additional options here
          });
      
          // check if the cookie was set
          const cookieValue = Cookies.get(key);
          if (cookieValue === undefined) {
            reject(new Error(`Failed to set cookie ${key}`));
          } else {
            resolve(cookieValue);
          }
        });
      }
    
    async function handleLogin(event: { preventDefault: () => void; }) {
        event.preventDefault();
          
    
        const query = gql`
          query Login($input: LoginInput) {
            login(input: $input) {
              userInfo {
                Firstname
                Lastname
                userRole
                Gender
                telephone
                email
                homeAddress
                tambon
                amphoe
                province
              }
              userAccount {
                username
                CID
              }
            }
          }
        `;
    
        const variables = {
          input: {
            username: username,
            passwordHased: password,
          },
        };
    
        try {
          const data = await graphQLClient.request(query, variables);
          console.log((data as LoginData).login);
          await setCookie('user', JSON.stringify((data as LoginData)));
          // Cookies.set('user', JSON.stringify((data as LoginData)));
    
          const userString = await getUserFromCookie();
          const userObject = JSON.parse(userString);
    
          console.log(userString);
          console.log("Called cookies " + username + " " + (userObject as LoginData).login.userInfo.userRole|| "");
          if ((userObject as LoginData).login.userInfo.userRole == "OBSERVER") {
            console.log("OBS");
            handleClick (username.toString() || "", "/Obs/" + username  +"/Main");
            const newRoute = "/Obs/" + username + "/Main";
            window.location.href = newRoute;
          }
          if ((userObject as LoginData).login.userInfo.userRole == "HOSPITAL") {
            console.log("DOC");
            handleClick (username.toString() || "", "/Doc/" + username  +"/Main");
            const newRoute = "/Doc/" + username + "/Main";
            window.location.href = newRoute;
          }
          if ((userObject as LoginData).login.userInfo.userRole == "ADMIN") {
            console.log("ADMIN");
            handleClick (username.toString() || "", "/Admin/" + username  +"/Main");
            const newRoute = "/Admin/" + username + "/Main";
            window.location.href = newRoute;
          }
          else {
            console.log("PATIENT");
          }
    
          }
        
        catch (error) {
          console.error(error);
        }
      }

    
    return (
        <div className="Block-body">
            <h4>ชื่อผู้ใช้</h4>
            <div>
                <input
                    type="text"
                    className="searchbar username-input"
                    style={{ fontSize: '18px' }}
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <h4>รหัสผ่าน</h4>
            <div>
                <input
                    type="text"
                    className="searchbar password-input"
                    style={{ fontSize: '18px' }}
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <hr />
            <div className="Button-align">
                    <Link href={"/Obs/" + username  +"/Main"} type='button' id="signup" onClick={handleLogin} className="buttonAddPatient" style={{ fontSize: '20px' }} defaultValue="เข้าสู่ระบบ">เข้าสู่ระบบ</Link>
                    {/* <input type="button" name="signup" id="signup" onClick={handleLogin} className="buttonAddPatient" style={{ fontSize: '20px' }} defaultValue="เข้าสู่ระบบ" /> */}
            </div>
            <div className="Button-align">
            <Link href={"/register"} type='button' id="signup"  className="buttonAddPatient555" style={{ fontSize: '20px' }}>ลงทะเบียน</Link>
                    {/* <input type="submit" name="signup" id="signup" className="buttonAddPatient555" style={{ fontSize: '20px' }} defaultValue="ลงทะเบียน" /> */}
                    </div>
        </div>

    )
}

export default LoginPage