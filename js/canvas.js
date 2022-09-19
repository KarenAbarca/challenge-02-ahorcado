var canvas = document.querySelector("canvas"); 
var pincel = canvas.getContext("2d");

function inicializarCanvas(){
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    pincel.fillStyle = "white";
    pincel.fillRect(0,0,canvas.width, canvas.height)
}

function dibujarLineas(){
    var numLetras = palabraSecreta.length;
    anchura = ((canvas.width * .8) / numLetras) ; //Las líneas van a ocupar el 80% del espacio del canvas
    espacio = (canvas.width* .2) / (numLetras-1); //Los espacios van a ocupar el 20% del espacio del canvas
    
    pincel.strokeStyle = "purple";
    
    var posicionX = 0;
    for(var i = 0; i < (numLetras*2); i= i+2){
        pincel.beginPath();    
        pincel.moveTo(posicionX, canvas.height - 10);
        pincel.lineTo(posicionX + anchura, canvas.height - 10);
        pincel.stroke();
        
        posicionX = posicionX + anchura + espacio;
    }
    
}