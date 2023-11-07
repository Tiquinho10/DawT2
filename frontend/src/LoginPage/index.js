import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button} from "antd";
import { UserOutlined, LockOutlined} from "@ant-design/icons";

import axios from 'axios';
import UserContext from '../contexts';
import { set } from 'date-fns';

export  function LoginPage() {
 // const { updateUser, user} = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState()
  const API_BASE_URL = 'http://localhost:3210';
      

  const handleLogin =  (e) => {
        console.log('user...',e)

        if(e.username === 'cliente@email.com' && e.password === '12345678'){
          
          const user = {
            name: "user",
            role: 'ROLE_USER'
        };
        localStorage.setItem('user', JSON.stringify(user))
          navigate('/user');

        }else if(e.username === 'admin@email.com' && e.password === '12345678'){
          
          const  admin = {
            name: "user",
            role: 'ROLE_ADMIN'
        };
        localStorage.setItem('user', JSON.stringify(admin))
          navigate('/admin');
        }else{
          setError('Falha no login. Verifique suas credenciais.');
        }

     try {
           
         
         //here
         
         
    
        //  const role = userRole;
        // // updateUser(response.data.user)
         
        //  console.log('role ya', role)
        //  if (userRole === 'ROLE_ADMIN') {
        //     navigate('/admin');
        //  } else if (userRole === 'ROLE_USER') {
        //     navigate('/user');
        //  }
         //endhere
       } catch (error) {
         console.error(error);
         setError('Falha no login. Verifique suas credenciais.');
       }
     }

  return (
    <div className='login-page'>
      {/* <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form> */}
     
      <h1>EatExplorer Inc</h1>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleLogin}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Por favor digite o email!' }]}
      >
        <Input size='medium' prefix={<UserOutlined />} 
        placeholder="email do usuario" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor digite a Password!' }]}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {error && <div className='error'>{error}</div>}
      <Form.Item>
        
        <a className="login-form-forgot" href="">
          recuperar password
        </a>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
      </Form.Item>
    </Form>
    
    </div>
  );
}

