import { useEffect, useState } from "react"
import {Switch, Route} from "react-router-dom"
import Dashboard from "../Pages/Dashboard"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"

function Rootes(){

    const [authorized,setAuthorized] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem("@Kenziehubtoken");
        console.log(`token: ${token}`)
        
        if(!token){
            return setAuthorized(false)
            
        }
        
    },[authorized])
    
    console.log(authorized)

    if (authorized===true){

        return (
            <>
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard setAuthorized={setAuthorized} />
                    </Route>
                </Switch>
            </>
        )
    } else {

        return (
            <>
                <Switch>
                    <Route exact path="/">
                        <Signup authorized={authorized}/>
                    </Route>
                    <Route path="/login" >
                        <Login setAuthorized={setAuthorized} authorized={authorized}/>
                    </Route>
                    
                </Switch>
            </>)
    }
    
}

export default Rootes