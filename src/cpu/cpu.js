export default class CPU{


    // recibe como parametros el arreglo general de casillas, y busca las disponibles

    getCasillasDisponibles(generalGame){
        let arrayLibres = [];
        for (let index = 0; index < 9; index++) {
            if(!generalGame.includes(index.toString())){
                arrayLibres.push(index.toString());
            }
        }

        let casillaEscoger = arrayLibres[this.getRandomNumber(0 , arrayLibres.length - 1)];
        console.log("mejor posibilidad arrojada : " + arrayLibres);
        return casillaEscoger;
    }


    // obtiene un numero al azar a partir de 2 numeros
    getRandomNumber(min, max) {
        // Genera un número aleatorio entre 0 (inclusive) y 1 (exclusivo)
        const randomNumber = Math.random();
      
        // Escala el número al rango deseado
        const scaledNumber = randomNumber * (max - min + 1);
      
        // Redondea hacia abajo para obtener un número entero dentro del rango
        const result = Math.floor(scaledNumber) + min;
      
        return result;
    }
    
}