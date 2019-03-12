import Datastore from "nedb";

export default class DataObject {
    constructor(dbname){
        this.db = new Datastore({filename: "db/"+dbname+".db",autoload: true})
    }
    getDb(){
        return this.db;
    }
}