
import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { Logout } from './Logout';
import { AdminPage } from './AdminPage/AdminPage';
import { UserPage } from './UserPage/UserPage';

import { Vaccines } from './AdminPage/Pages/Orders';

//userPage
import { Patients } from './UserPage/Pages/Users/users';

export function RoutesApp() {
    //const {signed} = useContext(UserContext);
    const PrivateAdmin = ({Item}) => {
      const myuser = localStorage.getItem('user');
      console.log("usuario: ", myuser)
      const user = JSON.parse(myuser);
      let signed = false;
      console.log('user router', user)
      if(user.role == 'ROLE_ADMIN'){
        console.log('usuario : ', user.roles)
        console.log(user.roles === 'ROLE_ADMIN')
        signed = true;
      }
    
      return signed  ? <Item /> : <LoginPage />
    }

    const PrivateUser = ({Item}) => {
      const myuser = localStorage.getItem('user');
      console.log("usuario: ", myuser)
      const user = JSON.parse(myuser);
      let signed = false;
      console.log('user router', user)
      if(user.role === 'ROLE_USER'){
        console.log('usuario : ', user.roles)
        console.log(user.roles == 'ROLE_ADMIN')
        signed = true;
      }
    
      return signed  ? <Item /> : <LoginPage />
    }


  return (

         <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<PrivateAdmin Item={AdminPage} />}> 
           <Route path="" element={<Vaccines />} />
        </Route>
        <Route path="/user/*" element={ <PrivateUser Item={UserPage} />}>
           <Route path="" element={<Patients />}></Route>
        </Route>
        <Route path='/logout' element={<Logout />} />
      </Routes>
     
    
  );
}

