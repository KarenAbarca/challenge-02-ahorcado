var btnJugar = document.querySelector("#btnJugar");
const arregloPalabras = ['MANZANA', 'CAZUELA', 'ARCOIRIS', 'ESTRELLA', 'ARMONIA', 
                       'BANDERA', 'ABRAZO', 'POETA', 'COSTAS', 'CUERVO', 
                       'CUPIDO', 'SASTRE', 'MONEDA', 'ANILLOS', 'DOMINGO', 
                       'HERMOSA', 'VALIENTE', 'INVIERNO', 'SALUDO', 'CABEZA'];

//Regex sólo máyusculas (sin acentos y caracteres especiales)
var caracteresProhibidos= /([^A-Z]{1,8})/g;


//Almacenando arreglo en local storage
if(!localStorage.getItem('palabras')){
    localStorage.setItem('palabras', arregloPalabras);
}

function jugar(){
    window.open("jugar.html", "_self");
    
    var palabraSecreta = seleccionarPalabra();
}

function abrirPalabra(){
    window.open("nueva-palabra.html","_self");
}

function seleccionarPalabra(){
    let arregloLocal = localStorage.getItem('palabras');
    var palabras = arregloLocal.split(',');
    var numeroPalabras = palabras.length;
    var aleatorio = Math.round(Math.random * numeroPalabras);
    
    console.log(aleatorio);
}

function guardarPalabra(){
    var inputPalabra = document.querySelector("#input-palabra");
    var palabra = inputPalabra.value.toUpperCase();
    
    if(validarPalabra(palabra)){
        let arregloLocal = localStorage.getItem('palabras');
        var nuevoArreglo = arregloLocal.split(',');
        
        //Verificar si la palabra ya existe en el arreglo
        if(nuevoArreglo.includes(palabra)){
           alert('La palabra ya existe, por favor intente con una nueva palabra');
        }
        else{
            nuevoArreglo.push(palabra);
            localStorage.setItem('palabras', nuevoArreglo);
            jugar();
        }   
    }
}

//Función que válida que sólo se introduzcan caracteres válidos
function validarPalabra(palabra){

    if(palabra.match(caracteresProhibidos) || palabra.length > 8 || palabra.length < 8){ //El texto a encriptar/desencriptar contiene algún caracter no permitido
        alert('Se deben introducir máximo 8 letras mayúsculas sin acentos o cáracteres especiales');
        return false;
    }
    else{
        return true;
    }
}

function cancelar(){
    window.open("index.html","_self");
}