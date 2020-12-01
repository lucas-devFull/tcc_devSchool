import { Requestor } from '../../factory/requestor/requestor';
import LocalStorage from '../../factory/storage/index';
export default class DashStorage{
 
    static getMaterias(){
        const dataUser = LocalStorage.getStorage();
        return new Promise((resolve, reject) =>
            new Requestor().get(`materias?id_usuario=${dataUser.id}&tipo_usuario=${dataUser.tipo}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error)));
    }

    static getModulos (){
        return new Promise((resolve, reject) =>
            new Requestor().get('modulos')
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error)));
    }
}