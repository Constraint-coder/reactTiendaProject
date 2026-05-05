import { Routes, Route } from "react-router";
import { UsuariosView } from "../../views/usuario/usuario/UsuariosView"

export const UsuarioRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UsuariosView />} />
        </Routes>
    );
}; 