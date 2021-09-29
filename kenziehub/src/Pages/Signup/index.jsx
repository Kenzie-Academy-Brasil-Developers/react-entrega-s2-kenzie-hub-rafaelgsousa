import { TextField, Button, Stack } from "@material-ui/core"
import { Link, useHistory,Redirect } from "react-router-dom"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css"
import api from "../../service";
import { toast } from "react-toastify"

function Signup({authorized}){

    const history = useHistory()

    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório!"),
        email:yup.string().required("Campo obrigatório!").email(),
        bio:yup.string().required("Campo obrigatório!"),
        contact:yup.string().required("Campo obrigatório!"),
        course_module:yup.string().required("Campo obrigatório!"),
        password:yup.string().required("Campo obrigatório!").min(6,"Deve ter no mínimo 8 caracteres")
        .matches(/^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Senha deve ter letra maíuscula, mínuscula, numero e caracter"),
        passwordConfirm:yup.string().required("Compor obrigatório").oneOf([yup.ref("password")],"senha incorreta")
    })


    const {register, handleSubmit, formState:{errors}}= useForm({resolver:yupResolver(schema)})

    const onSub=({name, email, bio, contact, password, course_module})=>{
        const user = {name, email, bio, contact, password, course_module}
        console.log(user)
        api.post("/users", user)
        .then((_)=>{
            toast.success("Conta criada com sucessso!")
            return history.push("/login")
        })
        .catch(err=>toast.error("Erro ao criar conta!"))
    }

    if(authorized) {
        return <Redirect to="/dashboard"/>;
    }



    return (
        <>
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit(onSub)}>
                <Stack spacing={1}>
                    <TextField id="outlined-basic" 
                    label="Name" variant="outlined" 
                    size="small" {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}/>

                    <TextField id="outlined-basic" 
                    label="Email" variant="outlined" 
                    size="small" {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}/>

                    <TextField id="outlined-basic" 
                    label="LinkeIn" variant="outlined" 
                    size="small" {...register("contact")}
                    error={!!errors.contact}
                    helperText={errors.contact?.message}/>

                    <TextField id="outlined-basic" 
                    label="Modulo do curso" variant="outlined"
                     size="small" {...register("course_module")}
                     error={!!errors.course_module}
                    helperText={errors.course_module?.message}/>

                    <TextField id="outlined-basic" 
                    label="Bio" variant="outlined" 
                    size="small" {...register("bio")}
                    error={!!errors.bio}
                    helperText={errors.bio?.message}/>

                    <TextField id="outlined-basic" 
                    label="Password" variant="outlined" 
                    size="small" {...register("password")}
                    error={!!errors.password} type="password"
                    helperText={errors.password?.message}/>

                    <TextField id="outlined-basic" 
                    label="Password Confirm" variant="outlined"
                     size="small" {...register("passwordConfirm")}
                     error={!!errors.passwordConfirm} type="password"
                    helperText={errors.passwordConfirm?.message}/>

                    <Button variant="outlined" type="submit">Signup</Button>
                    <p>Se já tem cadastro vá para <Link to="/login">Login</Link></p>
                </Stack>
            </form>
        </>
    )
}

export default Signup