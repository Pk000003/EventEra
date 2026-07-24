import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";


import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";


import Login from "./pages/Login";
import Register from "./pages/Register";


import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";


import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";




function App() {


return (

<Router>


<div className="
min-h-screen
bg-gray-100
dark:bg-[#080014]
transition-colors
">



<Navbar />




<main className="
max-w-7xl
mx-auto
px-4
pt-8
pb-8
">





<Routes>



<Route

path="/"

element={<Home/>}

/>





<Route

path="/events"

element={<Events/>}

/>





<Route

path="/events/:id"

element={<EventDetail/>}

/>






<Route

path="/login"

element={<Login/>}

/>





<Route

path="/register"

element={<Register/>}

/>





<Route

path="/dashboard"

element={<UserDashboard/>}

/>





<Route

path="/admin"

element={<AdminDashboard/>}

/>





<Route

path="/payment-success"

element={<PaymentSuccess/>}

/>





<Route

path="/payment-failed"

element={<PaymentFailed/>}

/>







<Route

path="*"

element={

<div className="
text-center
py-20
">


<h1 className="
text-5xl
font-black
text-black
dark:text-white
">

404

</h1>


<p className="
mt-4
text-gray-500
dark:text-gray-300
">

Page Not Found

</p>


</div>

}

/>





</Routes>





</main>



</div>



</Router>

);


}


export default App;