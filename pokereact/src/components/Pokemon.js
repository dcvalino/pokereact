import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Pokemon = (props) => {

    const [nombre, setNombre] = useState("")
    const [imgFromUrl, setimgFromUrl] = useState()
    const [imgBackUrl, setimgBackUrl] = useState()
    const [basehp, setbasehp] = useState()
    const [baseAttack, setBaseAttack] = useState()
    const [baseDefense, setBaseDefense] = useState()

    const params = useParams();

    useEffect(()=>{
   //La sintaxis mas moderna es async await
   axios.get("https://pokeapi.co/api/v2/pokemon/" + ID)
   .then(response => {
       setNombre(response.data.name)
       setimgBackUrl(response.data.sprites.back_default);
       setimgFromUrl(response.data.sprites.front_default);
       setbasehp(getStats("hp", response.data.stats));
       setBaseAttack(getStats("attack", response.data.stats));
       setBaseDefense(getStats("defense", response.data.stats));
   })
    },[])

    function getStats(nombreStat, arrayStats) {
        const filteredArray = arrayStats.filter(s => s.stat.name === nombreStat);
        if (filteredArray.length === 0) {
            return -1;
        }
        return filteredArray[0].base_stat;
    }

    const ID = params.id;
 

    const [nivel, setNivel] = useState(1)
    const onSubirNivel = (event) => {
        setNivel(x => x+1)
    }
    
    const onBajarNivel = (event) => {
        setNivel(x => x-1)
    }
    const calcularHp = () =>{
        return basehp + (nivel * 3)
    }
    const calcularAtaque = () =>{
        return baseAttack + (nivel * 2)
    }
    const calcularDefensa = () =>{
        return baseDefense + (nivel * 2)
    }
    
    return <div>
            <img src={imgFromUrl}/>
            <img src={imgBackUrl}/>
            <h1> {nombre}</h1>
            <h2>Nivel:{nivel} </h2>
            <button onClick={onSubirNivel}>Subir nivel</button>
            <button onClick={onBajarNivel}>Bajar nivel</button>
            <p>HP: {calcularHp()} </p>
            <p>Ataque: {calcularAtaque()}</p>
            <p>Defensa: {calcularDefensa()}</p>
    </div>
}

export default Pokemon