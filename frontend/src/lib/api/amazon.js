export const testUrl = "https://sbcheckout.PayFort.com/FortAPI/paymentPage"
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';




export let TransactionData = {
    service_command:"TOKENIZATION",
    access_code:"fVV2e5KWuLxKDRqIcBYW",
    merchant_identifier:"ea198946",
    merchant_reference:"BaZ9239-yK898",
    language:"en",
    expiry_date:2505,
    card_number:4005550000000001,
    card_security_code:123,
}

export let signatureData = {
    service_command:"TOKENIZATION",
    access_code:"fVV2e5KWuLxKDRqIcBYW",
    merchant_identifier:"ea198946",
    merchant_reference:"BaZ9239-yK898",
    language:"en",
}



export function hash(obj){
    const sortedData = Object.fromEntries(Object.entries(obj).sort());

    let shaString = '';
    for (const [key, value] of Object.entries(sortedData)) {
        shaString += `${key}=${value}`;
    }

    // Replace 'YOUR_SHA_REQUEST_PASSPHRASE' and 'YOUR_SHA_TYPE' with your actual passphrase and hash type
    const shaRequestPassphrase = '37y/BPAhaaREWntutm8APo!-';
    const shaType = 'SHA-256';

    shaString = shaRequestPassphrase + shaString + shaRequestPassphrase;
    let signature = sha256(shaString)


    // const signature = crypto.createHash(shaType).update(shaString).digest('hex');
    // 51719497d273c64144eb5e3700da2146b75cd8b7f89a66aa479f10eb98c1326a
    return signature

}


