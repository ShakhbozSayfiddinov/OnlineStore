const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');   //tokenni validate qilish uchun kerak bo`ladi. 
describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const user = new User({isAdmin: true});
        const token = user.generateAuthToken();
        const decodedObject = jwt.verify(token, config.get('jwtPrivateKey'));
        // unittestni natijasini tekshirishimiz uchun user obyekti bilan decodedObjectni solishtirishimiz kerak. 
        expect(decodedObject).toMatchObject({isAdmin: true});
    });
})