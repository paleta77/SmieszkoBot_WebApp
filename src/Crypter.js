import React from "react";
const NodeRSA = require('node-rsa');

export function encryptRSA(plainText){


    const key = new NodeRSA({b: 1024});

    const encrypted = key.encrypt(plainText, 'base64');
    console.log('encrypted: ', encrypted);
    console.log('Public key: ', key.exportKey("pkcs8-public"));
    console.log('Private key: ', key.exportKey("pkcs8-private"));
    //console.log('Private key: ', key.exportKey("pkcs1-private"));
}