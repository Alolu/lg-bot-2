import Datastore from "nedb";

export default class DataObject {
    constructor(dbname){
        const db = new Datastore({filename: "db/"+dbname,autoload: true})
    }
    getDb(){
        return this.db;
    }
}