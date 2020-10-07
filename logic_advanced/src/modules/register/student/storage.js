export default class RegisterUserStudent {

    static setUser({name, userName, email, password}) {
        var formData = new FormData()
        formData.append("email_usuario",email)
        formData.append("senha_usuario:", password)
        formData.append("nick_usuario", userName)
        formData.append("descricao_usuario", name)
        
        var options = {
            method: 'POST',
            body:formData
        }

        fetch('http://127.0.0.1:82/usuario', options)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
}