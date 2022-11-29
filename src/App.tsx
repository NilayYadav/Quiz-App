import "./App.css";
import { Navbar } from "./components/index";
import { QuizPage } from "./pages/private/Quiz";
import { Routes, Route } from "react-router-dom";
import { Home, Leaderboard, Scores } from "./pages/index";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <PrivateRoute path="/quiz/:id" element={<QuizPage />} />
        <PrivateRoute path="/scores" element={<Scores />} />
        <PrivateRoute path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
