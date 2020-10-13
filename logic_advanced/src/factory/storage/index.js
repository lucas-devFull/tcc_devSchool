export default class LocalStorage{

    static setStorage(data){
        localStorage.setItem(btoa('statusUser'), btoa(data.status));
        localStorage.setItem(btoa('dataUser'), btoa(JSON.stringify((data.dados))));
    }

<<<<<<< HEAD
    static getStorage(){
        let aux = atob(localStorage.getItem(btoa('dataUser')));     
=======
    static getStorage(key){
        let aux = atob(localStorage.getItem(btoa(key)));     
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
        return JSON.parse(aux);
    }
    
    static clearStorage(){
        localStorage.clear();
    }    
}
