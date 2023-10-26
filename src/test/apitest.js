const axios=require('axios');



const adminApi='http://localhost:2200/v1/admin';

const data={
    "name":"Prashant Vashisht",
    "email":"p.vashisht007@gmail.com",
    "password":"HashMala@1",
    "isEmailVerified":true,
    "isPasswordChanged":true
}
const makeApiCall=async(data)=>{
    const o = {
        url: adminApi,
        method: 'post',
        data:data,
        timeout: 10000,
      };

    const call=await axios(o);
    console.log(call)

}
makeApiCall(data)