import {Switch, Route} from "react-router-dom"
import Dashboard from "../Pages/Dashboard"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"

function Rootes(){
    
    return (
        <>
        <Switch>
            <Route exact path="/">
                <Signup/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/dashboard">
                <Dashboard/>
            </Route>
        </Switch>
        </>)
}

export default Rootes