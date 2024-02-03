import { createBrowserRouter } from "react-router-dom"
import HomePage from "../../features/home/HomePage"
import Catalog from "../../features/catalog/Catalog"
import ProductDeatils from "../../features/catalog/ProductDeatils"
import AboutPage from "../../features/about/AboutPage"
import ContactPage from "../../features/contact/ContactPage"
import App from "../layout/App"

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children:[
            {path:'', element:<HomePage/>},
            {path:'catalog', element:<Catalog/>},
            {path:'catalog/:id', element:<ProductDeatils/>},
            {path:'about', element:<AboutPage/>},
            {path:'contact', element:<ContactPage/>},
        ]
    }
])