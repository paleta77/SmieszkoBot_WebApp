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
    // let privateKeyBuilder = "-----BEGIN PRIVATE KEY-----\n";
    // privateKeyBuilder += "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALUgiFGogiNrPMqcdL1akwR4SPxX4CN+HlVGfywxRYD55sSRqDdTCN5kR0Rj9bUtegopAgkrnLQmgBpAzyD3ndFLaH8gtOoDiT6cPIuOyldRWyoVpaJ+632KTWanEeyW+j4Vh4+SShwSEORB9rQuMKUTx0qHBROK8+NiPSnUhkWPAgMBAAECgYAWmhKorfBfXxhc6B0hK9ZArondA1Iy26AJYByqdROJPqXvTYXCMZhft/+0pwyYKS6bafaZElohmNRPclrmcD+/Eg7e757qMZ9oqW+2wbd8Qy7CF8HufULvEYsg44JBKomnra2wBcDC4mAKvq3zuS6MrDaKmEEkvLc9I/eI8AADcQJBAPSB//eb5rLqFAc/ecU17e03bnV0nLE7XNpD8cWPPTqhGd/FNwL8gj1lDLLC0vvLaA0RmPO8gmLD+zcc2UmsHosCQQC9o+oT8PNFTWSHlDJcYrPPWnlfFFdHyilwC+J8XUmZfVJPQpMNXnwelMSBGCHVmnV5Th3MQ5cL47f8Znf/1bmNAkAFW4PcTRI1AWQG9KEabSAVfo1xDWkRiRdzwOFfTtAspLMIcC3QZvADoF8y24n78m0JPEV5sbu5pkmu33bzYk4ZAkBqbNHRrRgpHVy8hZuZoz67sE+K31R4Emkc216YYpYKUH1fw8HY79yCIQUCWbOrN0qT8BXi60+aOYqoWC0h4ySFAkEA2y1j5I/zLj/CBcD7HrP7dU8+cTfnq7RdAwZB5hLZjvqy4toeDir6NU5Twny93hyzftdKjlTh8S5QCk2u5FEZvQ==";
    // privateKeyBuilder += "\n-----END PRIVATE KEY-----";
    // console.log(privateKeyBuilder);
    // const userPrivateKey = new NodeRSA("-----BEGIN PRIVATE KEY-----" +
    //     "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALhvzMkqrPcHi9nY" +
    //     "lIOnKdKhy0We1mUQXC4bkjrhej9/BGvI8r4wrtWROw3oO1a54GnWdlqQxzQNyXOY" +
    //     "gMpJlH0Ew1R7Zk11sgNtEgek0DOZyggdz+lVsVsM5QYe/2YCxZ/LoCNIeCjA+k3W" +
    //     "GD0/HQnPYOHcMOOkcfE/g3JZokzdAgMBAAECgYAk9lLmJeVQBHUkjWEGGWQqUD56" +
    //     "j2CMFIFExEXEAxgKzZvHNhhfwUXoixh4qwfpU4sD6vUBJW6mofSzc+aro59cLzOY" +
    //     "3C0+boErNLJdPZnx7qBEmXLq6t+j46+xwAm9IqvHTwbfKWxDO/zaaJk1LngMR2db" +
    //     "vmt5NIA+8xcgG+eeCQJBAO6v2bIv0cpN0LPDEb+8r54gMiCSmpeoZZg2VOp4xwte" +
    //     "Sez+6dgCawSYhhOJHQLzBAfEamb3U0AU/1ygMhvmoqcCQQDF0JV+XSRkVWPsOnTw" +
    //     "v3pN382dChO5+Excj2ZnBL8Ui4MI9ioJDL9oQWC9OdX6pisO1v8VV6qC0b9+lWEB" +
    //     "bpjbAkEAv9QmsvWJtvyJMiAhoKaFwiEACHuqsR5O4GEyJ+t/lRxnb4iD6e4vklb+" +
    //     "0q6M2XT0FUX/eddmWgdGIGxDOXdH2wJAZXKFWFrYMQSBzEJmepkYVhuyzRi/6R3n" +
    //     "u4hnUenjPNwXhV8JS77X4tW0kRa6IGNbra6g/wcIkTKUbIybRSq9BQJARlm/agkB" +
    //     "NNEUnXODGzI27fj4c8hDDmsveUsFN9D1BVgjv7lsCze2nSxaCYOxu5vrAztGGxsZ" +
    //     "hV0gvSeNKQ9qCw==" +
    //     "-----END PRIVATE KEY-----", 'pkcs8-private-pem');
    // const userPrivateKey = new NodeRSA("-----BEGIN PRIVATE KEY-----\n" +
    //     "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANZVkrUS0NpAQskZ\n" +
    //     "S1qK5F9oh9BTsBuDoJZ3YWaz3h6U6R2kXq/rhUOG2qwPmHdNmpXQwMkyTfcwqZy4\n" +
    //     "VmitE2RJVVqQ+jFKdviLOBJdK4VKFikUH7VpOJPu0JNmeGhfDhF3KItIQvMqaceb\n" +
    //     "9CzxEcriEripRjlaEUwLGWBzliyVAgMBAAECgYAom+QE/MCnaV99/JXjXMdyMDrz\n" +
    //     "RLfsLp9BgvLoY5HlF2+nlxn9mNER/z31Nas8h26PjhLIzAgrmoO4VtDAWnJ+x9dW\n" +
    //     "0jK0aSDVQVOTkXwyj6ABVxS5h9Q96jxUS+Y90Q6wlrkcNjmbn2p1bpYZsZiAJlOx\n" +
    //     "z0H0HZkxYKWloeq7oQJBAPnh5vwiiRW3m8TDl2ZTUB7/wFG+btNoi9Y1WmHjCvuM\n" +
    //     "C219wZSQPtoF98pF93U533NGyxUC6hNQxh5N3AzAmx0CQQDblODhkVH9WEpm+0vf\n" +
    //     "vOOsYpGZfs6f62qILhDfQXsCTzXRuBZOsxll7tBlOYLynQW+Vvx3LWgmS3C2p445\n" +
    //     "baXZAkEAvqCDYh3Gjna/sl+0BC/Sk5Nv1+x7B3ReGVAiX0KhgjzYCvNA1mEkUZbz\n" +
    //     "7a9qlFdOC9cZ3jGW+J1KRpwHHwNgUQJAeOfzI4EW+j7BSQ8Z6iph2quzrCcsstW3\n" +
    //     "pSBoXeX6S30+Dyoj7lWjqILk8LfIKLrZTMMs5Jp1/JARkiGUqH59kQJAIJYzaJl7\n" +
    //     "LZQhThS3/fiPEk6CvLSQMgsl++sxy/AiaRnv5vd5Pb6pZMOkBSNz59O7srHqXFmv\n" +
    //     "cAtBnLujR54kqA==\n" +
    //     "-----END PRIVATE KEY-----", 'pkcs8-private-pem');
    //console.log(privateKey);
    //privateKey = privateKey.replace(" ", "");

    console.log(privateKey);

    const userPrivateKey = new NodeRSA(privateKey, 'pkcs8-private-pem');

    // const toUserPublicKey = new NodeRSA("-----BEGIN PUBLIC KEY-----" +
    //     "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4b8zJKqz3B4vZ2JSDpynSoctF" +
    //     "ntZlEFwuG5I64Xo/fwRryPK+MK7VkTsN6DtWueBp1nZakMc0DclzmIDKSZR9BMNU" +
    //     "e2ZNdbIDbRIHpNAzmcoIHc/pVbFbDOUGHv9mAsWfy6AjSHgowPpN1hg9Px0Jz2Dh" +
    //     "3DDjpHHxP4NyWaJM3QIDAQAB" +
    //     "-----END PUBLIC KEY-----", 'pkcs8-public-pem');

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
    myHeaders.append("Authorization", "basic aos:dsad");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(body),
        //mode: 'no-cors'
    };

    fetch("http://localhost:8500/crypto", requestOptions)
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