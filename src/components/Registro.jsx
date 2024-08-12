
import React, { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    pais: '',
    comidaFavorita: '',
    artistaFavorito: '',
    lugarFavorito: '',
    colorFavorito: '',
    contraseña: '',
    confirmarContraseña: '',
    fotoDePerfil: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fotoDePerfil: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos a tu backend
    console.log('Form data:', formData);
  };

  return (
    <div className="container">
        <div className='registration-container'>
             <div className="image-container">
                 <img src={img} alt="Description of Image" />
             </div>
             <div className="form-container">
                 <h1>Registar</h1>
                 <form  action="" onSubmit={handleSubmit(registrar)}>
                     <div>
                         <div className="container-inputs">
                             <div className="input-group mb-2">
                                 <div className="input-item">
                                     <label htmlFor="nombre">Nombre *</label>
                                     <input className="form-control form-control-sm" id="nombre"  type="text" {...register("nombre")} />
                                 </div>
                                 <div className="input-item">
                                     <label htmlFor="email">E-mail</label>
                                     <input className="form-control form-control-sm" id="email"  type="email" {...register("email")} />
                                 </div>
                             </div>
                             <div className="input-group mb-2">
                                 <div className="input-item">
                                     <label htmlFor="apellido">Apellido</label>
                                     <input className="form-control form-control-sm" id="apellido"  type="text" {...register("apellido")} />
                                 </div>
                                 <div className="input-item">
                                     <label htmlFor="telefono">Telefono</label>
                                     <input className="form-control form-control-sm" id="telefono"  type="phone" {...register("telefono")} />
                                 </div>
                             </div>
                             <div className="input-group mb-2">
                                 <div className="input-item">
                                     <label htmlFor="pais">Pais</label>
                                     <input className="form-control form-control-sm" id="pais"  type="text" {...register("apellido")} />
                                 </div>
                             </div>
                         </div>
                         <div className="container-inputs">
                             <div className="input-group mb-2">
                                 <div className="input-item">
                                     <label htmlFor="nombre">Nombre *</label>
                                     <input className="form-control form-control-sm" id="nombre"  type="text" {...register("nombre")} />
                                 </div>
                                 <div className="input-item">
                                     <label htmlFor="apellido">Apellido</label>
                                     <input className="form-control form-control-sm" id="apellido"  type="text" {...register("apellido")} />
                                 </div>
                             </div>
                             <div className="input-group mb-2">
                                 <div className="input-item">
                                     <label htmlFor="nombre">Nombre *</label>
                                     <input className="form-control form-control-sm" id="nombre"  type="text" {...register("nombre")} />
                                 </div>
                                 <div className="input-item">
                                     <label htmlFor="apellido">Apellido</label>
                                     <input className="form-control form-control-sm" id="apellido"  type="text" {...register("apellido")} />
                                 </div>
                             </div>
                         </div>
                         <div className="container-inputs">
                             <div className="input-group mb-2">
                                 <div className="input-item">
                                     <label htmlFor="nombre">Contraseña *</label>
                                     <input className="form-control form-control-sm" id="nombre"  type="text" {...register("nombre")} />
                                 </div>
                             </div>
                             <div className="input-group mb-2">
                                 <div className="input-item">
                                     <label htmlFor="nombre">Confirmar contraseña *</label>
                                     <input className="form-control form-control-sm" id="nombre"  type="text" {...register("nombre")} />
                                 </div>
                             </div>
                         </div>
                         <div className="container-inputs">
                             <div className="input-group mb-2">
                                 <div className="upload-btn-wrapper">
                                     <button className="btn">Upload a file</button>
                                     <input type="file" name="myfile" />
                                 </div>
                             </div>
                         </div>
                     </div>
                     <button  type="submit">Registrar</button>
                 </form>
                 <button onClick={()=>{handleLoginAndRegister()}}>Iniciar Sesión</button>
             </div>
         </div>
    </div>
  );
}

export default RegisterForm;