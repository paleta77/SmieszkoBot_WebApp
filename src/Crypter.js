import React from "react";
const NodeRSA = require('node-rsa');

export function encryptRSA(from, to, message){

    const botPublicKey = new NodeRSA("-----BEGIN PUBLIC KEY-----\n" +
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGnVXr+61Tz+oUF1fzT7hcvLBx\n" +
        "Npmum9ajl4VWaoNTRnanrHfuY+zfPIW+yz1yO82hmnhR1NQgTdcDpHuLcwhev0d2\n" +
        "6gXC7gn5eBpmHQUqagghCbVGAvj40bxEmJZb8KSIBug2hfWLV4/i1nWWFKI7qQIG\n" +
        "PaR5pbGwSSc1ieg2FQIDAQAB\n" +
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




    const jsonToEncrypt = {
        author: from,
        to: to,
        msg: message
    };

    console.log(jsonToEncrypt);
    console.log(botPublicKey);
    console.log(webAppPrivateKey);

    const encryptedJson = botPublicKey.encrypt(JSON.stringify(jsonToEncrypt), "base64", "utf8");

//'{"msg":"test"}'

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "basic aos:dsad");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: encryptedJson,
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