var canvas = document.querySelector("canvas"); 
var pincel = canvas.getContext("2d");

function inicializarCanvas(){
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function dibujarLineas(palabraSecreta){
    var numLetras = palabraSecreta.length;
    anchura = ((canvas.width * .8) / numLetras) ; //Las líneas van a ocupar el 80% del espacio del canvas
    espacio = (canvas.width* .2) / (numLetras-1); //Los espacios van a ocupar el 20% del espacio del canvas
    
    pincel.strokeStyle = "purple";
    
    var posicionX = 0;
    for(var i = 0; i < (numLetras*2); i= i+2){
        pincel.beginPath();    
        pincel.moveTo(posicionX, canvas.height - 55);
        pincel.lineTo(posicionX + anchura, canvas.height - 55);
        pincel.stroke();
        
        posicionX = posicionX + anchura + espacio;
    }
    
}

function dibujarLetras(indice){
    imprimir(palabraSecreta[indice], (anchura*indice) + (espacio*indice)+(anchura/2), canvas.height - 60, "purple");
}

function dibujarEquivocadas(caracter, errores){
    console.log(caracter);
    var anchura = canvas.width / 11;
    imprimir(caracter, anchura*(errores+1), canvas.height - 10, "black");
}

function dibujarMunieco(errores){

    switch(errores){
        case 1: //Primer error se dibuja la horca
            
            //Línea inferior
            pincel.strokeStyle = "black";
            pincel.beginPath();    
            pincel.moveTo((canvas.width/ 2)-150, canvas.height - 120);
            pincel.lineTo((canvas.width/ 2)+150, canvas.height - 120);
            pincel.stroke();
            
            //Línea vertical grande
            pincel.beginPath();    
            pincel.moveTo((canvas.width/ 2)-100, 20);
            pincel.lineTo((canvas.width/ 2)-100, canvas.height - 120);
            pincel.stroke();
            
            //Línea horizontal superior
            pincel.beginPath();    
            pincel.moveTo((canvas.width/ 2)-100, 20);
            pincel.lineTo((canvas.width/ 2)+60, 20);
            pincel.stroke();

            //Línea cuerda
            pincel.beginPath();    
            pincel.moveTo((canvas.width/ 2)+60, 20);
            pincel.lineTo((canvas.width/ 2)+60, 40);
            pincel.stroke();
            
            break;
            
        case 2:
            //Cabeza
            pincel.fillStyle = "black";
            pincel.beginPath(); 
            pincel.arc((canvas.width/ 2)+60,70,30,0,2*Math.PI);
            pincel.stroke();
            break;
            
        case 3:
            //Cuerpo
            pincel.beginPath();    
            pincel.moveTo((canvas.width/ 2)+60, 100);
            pincel.lineTo((canvas.width/ 2)+60, canvas.height - 200);
            pincel.stroke();
            break;
            
        case 4:
            //Mano derecha
            pincel.beginPath();    
            pincel.moveTo((canvas.width/ 2)+60, 100);
            pincel.lineTo((canvas.width/ 2)+30, 140);
            pincel.stroke();
            break;
        
        case 5:
            //Mano izquierda
            pincel.beginPath();    
            pincel.moveTo((canvas.width/ 2)+60, 100);
            pincel.lineTo((canvas.width/ 2)+90, 140);
            pincel.stroke();   
            break;
            
        case 6:
            //Pie derecho
            pincel.beginPath();    
            pincel.moveTo((canvas.width/ 2)+60, canvas.height - 200);
            pincel.lineTo((canvas.width/ 2)+30, canvas.height - 160);
            pincel.stroke();
            break;
        
        default:
            //Pie izquierdo
            pincel.beginPath();    
            pincel.moveTo((canvas.width/ 2)+60, canvas.height - 200);
            pincel.lineTo((canvas.width/ 2)+90, canvas.height - 160);
            pincel.stroke(); 
            break;
    }  
    
}

function imprimir(mensaje, x, y, color){
    pincel.fillStyle = color;
    pincel.font="40px Montserrat";
    pincel.textAlign = 'center';
    pincel.fillText(mensaje, x, y);
}

function mostrarGanaste(){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    imprimir("¡FELICIDADES!", canvas.width/2, canvas.height/2, "purple");
    imprimir("¡GANASTE!", canvas.width/2, (canvas.height/2)+50, "purple");
    console.log('ganaste');
}

function mostrarFin(){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    imprimir("¡Fin del juego!", canvas.width/2, canvas.height/2-50, "purple");
    imprimir("La palabra era", canvas.width/2, (canvas.height/2), "purple");
    imprimir(palabraSecreta, canvas.width/2, (canvas.height/2)+50, "purple");
}