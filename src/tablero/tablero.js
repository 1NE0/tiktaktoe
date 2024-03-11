import { AOS } from 'aos';
import './tablero.css';
import React, { useEffect, useState } from 'react';
import Item from '../items/item';
import CPU from '../cpu/cpu';
import Swal from 'sweetalert2'


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
    const cpu = new CPU();

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
            
            let terminado = verifyWinner();

            if(!terminado){
                setTurno("cpu");
            }
            
        }
    }


    function cpuIAnivel1(){
        // le toca a la IA
        let casillaEscoger = cpu.getCasillasDisponibles(generalGame);
        console.log("la cpu escogió : " + casillaEscoger);

        if(casillaEscoger != null){
            setGeneralGame(prevGeneralGame => [...prevGeneralGame, casillaEscoger.toString()]);
            setCpuSelection([...cpuSelections, casillaEscoger.toString()]);
        }

        let terminado = verifyWinner();
        if(!terminado){
            setTurno("usuario");
        }
        
    }

    useEffect(() => {
        let terminado = verifyWinner();
    
        if (terminado) {
            resetGame();
        } else if (turno === "cpu") {
            setTimeout(() => {
                cpuIAnivel1();
            }, 2000);
        }
    }, [userSelections, cpuSelections]);
    
    function resetGame() {
        setTurno("usuario");
        setGeneralGame([]);
        setuserSelections([]);
        setCpuSelection([]);
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
        for (let posibilidad of posibilidades) {
            if (userSelections.includes(posibilidad[0].toString()) && userSelections.includes(posibilidad[1].toString()) && userSelections.includes(posibilidad[2].toString())) {
                console.log("GANADOR");
                Swal.fire({
                    title: "Ganaste",
                    text: "Usuario ganó",
                    imageUrl: "https://i.gifer.com/origin/bc/bc3224bc22ba8fb450c637acbaa82c6e.gif",
                    imageWidth: 500,
                    imageHeight: 500,
                    imageAlt: "Custom image"
                  });

                
                return true;
            }

            if (cpuSelections.includes(posibilidad[0].toString()) && cpuSelections.includes(posibilidad[1].toString()) && cpuSelections.includes(posibilidad[2].toString())) {
                console.log("GANADOR");
                Swal.fire({
                    title: "La cpu ganó",
                    text: "Suerte a la próxima, idiota",
                    imageUrl: "https://media1.tenor.com/m/XnpSGG328o8AAAAC/spongebob.gif",
                    imageWidth: 500,
                    imageHeight: 500,
                    imageAlt: "Custom image"
                  });

                return true;
            }



        }

        return false;
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