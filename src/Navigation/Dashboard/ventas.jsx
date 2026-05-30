import { Routes, Route } from "react-router";
import {VentasView } from "../../views/ventas/VentasView"

export const VentasRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<VentasView />} />
        </Routes>
    );
}; 