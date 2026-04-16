import React, { useState, useEffect } from 'react';
import './Saludo.css';

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
                if (data.length > 0) {
                    setRandomNumber(Math.floor(Math.random() * data.length));
                }
            } catch (error) {
                console.error('Error fetching phrase:', error);
            } finally {
                const randomIndex = Math.floor(Math.random() * 40);
                setRandomNumber(randomIndex);
            }
        };

        fetchPhrase();
    }, []);

    const cambiarFrase = () => {
        if (phrase.length === 0) return;
        setRandomNumber(Math.floor(Math.random() * phrase.length));
    };

    //3 renderizamos la frase motivacional
    return (
        <div>
            <h1>Hola amigos</h1>
            <p>{phrase[randomNumber]?.text || 'Cargando...'}</p>
            <button onClick={cambiarFrase}>Cambiar frase</button>
        </div>
    )
}