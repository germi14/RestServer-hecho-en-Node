//Esta funcion es llamada cuando quiero subir un archivo, ya sea una foto o un documento, por ejemplo.
const path = require('path');
var i= 0;
const subirArchivo = (  files, extensionesPermitidas= ['PNG','JPG','JPEG','GIF','TXT','PDF'], carpetaDeArchivos='', modelo ) => {

    return new Promise( (resolve, reject)=> {

        if(!files){
            return reject(`Debe adjuntar un archivo`)
        }

        const { archivo } = files // Este archivo viene de la requeste.files 

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1].toUpperCase();

        //Validar extension
        
        if(!extensionesPermitidas.includes(extension) && !extensionesPermitidas.includes(extension.toLowerCase())){
            return reject(`La extension ${extension} no es permitida, las extensiones permitidas son ${extensionesPermitidas}`)
        }

        const nombreNuevo=nombreCortado.shift();
        if(modelo===`${nombreNuevo}.${i}.${extension}`){ // Aqui comparo el modelo, que viene como argumento de la la funcion principal subirArchivo y que trae el nombre anterior guardado, aqui lo comparo con el nombre del archivo que se esta subiendo, y si son iguales incremento la variable sino la reinicio, de esta manera los archivos se guardan con nombre archivo1.0 archivo1.1 archivo1.3 archvio2.1 archivo2.2 archivo2.3 etc
            i+=1}else{
                i=0}
        const nombreTemp = `${nombreNuevo}.${i}.${extension}`;
      
        const uploadPath = path.join(__dirname, '../uploads/', carpetaDeArchivos, nombreTemp); // Aqui construyo el path a donde quiero colocar el archivo, con el join uno estos pedazos de path, por decir algo
      
        archivo.mv(uploadPath, (err) => { // Este es el metodo para mover el archivo, me pide el path que defini antes a donde se va a colocar el archivo
          if (err) {
            reject(err);
        }
      
          resolve(nombreTemp);
        });


    } );

}

module.exports = {
    subirArchivo
}