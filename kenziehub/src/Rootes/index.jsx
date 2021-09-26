import { useEffect, useState } from "react"
import {Switch, Route} from "react-router-dom"
import Dashboard from "../Pages/Dashboard"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"

function Rootes(){

    const [authorized,setAuthorized] = useState(false)

    useEffect(()=>{
        const token = window.localStorage.getItem("KenzieToken");
        
        if(!token){
            return setAuthorized(false)
        }

    },[authorized])
    


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
    } 
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Signup/>
                </Route>
                <Route path="/login">
                    <Login setAuthorized={setAuthorized}/>
                </Route>
                
            </Switch>
        </>)
}

export default Rootes