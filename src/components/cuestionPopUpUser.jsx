import { useState } from "react";

const CuestionPopUpUser = ({handlePopUp}) => {

// Variable that controls the visibility of the modal
const [showModal, setShowModal] = useState(false);

// Simulating a value that can be true or false
const isVariableTrue = true; // Change this to test

// Function to open the modal
const handleShow = () => {
    setShowModal(true);
}
// Function to close the modal
const handleClose = () => {
    setShowModal(false);
    handlePopUp()
}
// Show the modal if the variable is true
if (isVariableTrue && !showModal) {
  handleShow();
}

return (
  <div>
    {/* Bootstrap Modal */}
    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Información Importante</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Este es un mensaje informativo que aparece en el popup. Puedes personalizar este contenido según tus necesidades.</p>
            <p>Asegúrate de que la información aquí sea relevante para el usuario.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleClose}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>

    {/* Optional: Background overlay */}
    {showModal && <div className="modal-backdrop fade show"></div>}
  </div>
);
};

export default CuestionPopUpUser;
