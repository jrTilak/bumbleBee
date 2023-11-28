// import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
// import { useAuth } from "./context/AuthContext";
// import Footer from "./components/footer/Footer";
function App() {
  // const auth = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <main>
      {/* <Header /> */}
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
