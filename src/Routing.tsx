import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from "./screens/Home";
import Faqs from "./screens/Faqs";
import Login from "./screens/onboarding/login";
import Signup from "./screens/onboarding/signup";
import Role from "./screens/onboarding/Role";
import RoleSelect from "./screens/onboarding/RoleSelect";
import VerifyCompany from "./screens/onboarding/VerifyCompany";
import CreateBrand from "./screens/onboarding/CreateBrand";
import Welcome from "./screens/onboarding/Welcome";
import { Sidebar, Navbar } from "./components";
import PublisherDashboard from "./screens/dashboards/publisher";
import PublisherAccountSettings from "./screens/dashboards/publisher/PublisherAccountSettings";
import Missions from "./screens/dashboards/publisher/missions";
import Media from "./screens/dashboards/publisher/media";
import BrandAnalytics from "./screens/dashboards/publisher/Analytics";
import BrandDashboard from "./screens/dashboards/brand";
import BrandAccountSettings from "./screens/dashboards/brand/BrandAccountSettings";
import Campaigns from "./screens/dashboards/brand/Campaigns";
import CreateClickCampaign from "./screens/dashboards/brand/CreateClickCampaign";
import SingleArticleCampaign from "./screens/dashboards/brand/SingleArticleCampaign";
import PublisherAnalytics from "./screens/dashboards/brand/Analytics";
import WriteArticle from "./screens/dashboards/brand/WriteArticle";
import CampaignCongrats from "./screens/dashboards/brand/CampaignCongrats";
import { getAuthSession, loadStorage } from "./utils/common";

const Routing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    
    useEffect(() => {
        const allowedRoutes = ["/", "/faqs", "/features"];

        const isLoggedIn = async () => {
            const user = await getAuthSession();
            if (user) {
                setIsAuthenticated(user);

                const role = loadStorage("userRole", "local");
                if (
                    !role &&
                    (
                        pathname === "/login" ||
                        pathname === "/signup" ||
                        pathname === "/welcome" ||
                        pathname.includes("/brand") ||
                        pathname.includes("/publisher")
                    )
                )
                    navigate("/role");
                if (allowedRoutes.includes(pathname) || role === "new") return;
                if (role === "brand" && !pathname.includes("/brand")) navigate("/brand");
                if (role === "publisher" && !pathname.includes("/publisher")) navigate("/publisher");
            } else {
                setIsAuthenticated(false);
                if (!allowedRoutes.includes(pathname) && pathname !== "/signup" && pathname !== "/login") navigate("/login");
            }
        };

        isLoggedIn();
    }, [navigate, pathname]);

    if (isAuthenticated === null) return null;

    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route path="" element={<Home />} />
                <Route path="/features" element={<Home />} />
                <Route path="/faqs" element={<Faqs />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/role" element={<Role />} />
            <Route path="/select-role" element={<RoleSelect />} />
            <Route path="/verify-company" element={<VerifyCompany />} />
            <Route path="/create-brand" element={<CreateBrand />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/publisher/" element={<Sidebar module="publisher" />}>
                <Route path="" element={<PublisherDashboard />} />
                <Route path="account-settings" element={<PublisherAccountSettings />} />
                <Route path="missions" element={<Missions />} />
                <Route path="media" element={<Media />} />
                <Route path="analytics" element={<BrandAnalytics />} />
            </Route>
            <Route path="/brand/" element={<Sidebar module="brand" />}>
                <Route path="" element={<BrandDashboard />} />
                <Route path="account-settings" element={<BrandAccountSettings />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="create-clicks-campaign" element={<CreateClickCampaign />} />
                <Route path="single-article" element={<SingleArticleCampaign />} />
                <Route path="analytics" element={<PublisherAnalytics />} />
            </Route>
            <Route path="/brand/post-article" element={<WriteArticle />} />
            <Route path="/brand/campaign-congrats" element={<CampaignCongrats />} />

            <Route path="*" element={null} />
        </Routes>
    )
}

export default Routing