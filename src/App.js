import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestMinatBakat from "./Pages/testST30";
import AnalisisST30 from "./Pages/HasilTest";
import FormLogin from "./Pages/Login";

function App() {
  return (
    <div style={{ fontFamily: "'Varela Round', sans-serif" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormLogin />} />
          <Route path="/test-minat-bakat" element={<TestMinatBakat />} />
          <Route path="/hasil-minat-bakat" element={<AnalisisST30 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
