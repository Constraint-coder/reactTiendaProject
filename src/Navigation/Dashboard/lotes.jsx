import { Routes, Route } from "react-router";

// Vista principal de lotes
import { LotesView } from "../../views/lotes/LotesView";

export const LotesRoutes = () => {

return(

<Routes><Route path="/" element={<LotesView />}/></Routes>

)

};