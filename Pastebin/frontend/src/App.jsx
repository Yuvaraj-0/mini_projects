import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'


import PasteForm from "./component/PasteForm";
import PasteView from "./component/PasteView";
function App() {


  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<PasteForm />} />
      <Route path="/paste/:slug" element={<PasteView />} />
    </Routes>
  </BrowserRouter>

    
      
    
  )
}

export default App
