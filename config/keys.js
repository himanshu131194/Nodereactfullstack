if(process.env.NODE_ENV === "production"){
   //PRODUCTION ENVIOUMENT
   module.exports = require('./prod');
}else{
   //DEVELOPMENT ENVIOURMENT
   module.exports = require('./dev');
}
