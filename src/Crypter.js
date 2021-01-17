import React, {useContext} from "react";
import {jwtContext} from "./App";

const NodeRSA = require('node-rsa');

export function generateRSAKeys(){
    const keyPairGenerator = new NodeRSA({b:1024});
    const keyPair = {
        publicKey: keyPairGenerator.exportKey("pkcs8-public-pem"),
        privateKey: keyPairGenerator.exportKey("pkcs8-private-pem"),
    }
    return keyPair;
}

function jwtDecode(jwt){
    console.log("jwt decode", jwt);
    return JSON.parse(atob(jwt.split('.')[1]));
}

export function decryptString(message, privateKey){

    console.log(privateKey);

    const userPrivateKey = new NodeRSA(privateKey, 'pkcs8-private-pem');

    let messageInParts = message.split("!part!");
    console.log("messageInParts", messageInParts);
    let decryptedMessage = "";
    for(let i = 0; i<messageInParts.length; i++){
        decryptedMessage = decryptedMessage + userPrivateKey.decrypt(messageInParts[i], "utf8");

    }
    console.log("decryptedMessage", decryptedMessage);

    return decryptedMessage;
}

export function sendMessageEncryptedRSA(to, topic, message, jsonWebToken, toUserPublicKey){

    //'pkcs8-public-pem'
    console.log("to in encrypt", to);

    const botPublicKey = new NodeRSA("-----BEGIN PUBLIC KEY-----" +
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGnVXr+61Tz+oUF1fzT7hcvLBx" +
        "Npmum9ajl4VWaoNTRnanrHfuY+zfPIW+yz1yO82hmnhR1NQgTdcDpHuLcwhev0d2" +
        "6gXC7gn5eBpmHQUqagghCbVGAvj40bxEmJZb8KSIBug2hfWLV4/i1nWWFKI7qQIG" +
        "PaR5pbGwSSc1ieg2FQIDAQAB" +
        "-----END PUBLIC KEY-----", 'pkcs8-public-pem');


     const decodedJWT = jwtDecode(jsonWebToken[0]);
     decodedJWT.publicKey = decodedJWT.publicKey.replace("\\\\n", "\n");
    // console.log(decodedJWT.publicKey);
    // console.log(decodedJWT);
    const userPublicKey = new NodeRSA(toUserPublicKey.publicKey, 'pkcs8-public-pem');

    const jsonToEncrypt = {
        from_user: decodedJWT.username,
        topic: userPublicKey.encrypt(topic, "base64", "utf8"),
        to_user: to,
        message: {
            parts: []
        }
    };
    console.log("toUserPublicKey ", toUserPublicKey);
    console.log("UserPublicKey ", userPublicKey.exportKey('pkcs8-public-pem'));
    const messageToEncryptInBlocks = message.match(new RegExp('.{1,' + userPublicKey.getMaxMessageSize() + '}', 'g'));

    for(let i = 0; i<messageToEncryptInBlocks.length; i++){
        jsonToEncrypt.message.parts.push(userPublicKey.encrypt(messageToEncryptInBlocks[i], "base64", "utf8"));
    }
    console.log(document.getElementById("to").value);

    const jsonToEncryptInBlocks = JSON.stringify(jsonToEncrypt).match(new RegExp('.{1,' + botPublicKey.getMaxMessageSize() + '}', 'g'));
    let body = {
        parts: []
    };

    for(let i = 0; i<jsonToEncryptInBlocks.length; i++){
        body.parts.push(botPublicKey.encrypt(jsonToEncryptInBlocks[i], "base64", "utf8"));
    }


//'{"msg":"test"}'

    var myHeaders = new Headers();
    const credentials = "Bearer " + jsonWebToken[0];
    myHeaders.append("Authorization", credentials);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(body),
        //mode: 'no-cors'
    };

    fetch("https://localhost:8500/crypto", requestOptions)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then(function (result) {
            console.log(result);
        })
        .catch(error => console.log('error', error));
}