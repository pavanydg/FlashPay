import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import {jwtDecode} from 'jwt-decode'
import axios from "axios"

export const Dashboard = () => {
    const [user,setUser] = useState("hi")
    const [amount,setAmount] = useState(0)
    useEffect(()=> {
        const token = localStorage.getItem("token");
            
        const decodedToken = jwtDecode(token);        

        let data = JSON.stringify({
            "userId": decodedToken
          });

          let config2 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/user/name',
            headers: { 
              'Authorization': 'Bearer '+token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          axios.request(config2)
            .then(res => {
                setUser(res.data.firstName)
            })
          
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/account/balance',
            headers: { 
              'Authorization': 'Bearer '+token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            const actualAmount = response.data
            setAmount(Math.ceil(actualAmount.balance));
          })  
          .catch((error) => {
            console.log(error);
          },[]);
    })
    return <div>
        <Appbar name={user}/>
        <div className="m-8">
            <Balance value={amount}/>
            <Users />
        </div>
    </div>
}