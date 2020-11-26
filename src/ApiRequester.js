export function GetAuthCode() {
    const xhr = new XMLHttpRequest()
    const url = "http://localhost:8500/login?userID=469505275850915850&guildID=164834533001134080";
    let responseCode = "";

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status===200) {
            responseCode = JSON.parse(this.responseText);
        }
    }
    xhr.open("GET", url, true);
    xhr.send();

    return responseCode;
}