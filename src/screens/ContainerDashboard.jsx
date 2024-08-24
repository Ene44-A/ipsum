/* eslint-disable react/prop-types */
import DashboardAdmin from "./DashboardAdmin";
import DashboardUser from "./DashboardUser";
import NavBar from "../components/NavBar";


const ContainerDashboard = ({ user }) => {
    return (
        <div>
            <NavBar />
            {
                user.rol == "admin" ? <DashboardAdmin /> : <DashboardUser user={user} />
            }
        </div>
    );
}

export default ContainerDashboard;
