import {Stack, TextField, Button} from "@material-ui/core"
import {Link,useHistory,Redirect} from "react-router-dom"
import "./style.css"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import api from "../../service"
import { toast } from "react-toastify"

function Login({setAuthorized, authorized}){

    const history = useHistory()

    const schema = yup.object().shape({
        email:yup.string().required("Campo obrigatório!").email(),
        password:yup.string().required("Campo obrigatório!").min(6,"Deve ter no mínimo 6 caracteres")
        .matches(/^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Senha deve ter letra maíuscula, mínuscula, numero e caracter")
    })

    const {register,handleSubmit,formState:{errors}}= useForm({resolver:yupResolver(schema)})

    const onLogin = (data)=>{

        api.post("/sessions",data)
        .then((resp)=>{

            console.log("user: ",resp.data.user)
            localStorage.clear();

            const {token, user} = resp.data;

            localStorage.setItem("@Kenziehubtoken", JSON.stringify(token))

            localStorage.setItem("@KenziehubUser", JSON.stringify(user))

            setAuthorized(true)

            return history.push("/dashboard")
        })
        .catch((err)=> console.log(err))
    }

    if(authorized) {
        return <Redirect to="/dashboard"/>;
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onLogin)}>
                <Stack spacing={1}>
                    <TextField id="outlined-basic" 
                    label="Email" variant="outlined" 
                    size="small" {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}/>

                    <TextField id="outlined-basic"
                    label="Password" variant="outlined" 
                    size="small" {...register("password")}
                    error={!!errors.password} type="password"
                    helperText={errors.password?.message}/>

                    <Button variant="outlined" 
                    type="submit">Login</Button>
                    <p>Se não fez cadastro vá para <Link to="/">Signup</Link></p>
                </Stack>
            </form>
        </>

    )
}

export default Login