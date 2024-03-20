import { BrowserRouter, Route, Routes } from "react-router-dom"
import { BottomWarning } from "./components/BottomWarning"
import { Button } from "./components/Button"
import { Heading } from "./components/Heading"
import { InputBox } from "./components/InputBox"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Appbar } from "./components/Appbar"
import { Users } from "./components/Users"
import { SendMoney } from "./pages/SendMoney"
import { Dashboard } from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/send" element={<SendMoney/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
