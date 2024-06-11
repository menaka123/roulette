import React from 'react';
import './Roulette.scss';
import {Wheel} from "react-custom-roulette";

import SurpriseIcon from "./sorpresa.svg";
import PenIcon from "./boligrafo.svg";
import BagIcon from "./mochila.svg";
import PointerIcon from "./puntero_ruleta.png";
import LogoIcon from "./logo_ruleta.png";
import ShadowImg from "./sombra_ruleta.png";

const Roulette = ({ result, mustSpin, afterSpin }) => {
  const data = [
    { option: '0', image: {uri: SurpriseIcon, offsetY: 150, sizeMultiplier: 0.5} },
    { option: '1', image: {uri: PenIcon, offsetY: 150, sizeMultiplier: 0.15} },
    { option: '2', image: {uri: BagIcon, offsetY: 150, sizeMultiplier: 0.5} },
    { option: '3', image: {uri: SurpriseIcon, offsetY: 150, sizeMultiplier: 0.5} },
    { option: '4', image: {uri: PenIcon, offsetY: 150, sizeMultiplier: 0.15} },
    { option: '2', image: {uri: BagIcon, offsetY: 150, sizeMultiplier: 0.5} },
  ];

  const onStopSpinning = () => {
    // setMustSpin(false)
    afterSpin()
  }

  return (
    <div className={'roulette-wrapper'}>
      <div className="roulette-container">
        <Wheel
          radiusLineColor={'transparent'}
          radiusLineWidth={1}
          outerBorderWidth={0}
          mustStartSpinning={mustSpin}
          prizeNumber={result}
          data={data}
          backgroundColors={['#2e3c6d', '#2d4087']}
          onStopSpinning={onStopSpinning}
          pointerProps={{
            src: PointerIcon,
            style: {transform: 'rotate(45deg)', width: '10%', right: '9.66%', top: '11.24%'}
          }}
        />
        <div className="center">
          <img src={LogoIcon} alt="Logo"/>
        </div>
        <div className="shadow">
          <img src={ShadowImg} alt="Shadow"/>
        </div>
      </div>
    </div>
  );
};

export default Roulette;
