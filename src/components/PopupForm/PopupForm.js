import React, { useState } from 'react';
import './PopupForm.scss';
import SpinButton from "../SpinButton";

const years = [];
for (let i = 2024; i >= 2000; i--) {
  years.push(i);
}

const PopupForm = ({show, sendData, loading}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carYear: '',
    changeCar: '',
    privacyPolicy: false,
    privacyPolicySecond: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors(errors => ({...errors, [name]: ''}))
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Nombre y apellido es obligatorio.";
    if (!formData.email) tempErrors.email = "Email es obligatorio.";
    if (!formData.phone) tempErrors.phone = "Teléfono es obligatorio.";
    if (!formData.carYear) tempErrors.carYear = "Año del coche es obligatorio.";
    if (!formData.changeCar) tempErrors.changeCar = "Selecciona una opción.";
    if (!formData.privacyPolicy) tempErrors.privacyPolicy = "Debes aceptar la política de privacidad.";
    if (!formData.privacyPolicySecond) tempErrors.privacyPolicySecond = "Debes aceptar la política de privacidad.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      sendData(formData)
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div style={{ display: show ? 'flex' : 'none'}} className="popup-form-wrapper">
      <div className="popup-form">
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <span style={{display: 'flex', width: '100%', fontWeight: '500', fontSize: 22, textAlign: 'center', maxWidth: 200 }}>Déjanos tus datos para participar en la</span>
        </div>
        <h2>Ruleta del Centenario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre y apellido*</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}/>
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}/>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Teléfono*</label>
            <input type="tel" pattern="\+?[\d]{5,40}" name="phone" value={formData.phone} onChange={handleChange}/>
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label>¿De qué año es tu coche?*</label>
            <select name="carYear" value={formData.carYear} onChange={handleChange}>
              <option value="">Selecciona el año</option>
              {
                years.map(year => <option key={year} value={year}>{year}</option>)
              }
              <option value={'No tengo coche'}>No tengo coche</option>
            </select>
            {errors.carYear && <span className="error">{errors.carYear}</span>}
          </div>
          <div className="form-group">
            <label>¿Estás pensando en cambiarlo por uno nuevo?*</label>
            <div className="radio-group">
              <label style={{background: formData.changeCar === "Si" ? 'rgb(255 186 15)' : 'lightgray'}}>
                <input type="radio" name="changeCar" value="Si" checked={formData.changeCar === "Si"}
                       onChange={handleChange}/> Si
              </label>
              <label style={{background: formData.changeCar === "No" ? 'rgb(255 186 15)' : 'lightgray'}}>
                <input type="radio" name="changeCar" value="No" checked={formData.changeCar === "No"}
                       onChange={handleChange}/> No
              </label>
            </div>
            {errors.changeCar && <span className="error">{errors.changeCar}</span>}
          </div>
          <div className="form-group privacy-form-group">
            <label className={'privacy'}>
              <span>
                 <input type="checkbox" name="privacyPolicy" checked={formData.privacyPolicy} onChange={handleChange}/>
              </span>
              <span style={{display: 'inline-block'}}>
                Acepto la <a href="https://www.leomotor.net/politica-de-privacidad">política de privacidad</a>
              </span>
            </label>
            {errors.privacyPolicy && <span className="error">{errors.privacyPolicy}</span>}
          </div>

          <div className="form-group privacy-form-group">
            <label className={'privacy'}>
              <span>
                 <input type="checkbox" name="privacyPolicySecond" checked={formData.privacyPolicySecond} onChange={handleChange} />
              </span>
              <span style={{display: 'inline-block'}} className="privacy-policy">
                Acepto recibir <a href="https://www.leomotor.net/condiciones-de-envios-comerciales">info</a> de ofertas y descuentos del Grupo Leomotor
              </span>
            </label>
            {errors.privacyPolicySecond && <span className="error">{errors.privacyPolicySecond}</span>}
          </div>
          <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
            <SpinButton type="submit" text={loading ? 'Loading...' : '¡OK!'}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
