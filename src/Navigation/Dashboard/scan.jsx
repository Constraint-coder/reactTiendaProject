import { Routes, Route } from "react-router";
import {VentasView } from "../../views/scan/ScanView"

export const ScanRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ScanView />} />
        </Routes>
    );
}; 