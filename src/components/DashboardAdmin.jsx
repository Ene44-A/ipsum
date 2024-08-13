import UserTableContainer from "./UserTableContainer";
import DetalleUsuario from "./DetalleUsuario";



const DashboardAdmin = () => {

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">
                                    <span data-feather="home"></span>
                                    Dashboard <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                    <span data-feather="file"></span>
                                    Orders
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                    <span data-feather="shopping-cart"></span>
                                    Products
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main className="col-md-10 ml-sm-auto px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                        </div>
                        <div className="row">
                            <UserTableContainer />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;
