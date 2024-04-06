import CreateNewContact from "./pages/CreateNewContact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
//list your routes here
export const routes = [
    { path: "/", element: <Home /> },
    { path: "/new", element: <CreateNewContact /> },
    { path: "*", element: <NotFound /> },
]