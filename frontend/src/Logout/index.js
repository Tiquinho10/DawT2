import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout(){
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate("/")
    }

    useEffect(() => {
         logout();
      }, []);


}