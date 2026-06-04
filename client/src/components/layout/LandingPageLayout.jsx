import Header from "../common/Header";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import './LandingPageLayout.css'
const LandingPageLayout = () => {
    return (
        <div className="landing-page-wrapper">
            <Header />
            <main className="landing-page-content">
                <Outlet />
            </main>
            <Footer />
        </div>
          
    );
}
export default LandingPageLayout;