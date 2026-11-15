
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import MyRoutine from "./Components/MyRoutine";
import MyHabits from "./Components/MyHabits";
import MyProducts from "./Components/myproducts";
import ContactUs from "./Components/ContactUs";
import Progress from "./Components/Progress";
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
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
              </div>
    </BrowserRouter>
  );
}

export default App;
