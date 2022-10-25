class AuthService {
    async register({ email, fullName, password }) { 
        return 'hello';
    } 
}

module.exports = new AuthService();