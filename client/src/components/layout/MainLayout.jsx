import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import AIChatbot from "@/components/landing/AIChatbot";
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = () => {
    return(
        <div className="main-layout">
            <Navigation />
            <div className="main-content">
                <Outlet />
                <Footer />
            </div>
            <AIChatbot />
        </div>
    );
}
export default MainLayout;
