import { logoutUser } from "../../services/user-service";
import MainLayout from "../layout/main-layout";

const HomePage = () => {

    const handleLogout = async () => {
        const response = await logoutUser();
        console.log(response.message)
    }

    return (
        <MainLayout>
            <div className="text-2xl">
                <button  onClick={handleLogout}>Logout</button>
            </div>
        </MainLayout>
    )
}

export default HomePage;