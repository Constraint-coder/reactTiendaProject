import { Routes, Route } from "react-router";
import { ProductosView } from "../../views/productos/Productosview";

export const ProductoRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductosView />} />
        </Routes>
    );
}; 