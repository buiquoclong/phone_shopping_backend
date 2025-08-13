// get random Password with 8 characters
function generatePassword(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}
// get random verify Token
function generateVerifyToken(){
    var verifyToken = "";
    const numbers = "0123456789";
     for (let i = 0; i < 6; i++) {
        verifyToken += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return verifyToken;
}

module.exports = {
    generatePassword, 
    generateVerifyToken};