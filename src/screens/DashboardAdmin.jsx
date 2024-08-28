import NavDashboardAdmin from "./NavDashboardAdmin";
import UserTableContainer from "../components/UserTableContainer";

const DashboardAdmin = () => {

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-3 d-none d-md-block bg-light sidebar">
                        <NavDashboardAdmin />
                    </nav>
                    <main className="col-md-9 ml-sm-auto px-4">
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
