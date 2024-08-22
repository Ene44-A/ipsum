/* eslint-disable react/prop-types */

const PreguntasUserItem = ({info}) => {


    return (
        <div className="py-2 rounded">
            <div className="list-group-item">
                <div className="row">
                    <div className="col-1">
                        <div className="py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" className="bi bi-bookmark d-flex" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="col-10">
                        <h5>{info && info.ask}</h5>
                        <p className="fw-light text-secondary">{info && info.resp}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreguntasUserItem;
