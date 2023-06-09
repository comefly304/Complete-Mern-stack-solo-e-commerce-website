import axios from "axios";
import { useEffect,useContext,createContext, useState } from "react";

const AuthContext=createContext()  //create context

const AuthProvider=({children})=>{
    const[auth,setAuth]=useState({
        user:null,
        token:""
    })

//default axios auth
axios.defaults.headers.common["Authorization"]=auth?.token

    useEffect(()=>{
    const data=localStorage.getItem("auth")
    if(data){
        const parsedata=JSON.parse(data)
        setAuth({
            ...auth,
            user:parsedata.user,
            token:parsedata.token
        })
    }
    },[])
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook
const useAuth=()=>useContext(AuthContext)

export {useAuth,AuthProvider}