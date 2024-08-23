const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token)
      return res.status(401).send('Token bo`lmaganligi sababli murojaat rad etildi. ') 
    //agar xato 401 bo`lsa biz so`rovga tokenni jo`natmayotgan bo`lamiz

    
    //tokenni aslligini tekshiramiz.
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));  // tokenni tekshiradi va uning ichidagi payloadni decode qilib beradi.
        req.user = decoded;
        next();
    }    
    catch (ex) {
        return res.status(400).send('yaroqsiz token');
        // agarda xato 400 bo`lsa beckendni ichida yuborgan so`rov ichida nimadir muammo bor.
    }
}

