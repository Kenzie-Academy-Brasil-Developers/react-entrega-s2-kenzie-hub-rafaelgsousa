import {Stack, TextField, Button} from "@material-ui/core"
import {Link,useHistory} from "react-router-dom"
import "./style.css"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import api from "../../service"
import { toast } from "react-toastify"

function Login({setAuthorized}){

    const history = useHistory()

    const schema = yup.object().shape({
        email:yup.string().required("Campo obrigatório!").email(),
        password:yup.string().required("Campo obrigatório!").min(6,"Deve ter no mínimo 8 caracteres")
        .matches(/^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Senha deve ter letra maíuscula, mínuscula, numero e caracter")
    })

    const {register,handleSubmit,formState:{errors}}= useForm({resolver:yupResolver(schema)})

    const onLogin = (data)=>{
        console.log(data)
        api.post("/sessions",data)
        .then((resp)=>{
            const {token, user} = resp.data;

            localStorage.setItem("KenzieToken", JSON.stringify(token));
            localStorage.setItem("KenzieUser", JSON.stringify(user));
            setAuthorized(true)
            toast.success("Logando!")
            return history.push("/dashboard")
        })
        .catch((err)=>toast.errors("Email ou senha incorreto(s)!"))

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
                    size="small" 
                    error={!!errors.password} type="password"
                    helperText={errors.password?.message}/>

                    <Button variant="outlined" 
                    type="submit">Login</Button>
                    <p>Se não fez cadastro vá para <Link to="/">Cadastro</Link></p>
                </Stack>
            </form>
        </>

    )
}

export default Login