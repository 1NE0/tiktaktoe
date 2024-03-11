import { AOS } from 'aos';
import './tablero.css';
import React, { useEffect, useState } from 'react';
import Item from '../items/item';


export default function Tablero() {

    

    let posibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2],
    ]
    const [turno, setTurno] = useState("usuario"); // usuario o cpu
    const [generalGame, setGeneralGame] = useState([]);
    const [userSelections, setuserSelections] = useState([]);
    const [cpuSelections, setCpuSelection] = useState([]);


    function handleClick(e) {
        const id = e.target.id;
        
        // verificar si ha sido clickeada antes
        if(generalGame.includes(id.toString())){
            return 0;
        }
        // poner la accion dependiendo el turno
        if(turno === "usuario"){
            console.log("click correcto turno usuario");
            // agregar al arreglo del usuario
            setuserSelections([...userSelections, id]);
            setGeneralGame(prevGeneralGame => [...prevGeneralGame, id]);
            // cambiar turno
            setTurno("cpu");
            //cpuIAnivel1();
        }
    }


    function cpuIAnivel1(){
        // le toca a la IA
        let arrayLibres = [];
        for (let index = 0; index < 9; index++) {
            if(!generalGame.includes(index.toString())){
                arrayLibres.push(index.toString());
            }
        }

        let casillaEscoger = arrayLibres[getRandomNumber(0 , arrayLibres.length - 1)];
        console.log("la cpu escogió : " + casillaEscoger);
        console.log("mejor posibilidad arrojada : " + arrayLibres);


        if(casillaEscoger != null){
            setGeneralGame(prevGeneralGame => [...prevGeneralGame, casillaEscoger.toString()]);
            setCpuSelection([...cpuSelections, casillaEscoger.toString()]);
        }
        
        setTurno("usuario");
    }

    useEffect(() => {
        verifyWinner();

        if (turno === "cpu") {
            setTimeout(() => {
                cpuIAnivel1();
            }, 2000);
        }

    }, [userSelections, cpuSelections, turno]);

    
    function getRandomNumber(min, max) {
        // Genera un número aleatorio entre 0 (inclusive) y 1 (exclusivo)
        const randomNumber = Math.random();
      
        // Escala el número al rango deseado
        const scaledNumber = randomNumber * (max - min + 1);
      
        // Redondea hacia abajo para obtener un número entero dentro del rango
        const result = Math.floor(scaledNumber) + min;
      
        return result;
    }


    function Initialize() {
        return (
            <>
                {[...Array(9)].map((_, i) => (
                  <div
                  id={i}
                  key={i + " padre"}
                  className="item"
                  onClick={handleClick}
                >

                    {userSelections.includes(i.toString()) && <Item owner="user"/>}
                    {cpuSelections.includes(i.toString()) && <Item owner="cpu"/>}
                </div>
                ))}
            </>
          );
    }
    
    function verifyWinner() {
        posibilidades.forEach((posibilidad) => {
            if (userSelections.includes(posibilidad[0].toString()) && userSelections.includes(posibilidad[1].toString()) && userSelections.includes(posibilidad[2].toString())) {
                console.log("GANADOR");
            }
        })
    }


    return (
        <div className='container-middle'>
            <div>
                <h1>Turno:  {turno}</h1>
            </div>
            <div className="tablero_main">
                <Initialize />
            </div>
        </div>
    )
}


//export default [Tablero, Initialize];