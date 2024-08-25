import { useContext, useState } from "react";
import { authContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const CuestionPopUpUser = ({user, handlePopUp}) => {
  const {askColl} = useContext(authContext)
  const {register, handleSubmit} = useForm();

  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
      setShowModal(!showModal);
      console.log('El popUp es: '+showModal);
      handlePopUp()
  }

  let ask1, ask2, ask3, ask4;
      for (let i = 0; i < askColl.length; i++) {
          switch (i) {
              case 0:
              ask1 = askColl[i].ask;
              break;
              case 1:
              ask2 = askColl[i].ask;
              break;
              case 2:
              ask3 = askColl[i].ask;
              break;
              case 3:
              ask4 = askColl[i].ask;
              break;
          }
      }

  const registrar = async ( user, telefono,pais,pregunta1,pregunta2,pregunta3,pregunta4) =>{
    const docRef = await doc(db, 'usuarios', user);
    updateDoc(docRef,
      {
        userGoogle: false,
        telefono:telefono,
        pais:pais,
        pregunta1:{
            ask:ask1,
            resp:pregunta1
        },pregunta2:{
            ask:ask2,
            resp:pregunta2
        },pregunta3:{
            ask:ask3,
            resp:pregunta3
        },pregunta4:{
            ask:ask4,
            resp:pregunta4
        },
      }
    )
    handleClose()
  }
  const handleSaveCuestion = async(data) =>{
    registrar(
      user,
      data.telefono,
      data.pais,
      data.pregunta1,
      data.pregunta2,
      data.pregunta3,
      data.pregunta4,
    )
  }



return (

  <div className="card-body">

          <form action="" onSubmit={handleSubmit(handleSaveCuestion)}>
            <div className="m-4">
                <div className="row row-cols-2">
                    <div className="form-group col">
                        <label >Pais</label>
                        <input className="form-control form-control-sm" required type="text" {...register("pais")} />
                    </div>
                    <div className="form-group col">
                        <label >Telefono</label>
                        <input className="form-control form-control-sm" required type="text" {...register("telefono")} />
                    </div>
                    {
                      askColl&&
                      askColl.map((e)=>{
                        return(
                          <div className="form-group col" key={e.id}>
                                    <label htmlFor={e.aks}>{e.ask}</label>
                                    <input className="form-control form-control-sm" required type="text" {...register(e.field)} />
                                </div>
                            )
                          })
                        }
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn " >Cerrar</button>
              <button type="submit" className="">Guardar</button>
            </div>
          </form>
  </div>
);
};

export default CuestionPopUpUser;
