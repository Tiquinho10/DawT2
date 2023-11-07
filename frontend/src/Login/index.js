import { useState } from "react";
import axios from "axios";
import { AdminPage } from "../AdminPage/AdminPage";
import { UserPage } from "../UserPage/UserPage";
import { Navigate } from "react-router-dom";
import { AppRouter } from "../AppRouter";
import { useNavigate} from 'react-router-dom';


export function Login(){
  
  const navigate = useNavigate();
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const API_BASE_URL = 'http://localhost:3210'
      
        const handleSubmit = async (event) => {
          event.preventDefault();
          try {
           // alert('ok')
            const response = await axios.post(`${API_BASE_URL}/auth`, { username, password });
            // console.log(response.data.user.roles == 'ROLE_ADMIN')
            console.log(response.data)
            const token = response.data.token;
            localStorage.setItem('token', token); // armazenar token no localStorage
            const role = response.data.user.roles;
            //<AppRouter userRole={role}/>
            
          //   if (role === 'ROLE_ADMIN') {
          //     //history.push('/'); // redirecionar para rota de admin
          //   <AdminPage />
          //  // <Navigate to="/vacinas" />
          //   } else if (role === 'ROLE_USER') {
          //     //history.push('/user'); // redirecionar para rota de usuário normal
          //     <UserPage />
          //   }
          navigate('/rota2');
          } catch (error) {
            console.error(error);
          }
        }
      
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Usuário:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Entrar</button>
          </form>
        );
      }
      