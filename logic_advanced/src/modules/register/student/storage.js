export default class RegisterUserStudent {

    static setUser({name, userName, email, password}) {
        let formData = new FormData()
        formData.append("email_usuario",email)
        formData.append("senha_usuario", password)
        formData.append("nick_usuario", userName)
        formData.append("descricao_usuario", name)
        
        let options = {
            method: 'POST',
            body:formData
        }

        return fetch('http://127.0.0.1:82/usuario', options);
    }
}