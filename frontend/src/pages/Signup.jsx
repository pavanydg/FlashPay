import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import {Subheading} from "../components/Subheading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate();

  return <div className="h-screen bg-slate-300 flex justify-center"> 
    <div className="flex flex-col justify-center">
      <div className="rounded-lg text-center bg-white p-2 px-4 h-max w-80">
        <Heading label={'Sign Up'}/>
        <Subheading label={'Enter your information to create an account'}/>
        <InputBox onChange={e => {
          setFirstName(e.target.value)
        }} label={'First Name'} placeholder={"Pavan"}/>
        <InputBox onChange={e => {
          setLastName(e.target.value)
        }} label={'Last Name'} placeholder={"Y"}/>
        <InputBox onChange={e => {
          setUsername(e.target.value)
        }} label={'Email'} placeholder={"xyz@gmail.com"}/>
        <InputBox onChange={e => {
          setPassword(e.target.value)
        }} label={'Password'} placeholder={"123456"}/>
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
          }} label={"Signup"}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={'Sign in'} to={'/signin'}/>
      </div>
    </div>
  </div>
}