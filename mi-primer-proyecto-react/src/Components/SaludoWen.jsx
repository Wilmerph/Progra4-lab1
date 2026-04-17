import { useState, useEffect } from 'react';
import './SaludoWen.css';

export default function Saludo() {

    // declaramos estados
    const [phrase, setPhrase] = useState([]);
    const [randomNumber, setRandomNumber] = useState(0);

    // cargamos la frase motivacional al iniciar el componente
   const motivacion=useEffect(() => {
        const fetchPhrase = async () => {
            try {
                const response = await fetch('https://www.positive-api.online/phrases/esp');
                const data = await response.json();

                setPhrase(data);
               
            } catch (error) {
                console.error('Error fetching phrase:', error);
            } finally {
                const randomIndex = Math.floor(Math.random() * 40);
                setRandomNumber(randomIndex);
            }
        };

        fetchPhrase();
    }, []);

  

    //3 renderizamos la frase motivacional
    return (
        <div>
            <h1>hola clase</h1>
            <p>{phrase[randomNumber]?.text || 'Cargando...'}</p>
            <button onClick={() => {
                const randomIndex = Math.floor(Math.random() * 40);
                setRandomNumber(randomIndex);
            }}>
                Cambiar frase
            </button>

        </div>
    )
}