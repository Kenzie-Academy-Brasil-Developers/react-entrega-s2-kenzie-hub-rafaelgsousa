import {Stack, TextField, Button} from "@material-ui/core"
import {Link} from "react-router-dom"
import "./style.css"

function Login(){
    return (
        <>
            <h2>Login</h2>
            <form>
                <Stack spacing={1}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" size="small"/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" size="small"/>
                    <Button variant="outlined">Login</Button>
                    <p>Se não fez cadastro vá para <Link to="/">Cadastro</Link></p>
                </Stack>
            </form>
        </>

    )
}

export default Login