import AdminDashBoardCitizens from "./AdminDashboardCitizens"
import AdminDashboardEmployees from "./AdminDashboardEmployees"
import Navbar from "./Navbar"

const AdminDashboard = () => {
    return (
        <div>
              
             <Navbar isAuthenticated={true}/>
             <h2 className="pb-3 mt-4 text-[4rem] font-bold leading-none tracking-tight text-gray-700  dark:text-white p-6 flex flex-col justify-center items-center mx-auto">Admin Dashboard</h2>
        <div>
            <AdminDashBoardCitizens/>
            <AdminDashboardEmployees/>
        </div>
        </div>
    )
}
export default AdminDashboard