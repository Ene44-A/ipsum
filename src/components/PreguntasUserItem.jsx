
const PreguntasUserItem = (info) => {

    console.log(info);

    return (
        <div>
            <div className="list-group-item">
                <div className="row">
                    <div className="col-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-bookmark d-flex" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                        </svg>
                    </div>
                    <div className="col-10">
                        <h6>{info.ask}</h6>
                        <p>{info.resp}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreguntasUserItem;
