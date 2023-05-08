import Cookies from "js-cookie";

export function getUserData() {
    const userString = Cookies.get('user');
    console.log("Data: " + userString)
    const userObject = JSON.parse(userString || "{}");

    return userObject;
}

export function popupRoute (username: String, path: String) {
    const test_text = username + " " + path;
    console.log(test_text);
    return test_text;
}