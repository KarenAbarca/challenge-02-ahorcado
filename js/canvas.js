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

function dibujarLineas(palabraSecreta){
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

function dibujarLetras(indice){
    
    pincel.fillStyle = "purple";
    pincel.font="40px Montserrat";
    pincel.textAlign = 'center';
    pincel.fillText(palabraSecreta[indice], (anchura*indice) + (espacio*indice)+(anchura/2), canvas.height - 15, anchura);

}


function mostrarGanaste(){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillStyle = "purple";
    pincel.font="40px Montserrat";
    pincel.textAlign = 'center';
    pincel.fillText("¡FELICIDADES!", canvas.width/2, canvas.height/2);
    pincel.fillText("¡GANASTE!", canvas.width/2, (canvas.height/2)+50);
}

function mostrarFin(palabraSecreta){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillStyle = "purple";
    pincel.font="40px Montserrat";
    pincel.textAlign = 'center';
    pincel.fillText("¡Fin del juego!", canvas.width/2, canvas.height/2-50);
    pincel.fillText("La palabra era", canvas.width/2, (canvas.height/2));
    pincel.fillText(palabraSecreta, canvas.width/2, (canvas.height/2)+50);
}