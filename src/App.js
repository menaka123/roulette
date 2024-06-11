import './App.css'

import Roulette from "./components/Roulette";
import {useEffect, useState} from "react";
import axios from "axios";
import SpinButton from "./components/SpinButton";
import FooterLogo from "./logo_leomotor_con_fondo.png";
import Background from './fondo_con_blanco_acoplado.png'
import PopupForm from "./components/PopupForm/PopupForm";

import PenImage from './boli_regalo.png'
import BagImage from './bolsa_regalo.png'
import SurprizeImage from './regalo_sorpresa.png'

const prizeList = {
  "mochila": { option: 2, image: BagImage },
  "boli": { option: 1, image: PenImage },
  "sorpresa": { option: 0, image: SurprizeImage },
}

function App() {
  const [result, setResult] = useState(0);
  const [mustSpin, setMustSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [prize, setPrize] = useState(null);
  const [finish, setFinish] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSpin = async () => {
    if (prize) {
      setMustSpin(true)
    }
  };

  const afterSpin = () => {
    setTimeout(() => {
      setFinish(true)
    }, 1000);
  }

  const sendData = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post('https://dev-api.academons.com/ruleta', {
        name: data.name,
        email: data.email,
        telefono: data.phone,
        coche: data.carYear,
        pensando: data.changeCar
      });
      if (response.data.errno === 0) {
        setPrize(response.data.premio)
        setOpen(false)
        setResult(prizeList[response.data.premio].option)
      } else {
        alert("You are already registered!")
      }
    } catch (error) {
      console.error('Error fetching spin result:', error);
    }
    setLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div style={{ backgroundImage: `url(${Background})`}} className="app">
      <div className={'content'}>
        {
          finish ?
            <>
              <h1>¡Enhorabuena!</h1>
              <span style={{fontSize: 22, marginBottom: 30, fontWeight: '500', maxWidth: 300, textAlign: 'center'}}>Has conseguido una ${prize} del Centenario</span>
              {
                prize && <img style={{maxWidth: '70%', marginBottom: 50}} src={prizeList[prize].image} alt={'prize'}/>
              }
              <div style={{ maxWidth: 250, fontWeight: '500', textAlign: 'center', fontSize: 18 }}>
                Muestra esta imagen a un miembro de nuestro equipo para canjear tu premio
              </div>
            </> :
            <>
            <h1>Gira la ruleta</h1>
              <span style={{fontSize: 22, marginBottom: 30, fontWeight: '500', textAlign: 'center'}}>y consigue regalo seguro</span>
              <Roulette afterSpin={afterSpin} mustSpin={mustSpin} result={result}/>
              <SpinButton text={'¡Girar!'} onClick={handleSpin}/>
            </>
        }
      </div>
      <PopupForm loading={loading} sendData={sendData} show={open} />
      <div className="footer">
        <img style={{ width: '100%'}} src={FooterLogo} alt="FooterLogo" />
      </div>
    </div>
  );
}

export default App;
