/* eslint-disable react/prop-types */
import DashboardAdmin from "../components/DashboardAdmin";
import DashboardUser from "../components/DashboardUser";
import NavBar from "../components/NavBar";


const ContainerDashboard = ({ user }) => {
    return (
        <div>
            <NavBar />

            Dashboard
            {
                user.rol == "admin" ? <DashboardAdmin /> : <DashboardUser />
            }
        </div>
    );
}

export default ContainerDashboard;
