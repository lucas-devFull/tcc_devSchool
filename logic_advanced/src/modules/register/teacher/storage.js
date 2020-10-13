export default class RegisterUserTeacher{

<<<<<<< HEAD
    static setUser({name, userName, email, password, token}) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `${token}`);


        let formData = new FormData()
        formData.append("descricao_usuario", name)
        formData.append("email_usuario",email)
        formData.append("senha_usuario", password)
        formData.append("nick_usuario", userName)
        
        let options = {
            method: 'POST',
            headers: myHeaders,
            body:formData
        }

        fetch('http://127.0.0.1:82/professor', options)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    static getUser(token){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `${token}`);

        let options = {
            method: 'GET',
            headers: myHeaders,
        }
        return fetch("http://127.0.0.1:82/professor",options);        
=======
    static setUser({name, userName, email, password}) {
        var formData = new FormData()
        formData.append("email_usuario",email)
        formData.append("senha:", password)
        formData.append("descricao_usuario", name)
        
        var options = {
            method: 'POST',
            body:formData
        }

        // console.log(formData);

        // fetch('http://127.0.0.1:82/usuario', options)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
    }
}