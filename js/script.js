var anchura, espacio, palabraSecreta;
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

/*Funciones Abrir*/
function abrirJugar(){
    window.open('jugar.html', '_self');
    
    iniciarJuego();
}

function abrirNvaPalabra(){
    window.open('nueva-palabra.html', '_self');
}

function abrirIndex(){
    window.open('index.html', '_self');
}


/*Funciones Nueva Palabra*/
function agregarPalabra(){
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
            abrirJugar();
        }   
    }
}

function validarPalabra(palabra){

    if(palabra.match(caracteresProhibidos) || palabra.length > 8 || palabra.length < 1){ //El texto a encriptar/desencriptar contiene algún caracter no permitido
        alert('Se deben introducir máximo 8 letras mayúsculas sin acentos o cáracteres especiales');
        return false;
    }
    else{
        return true;
    }
}


/*Funciones Juego*/
function iniciarJuego(){
    
    palabraSecreta = sortearPalabra();
    
    inicializarCanvas();
    dibujarLineas();
    
    window.addEventListener('keypress', verificarLetra)

}

function sortearPalabra(){
    let arregloLocal = localStorage.getItem('palabras');
    var palabras = arregloLocal.split(',');
    var numeroPalabras = palabras.length;
    
    var aleatorio = Math.round(Math.random() * numeroPalabras);
    
    var palabraSecreta = palabras[aleatorio];
    return palabraSecreta;
}

function dibujarLetras(indice){
    
    pincel.fillStyle = "purple";
    pincel.font="40px Montserrat";
    pincel.textAlign = 'center';
    pincel.fillText(palabraSecreta[indice], (anchura*indice) + (espacio*indice)+(anchura/2), canvas.height - 15, anchura);

}

function verificarLetra(tecla){
    
    var caracter = (tecla.key).toUpperCase();
    var valorAscii = caracter.charCodeAt(caracter);

    if(valorAscii >= 65 && valorAscii <=90){
        existeLetra(caracter);
        return true;
    }
}

function existeLetra(caracter){
    console.log(palabraSecreta);
    var indices = [];
    var letrasPalabra = palabraSecreta.split('');
    var idx = letrasPalabra.indexOf(caracter);
    
    if(idx == -1){
       console.log('la letra no existe');
        return false;
    }
    
    while (idx != -1) {
        console.log(idx);
        dibujarLetras(idx);
        indices.push(idx);
        idx = letrasPalabra.indexOf(caracter, idx + 1);
    }
}