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
    const userPrivateKey = new NodeRSA("-----BEGIN PRIVATE KEY-----" +
        "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALhvzMkqrPcHi9nY" +
        "lIOnKdKhy0We1mUQXC4bkjrhej9/BGvI8r4wrtWROw3oO1a54GnWdlqQxzQNyXOY" +
        "gMpJlH0Ew1R7Zk11sgNtEgek0DOZyggdz+lVsVsM5QYe/2YCxZ/LoCNIeCjA+k3W" +
        "GD0/HQnPYOHcMOOkcfE/g3JZokzdAgMBAAECgYAk9lLmJeVQBHUkjWEGGWQqUD56" +
        "j2CMFIFExEXEAxgKzZvHNhhfwUXoixh4qwfpU4sD6vUBJW6mofSzc+aro59cLzOY" +
        "3C0+boErNLJdPZnx7qBEmXLq6t+j46+xwAm9IqvHTwbfKWxDO/zaaJk1LngMR2db" +
        "vmt5NIA+8xcgG+eeCQJBAO6v2bIv0cpN0LPDEb+8r54gMiCSmpeoZZg2VOp4xwte" +
        "Sez+6dgCawSYhhOJHQLzBAfEamb3U0AU/1ygMhvmoqcCQQDF0JV+XSRkVWPsOnTw" +
        "v3pN382dChO5+Excj2ZnBL8Ui4MI9ioJDL9oQWC9OdX6pisO1v8VV6qC0b9+lWEB" +
        "bpjbAkEAv9QmsvWJtvyJMiAhoKaFwiEACHuqsR5O4GEyJ+t/lRxnb4iD6e4vklb+" +
        "0q6M2XT0FUX/eddmWgdGIGxDOXdH2wJAZXKFWFrYMQSBzEJmepkYVhuyzRi/6R3n" +
        "u4hnUenjPNwXhV8JS77X4tW0kRa6IGNbra6g/wcIkTKUbIybRSq9BQJARlm/agkB" +
        "NNEUnXODGzI27fj4c8hDDmsveUsFN9D1BVgjv7lsCze2nSxaCYOxu5vrAztGGxsZ" +
        "hV0gvSeNKQ9qCw==" +
        "-----END PRIVATE KEY-----", 'pkcs8-private-pem');

    const userPublicKey = new NodeRSA("-----BEGIN PUBLIC KEY-----" +
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4b8zJKqz3B4vZ2JSDpynSoctF" +
        "ntZlEFwuG5I64Xo/fwRryPK+MK7VkTsN6DtWueBp1nZakMc0DclzmIDKSZR9BMNU" +
        "e2ZNdbIDbRIHpNAzmcoIHc/pVbFbDOUGHv9mAsWfy6AjSHgowPpN1hg9Px0Jz2Dh" +
        "3DDjpHHxP4NyWaJM3QIDAQAB" +
        "-----END PUBLIC KEY-----", 'pkcs8-public-pem');

    let messageInParts = message.split("!part!");
    console.log("messageInParts", messageInParts);
    let decryptedMessage = "";
    for(let i = 0; i<messageInParts.length; i++){
        decryptedMessage = decryptedMessage + userPrivateKey.decrypt(messageInParts[i], "utf8");

    }
    console.log("decryptedMessage", decryptedMessage);
}

export function sendMessageEncryptedRSA(to, topic, message, jsonWebToken){

    //'pkcs8-public-pem'
    console.log("to in encrypt", to);

    const botPublicKey = new NodeRSA("-----BEGIN PUBLIC KEY-----" +
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGnVXr+61Tz+oUF1fzT7hcvLBx" +
        "Npmum9ajl4VWaoNTRnanrHfuY+zfPIW+yz1yO82hmnhR1NQgTdcDpHuLcwhev0d2" +
        "6gXC7gn5eBpmHQUqagghCbVGAvj40bxEmJZb8KSIBug2hfWLV4/i1nWWFKI7qQIG" +
        "PaR5pbGwSSc1ieg2FQIDAQAB" +
        "-----END PUBLIC KEY-----", 'pkcs8-public-pem');
    const webAppPrivateKey = new NodeRSA("-----BEGIN PRIVATE KEY-----\n" +
        "MIICeQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBAMadVev7rVPP6hQX\n" +
        "V/NPuFy8sHE2ma6b1qOXhVZqg1NGdqesd+5j7N88hb7LPXI7zaGaeFHU1CBN1wOk\n" +
        "e4tzCF6/R3bqBcLuCfl4GmYdBSpqCCEJtUYC+PjRvESYllvwpIgG6DaF9YtXj+LW\n" +
        "dZYUojupAgY9pHmlsbBJJzWJ6DYVAgMBAAECgYEAszZ+tBt5T3n47j4OByb05QEB\n" +
        "eHZa/5nwd9ad4tbjPr4DDNLruLiDoP8cc4cyH6RkrKAUV0piSe/Sxp+hNrgKYNRk\n" +
        "EoxvyCz5Pv0u/w4zqAZtu/pprttEtVeCsvIAwNNx9yxkFEPK42f+no/Eve66avRi\n" +
        "rceraxT/7lmd1PAxkeECQQDtSvsjW9S8DrAN7kt0oJSmtzfBzI+F1Ylf/LQMgopa\n" +
        "X2YUeKUPm8P50udevRW2O/g14nkGiso3BO/AkEkozPR9AkEA1kXA3seXNBekdBB1\n" +
        "JctnaUFF2m61qYSGdgnJ/bIDOSyUaR3LHhWgEB8//JMPf76tdx/5o8ok1cjjux0J\n" +
        "KK7zeQJBAMaJUsBNyBskKtctBoLpDBbE+uiyL28pr4vZEgfZfMqKQQ1lt6zshbbT\n" +
        "Z/QTPkQ/vrfO6bW4j+IixjoWPq/dc70CQQCf3JTD4Ucm/0ibqzerhfDWL3OtPxHb\n" +
        "slsbL7x6wVf0TRVAw5CqFlpADQCRMSrMFPeYO8vlbkhDE8kL7eLKbpSJAkEA2NDS\n" +
        "2uEfK0XnFmq6+SmdWiMiEUMdIn3AkCTnvh8Dy1K9ODqsKBvi18t0XLY/F21+upeL\n" +
        "Hf0rv2rO2yprjLdoQA==\n" +
        "-----END PRIVATE KEY-----", 'pkcs8-private-pem');

    const decodedJWT = jwtDecode(jsonWebToken[0]);

    decodedJWT.publicKey = decodedJWT.publicKey.replace("\\\\n", "\n")
    console.log(decodedJWT.publicKey);
    console.log(decodedJWT);
    const userPublicKey = new NodeRSA(decodedJWT.publicKey, 'pkcs8-public-pem');

    const jsonToEncrypt = {
        from_user: decodedJWT.username,
        topic: userPublicKey.encrypt(topic, "base64", "utf8"),
        to_user: to,
        message: {
            parts: []
        }
    };

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