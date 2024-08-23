const bcrypt = require("bcrypt");
const { get } = require("lodash");
async function getSalt(){
    const salt = await bcrypt.genSalt();
    const password = '12345';
    const pwHash =await bcrypt.hash(password, salt);
    console.log(pwHash);
    console.log(salt);
}
getSalt();