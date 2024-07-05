// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/loginPage";
import Header from "./views/header/header";
import Dashboard from "./views/dashboard";
import Check from "./views/check";
import { ColorProvider } from "./views/ColorContex";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Header />} />
          {/* <ColorProvider> */}
          <Route path="/Dashboard" element={<Dashboard />} />
          {/* </ColorProvider> */}
          <Route path="/Check" element={<Check />} /> for checking
          {/* <Route path="*" element={<NotFound />} /> This is a catch-all route for 404 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
