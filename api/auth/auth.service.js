const userService = require('../user/user.service');
class AuthService {
    register(user) { 
        return userService.createUser(user);
    } 
}

module.exports = new AuthService();