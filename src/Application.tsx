import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeScreen from "./screens/HomeScreen"
import { SigninScreen } from "./screens/SigninScreen"

const Application = () => {

  return (
    <>
    

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SigninScreen />} />
      <Route path="/home" element={<HomeScreen />} />

    

    </Routes>
    </BrowserRouter>

    </>
  )
}

export default Application
