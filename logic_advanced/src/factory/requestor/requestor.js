import LocalStorage from '../../factory/storage/index';
export  class Requestor{

    constructor(){
        this.baseURL = `http://127.0.0.1:82`;
        this.dataUserLogged = LocalStorage.getStorage();
    }

    getHeaders(){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `${this.dataUserLogged.token}`);
        return myHeaders;
    }

    get(urlG){
        let options = {
            method: 'GET',
            headers: this.getHeaders(),
        }
        return fetch(`${this.baseURL}/${urlG}`,options);
    }

    post(urlP,formData){
        let options = {
            method: "POST",
            headers: this.getHeaders(),
            body:formData
        }       

        return fetch(`${this.baseURL}/${urlP}`, options)
    }

    delete(urlD){
        let options = {
            method: 'DELETE',
            headers: this.getHeaders(),
        }

        return fetch(`${this.baseURL}/${urlD}`,options);
    }
}