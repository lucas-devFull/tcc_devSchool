export default class Modulos {
    static getHeaders(token){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `${token}`);
        return myHeaders;
    }

    static getModulos(token, id = false){
        let url = `http://127.0.0.1:82/modulos${(id === false) ? '' : `?id_modulo=${id}`}`;
        let options = {
            method: 'GET',
            headers: this.getHeaders(token),
        }
        return fetch(url, options);
    }

    static setModulo(token, dados=false){
        let formData = new FormData();
        if(dados['id_modulo'] !== false && dados['id_modulo'] !== false){
            formData.append("id_modulo", dados['id_modulo']);
        }

        formData.append("descricao_modulo", dados['modulo']);
        formData.append("id_materia",dados['materia']);
        formData.append("modulo_inicial",dados['modulo_inicial']);

        let options = {
            method: (dados['id_modulo'] !== false && dados['id_modulo'] !== false) ? "PUT" : 'POST',
            headers:  this.getHeaders(token),

        }
        console.log(options);
        // return fetch("http://127.0.0.1:82/modulos", options);

    }

    static deleteModulo(token, id=false){
        let options = {
            method: 'DELETE',
            headers: this.getHeaders(token),
        }
        return fetch("http://127.0.0.1:82/modulos?id_modulo="+id, options);
    }

}