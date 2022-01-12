
// var conn          =   require("../dataBaseConnection/connection");
// // const bcrypt      =   require('bcrypt');
// const MongoClient =   require('mongodb').MongoClient;
// const objectId    =   require('mongodb').ObjectId;
// const e           =   require("cors");
// var md5           =   require('md5');
// const jwt_decode  =   require('jwt-decode');
// var str_replace   =   require('str_replace');
// // const crypto      =   require('crypto');
// const Cryptr      =   require('cryptr');

// const { resolve } =   require("path");
// const { then }    =   require("../dataBaseConnection/connection");
// const cryptr      =   new Cryptr('thisisFlightenoSecuretKeyForEncryptoData');




// module.exports = {

    // getUserDetails: (admin_id) =>{
    //     return new Promise (resolve => {
    //         conn.then((db) => {

    //             db.collection('users').findOne({'_id' : new objectId( admin_id.toString() ) }, async(err, result) => {
    //                 if(err){
    //                     resolve(false);
    //                 } else {

    //                     // console.log(result)
    //                     resolve(await result )

    //                 }
    //             })
    //         })
    //     })
    // },

    // getBasicAuthCredentials : () => {
    //     return new Promise(resolve => {

            // let username = md5('flighteno31');
            // let password = md5('Asim12!!!~asa');

            // let returnArray = {
            //     username   : username,
            //     password   : password
            // }
            // resolve(returnArray)

    //         resolve(true)
    //     })
    // },

    // checkPaymentIsPendings: (order_id) => {
    //     return new Promise(resolve => {
    //         conn.then((db) => {

    //             db.collection('orders').countDocuments({ '_id' : new objectId(order_id), payment_status: "paid" },  async(err, count) => {

    //                 if(err){

    //                     resolve(false)
    //                 }else{

    //                     resolve(await count)
    //                 }
    //             })

    //         })
    //     })
    // },

    // //decode token and varify the user
    // checkIsTokenIsValid : (token) => {
    //     return new Promise(resolve => {
    //         conn.then((db) => {

    //             let newToken = result = str_replace('Token:', '', token);
    //             // console.log(newToken)
    //             var decoded = jwt_decode(newToken.trim());
    //             db.collection('users').findOne({ '_id' :  new objectId(decoded.admin_id) }, async(err, data) => {
    //                 if(err){
                        
    //                     resolve(false)
    //                 }else{

    //                     // console.log(data)
    //                     if(await data){

    //                         resolve(true)
    //                     }else{

    //                         resolve(false)
    //                     }
    //                 }
    //             })

    //         })
    //     })
    // },


    // //encryption alogo
    // encryptData: (data) => {
    //     return new Promise(resolve => {

    //         const encryptedString = cryptr.encrypt(data);
    //         resolve(encryptedString)

    //     })
    // },

    // //decryption alogo
    // decryption : (data) => {
    //     return new Promise(resolve => {

    //         const decryptedString = cryptr.decrypt(data);
    //         resolve(decryptedString)

    //     })
    // },

// };