import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

    return <div className="h-screen bg-slate-300 flex justify-center"> 
    <div className="flex flex-col justify-center">
      <div className="rounded-lg text-center bg-white p-2 px-4 h-max w-80">
        <Heading label={'Sign In'}/>
        <Subheading label={'Enter your credentials to access your account'}/>
        <InputBox label={'Email'} placeholder={"xyz@gmail.com"} onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <InputBox label={'Password'} placeholder={"123456"} onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        <div className="pt-4">
          <Button onClick={async () => {
            const res = await axios.post("http://localhost:3000/api/v1/user/signin",{
              username,
              password
            });
            localStorage.setItem("token",res.data.token)
            navigate("/dashboard")
          }} label={"Sign In"}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={'Sign Up'} to={'/signup'}/>
      </div>
    </div>
  </div>
}
