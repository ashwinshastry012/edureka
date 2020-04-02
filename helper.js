var random=function(){
    return new Promise(resolve,reject=>{
        resolve(Math.floor(Math.random() * Math.floor(5)))
    })
}

exports.random=random
