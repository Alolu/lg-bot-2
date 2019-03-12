import DataObject from "components/dataobject"

export default class PlayerObject extends DataObject {
    constructor(){
        super('rpgdb');
    }
    //! Le this marche pas ???? -> Ca casse la promesse
    insertPlayer(player){
        return new Promise((resolve,reject) => {
            this.getDb().insert(player,(err,res) => {
                resolve(res)
                reject(err)
            })
        })
    }

    getPlayer(id){
        return new Promise((resolve,reject) => {
            this.getDb().findOne({_id: id},(err,res) => {
                resolve(res)
                reject(err)
            })
        })
    }

    getPlayers(){
        return Promise(resolve => {
            this.getDb().find({},(err,res)=>{
                resolve(res);
            })
        })
    }
    
    updatePlayer(_id,fields,data,options){
        return Promise(resolve => {
            this.getDb().update(fields,data,options,(err,res) => {
                resolve(res);
            })
        })
    }

    deletePlayer(id){
        return Promise(resolve => {
            this.getDb().remove({_id:id},(err,res) => {
                resolve(res);
            })
        })
    }
}