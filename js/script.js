var anchura, espacio, palabraSecreta, idx;
const arregloPalabras = ['MANZANA', 'CAZUELA', 'ARCOIRIS', 'ESTRELLA', 'ARMONIA', 
                       'BANDERA', 'ABRAZO', 'POETA', 'COSTAS', 'CUERVO', 
                       'CUPIDO', 'SASTRE', 'MONEDA', 'ANILLOS', 'DOMINGO', 
                       'HERMOSA', 'VALIENTE', 'INVIERNO', 'SALUDO', 'CABEZA'];
var teclasPresionadas = [];
var letrasCorrectas=0, errores = 0;

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
    dibujarLineas(palabraSecreta);   
    document.addEventListener('keypress', teclaPresionada);
    
    
    var teclasMoviles = document.querySelectorAll(".tecla");
    for(var i = 0 ; i<teclasMoviles.length ; i++){
        teclasMoviles[i].addEventListener("click", teclaMovilPresionada);    
    }
}

    
function teclaPresionada(event) {
    console.log('presionada');
    var esLetra = verificarLetra(event);  
    var caracter = (event.key).toUpperCase(); //Se transforma la letra en mayuscula
    var repetida = teclasPresionadas.includes(caracter);
    
    //No ha sido presionada y es una letra
    if(!repetida && esLetra){

        controladorJuego(caracter);
    }
    
}

function teclaMovilPresionada(){
    controladorJuego(this.value);
    //console.log(teclasMoviles);
}

function controladorJuego(caracter) {

    teclasPresionadas.push(caracter); //Se ingresa en las presionadas

    var indices = existeLetra(caracter); //Se recuperan los indices de la letra presionada

    //No existe la letra
    if(indices.length == 0){
        errores++;

        dibujarMunieco(errores); //Dibujar ahorcado

        dibujarEquivocadas(caracter, errores); //Dibujar letras equivocadas
    }

    //Existe letra en la palabra Secreta, se dibuja sobre la línea correspondiente
    for(var i = 0 ; i < indices.length ; i++){
        dibujarLetras(indices[i]);
        letrasCorrectas++;
        console.log(letrasCorrectas + " de " + palabraSecreta.length);
    }
        
    //El usuario ha atinado todas las letras, fin del juego y mensaje victorioso
    if(letrasCorrectas == palabraSecreta.length){
        setTimeout(mostrarGanaste, 500);
        console.log('ganaste');
        document.removeEventListener('keypress', teclaPresionada);
    }

    //El usuario ha agotado sus intentos
    if(errores == 7){
        setTimeout(mostrarFin, 500); 
        document.removeEventListener('keypress', teclaPresionada);
    }
    
}

function sortearPalabra(){
    let arregloLocal = localStorage.getItem('palabras');
    var palabras = arregloLocal.split(',');
    var numeroPalabras = palabras.length;
    
    var aleatorio = Math.round(Math.random() * numeroPalabras);
    
    var palabraSecreta = palabras[aleatorio];
    return palabraSecreta;
}

function verificarLetra(tecla){
    
    var caracter = (tecla.key).toUpperCase();
    var valorAscii = caracter.charCodeAt(caracter);

    if(valorAscii >= 65 && valorAscii <=90){
        return true;
    }
}

function existeLetra(caracter){
    var indices = [];
    var letras = palabraSecreta.split('');
    var idx = letras.indexOf(caracter);
    while (idx != -1) {
        indices.push(idx);
        idx = letras.indexOf(caracter, idx + 1);  
    }  
    return indices;
}