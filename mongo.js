var MongoClient = require('mongodb').MongoClient;
var Server=require('mongodb').Server;
var config=require("../config.json")
var ObjectId=require("mongodb").ObjectId 



var query=async function(query,collection){
    var mongoclient = new MongoClient(new Server(config.MONGO_HOST, config.MONGO_PORT))
    return new Promise((resolve,reject)=>{
        return mongoclient.connect(function(err,mongoclient){
            if(err){
                console.log(err)
                reject("error occured in opening connecting to MongoDb");
            }else{
               var option={_id:0};
               return   mongoclient.db(config.DATABASE).collection(collection).find(query,option).toArray(function(err,result){
                   if(err){
                       reject("error occured in querying")
                   }
                    console.log(result)
                    resolve(result)
                })
            }
        })
    })
    
}

var update=async function(query,collection,newvalues){
    var mongoclient = new MongoClient(new Server(config.MONGO_HOST, config.MONGO_PORT))
    return new Promise((resolve,reject)=>{
        return mongoclient.connect(function(err,mongoclient){
            if(err){
                console.log(err)
                reject("error occured in opening connectionto MOngoDb");

            }else{
                var newValuesformat={$set:newvalues}
                // console.log(newValuesformat)
                return mongoclient.db(config.DATABASE).collection(collection).updateOne(query,newValuesformat,{upsert:true},function(err,result){
                    if(err){
                        console.log(err)
                        reject("error occured in opening connectionto MOngoDb");
        
                    }else{
                        // console.log(result);
                        resolve(result)
                    }
                   
                })
            }
        })
    })
}


var insertOne =async function(collection,item){
    var mongoclient = new MongoClient(new Server(config.MONGO_HOST, config.MONGO_PORT))
    return new Promise((resolve,reject)=>{
        return mongoclient.connect(function(err,mongoclient){
            if(err){
                console.log(err)
                reject("error occured in opening connectionto MOngoDb");

            }else{
                return mongoclient.db(config.DATABASE).collection(collection).insertOne(item,function(err,result){
                    if(err){
                        console.log(err)
                        reject("error occured in opening connectionto MOngoDb");
                    }else{
                        resolve("OK")
                    }
                })
            }
        })
    })
}
var querySpecificFields=async function(query,fields,collection){
    var mongoclient = new MongoClient(new Server(config.MONGO_HOST, config.MONGO_PORT))
    return new Promise((resolve,reject)=>{
        return mongoclient.connect(function(err,mongoclient){
            if(err){
                console.log(err)
                reject("error occured in opening connecting to MongoDb");
            }else{
               var option={_id:0};
               return   mongoclient.db(config.DATABASE).collection(collection).find(query,option).project(fields).toArray(function(err,result){
                   if(err){
                       reject("error occured in querying")
                   }
                    console.log("query Complete")
                    resolve(result)
                })
            }
        })
    })
    
}


// exports.customdockingStationUpdate=customdockingStationUpdate
exports.querySpecificFields=querySpecificFields;
exports.query=query;
exports.update=update;
exports.insertOne=insertOne;
//query({muid:"02f40d82f1ccd52f9b08e94449f03006"},config.collections.userData).then(message=>{console.log("mesage"+message)}).catch(function(err){console.log("error occured")});

//var newvalues={$set:{status:"active"}}

//update({muid:"02f40d82f1ccd52f9b08e94449f03006"},config.collections.userData,newvalues).then(message=>{console.log("mesage"+JSON.stringify(message.result))}).catch(function(err){console.log("error occured")});