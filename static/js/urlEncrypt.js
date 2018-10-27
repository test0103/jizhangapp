import {
    JSEncrypt
} from './jsencrypt'

const urlEncrypt= function (data) {
    var publickey =
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwID269Q8ACQ50vP0U0gncusUi6cpZbtKMY2fxJTTIAYdjdJDo3L7zUZYxwMemOJcpMuEm4krTLCTiJRzZIMwNnsJEdSqFZFcnkL/EjdYjS/YLwlEeD42HUIKh7CmkUj1lcb3HJMBp6HeeTJBKpwBJ7akt25pzZ4AkER2T7tHqWQIDAQAB";
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publickey);
    const key = encodeURIComponent(encrypt.encrypt(data)); //这个是加密后的
    // const key = (encrypt.encrypt(data)); //这个是加密后的
    return key
    // export const secretkey = encodeURIComponent(encrypt.encrypt(secretkey)); //这个是加密后的

}

export default urlEncrypt