export default class RegisterUserStudent {

    static setUser({name, userName, email, password}) {
<<<<<<< HEAD
        let formData = new FormData()
=======
        var formData = new FormData()
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
        formData.append("email_usuario",email)
        formData.append("senha_usuario:", password)
        formData.append("nick_usuario", userName)
        formData.append("descricao_usuario", name)
        
<<<<<<< HEAD
        let options = {
=======
        var options = {
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
            method: 'POST',
            body:formData
        }

        fetch('http://127.0.0.1:82/usuario', options)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
}