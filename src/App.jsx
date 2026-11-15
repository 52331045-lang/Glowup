
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import MyRoutine from "./Components/MyRoutine";
import MyHabits from "./Components/MyHabits";
import MyProducts from "./Components/myproducts";
import ContactUs from "./Components/ContactUs";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/routine" element={<MyRoutine />} />
            <Route path="/habits" element={<MyHabits />} />
            <Route path="/products" element={<MyProducts />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
              </div>
    </BrowserRouter>
  );
}

export default App;
