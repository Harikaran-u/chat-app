import "./App.css";
//import components
import Login from "./components/Login";

//main app code

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-appBg">
      <Login />
    </div>
  );
};

export default App;
