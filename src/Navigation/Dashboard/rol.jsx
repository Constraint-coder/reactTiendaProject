import { Routes, Route } from "react-router";
import { RolesView } from "../../views/rol/RolesView";

export const RolRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<RolesView />} />
        </Routes>
    );
}; 