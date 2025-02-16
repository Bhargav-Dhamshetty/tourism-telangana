import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./components/common/RootLayout";
import Home from "./components/common/Home";
import Login from './components/common/Login'
import Sign from './components/common/Sign';
import Favourites from './components/userprofile/Favourites';
import PlacesList from './components/places/PlacesList';
import Contact from "./components/common/Contact";
import Privacy from "./components/common/Privacy";
import Terms from "./components/common/Terms";
import Places from "./components/places/Places";


const browserObj = createBrowserRouter([
  {
    path:"",
    element:<RootLayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"placeslist",
        element:<PlacesList/>
      },
      {
        path:"signup",
        element:<Sign/>
      },
      {
        path:"favourites",
        element:<Favourites/>
      },
      {
        path:"contact",
        element:<Contact/>
      },
      {
        path:"privacy",
        element:<Privacy/>
      },
      {
        path:"terms",
        element:<Terms/>
      },
      {
        path:"places",
        element:<Places/>
      }
    ]
  },
]);

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; // Clerk API Key

const App = () => {
  return (
    <div className="w-full min-h-screen">
    <ClerkProvider publishableKey={clerkPubKey}>
      <RouterProvider router={browserObj} />
    </ClerkProvider>
    </div>
  );
};

export default App;
