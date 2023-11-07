import { useState, useEffect } from "react"
import {  Input, Space, Button, Typography, message} from "antd";
import axios from "axios";
import styles from './password.module.css';

export function UpdatePasswordUser(){
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmNewPassword, setConfirmNewPassword] = useState("");
const [formData, setFormData] = useState({});
const API_BASE_URL = "http://localhost:3210";
const loggedUser = localStorage.getItem('user');
const user = JSON.parse(loggedUser);
const [error, setError] = useState("")

const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData, [name] : value})  
}

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData.confirmPassword != formData.newPassword)
  console.log('formdadta', formData.confirmPassword)
     
 
if(formData.confirmPassword !== formData.newPassword){
 setError('Passwords diferentes')
 return;
}else if(formData.currentPassword === formData.newPassword){
   
  setError('Escolha uma palavra passe diferente da actual')
   return;
}
   
    try {
        axios.put(`${API_BASE_URL}/myuser/${user.id}/password`, formData)
        .then(response =>{
            setTimeout(() => {
                message.success('password alterada com sucesso')
            }, 1000)
        })
    } catch (error) {
      
        console.error('erro ao atualizar a password', error)
         setError(error.response.data.message)
      }
 }

 const handleChangePassword = async (e)=> {
  e.preventDefault();
  console.log(formData.confirmPassword != formData.newPassword)
  console.log('formdadta', formData.confirmPassword)
     
 
if(formData.confirmPassword !== formData.newPassword){
 setError('Passwords diferentes')
 return;
}else if(formData.currentPassword === formData.newPassword){
   setError('Escolha uma palavra passe diferente da actual')
   return;
}

try {
  await axios.put(`${API_BASE_URL}/myuser/${user.id}/password`, formData)
   .then((response) => {
     setTimeout(() => {
       message.success('password alterada com sucesso')
   }, 1000)
   setFormData({});
   setError("");
   })
   
} catch (error) {
   console.error('erro ao atualizar a password');
   setError('password actual incorrecta')
}   
 }

 const ya = ()=> {
    console.log('user logged: ', user);
 }

//  useEffect(()=> {
//     ya();
//  }, []);

 

    return(
     <Space direction="vertical" >
        {/* <Typography.Title level={4}>Alterar Password</Typography.Title> */}
        <h2 className={styles.title}>Alterar Password</h2>
        <label>
          Digite a Password actual:
          {/* <input type="text" name="name" value={formData.name || ''} onChange={handleChange} /> */}
          <Input.Password type="text" name="currentPassword" value={formData.currentPassword || ''} onChange={handleChange}
            required
            rules={[{required: true, message: "por favor digite o nome da vacina"}]}
          />
          </label>

          <label>
          Digite a nova Password:
          {/* <input type="text" name="name" value={formData.name || ''} onChange={handleChange} /> */}
          <Input.Password type="text" name="newPassword" value={formData.newPassword || ''} onChange={handleChange}
            required
            rules={[{required: true, message: "por favor digite o nome da vacina"}]}
          />
          </label>

          <label>
          Confirme a nova Password:
          {/* <input type="text" name="name" value={formData.name || ''} onChange={handleChange} /> */}
          <Input.Password type="text" name="confirmPassword" value={formData.confirmPassword || ''} onChange={handleChange}
            required
            rules={[{required: true, message: "por favor digite o nome da vacina"}]}
          />
          </label>
          {error && <div className="error">{error}</div>}
          <Button size="large" type="primary" onClick={handleChangePassword} >Alterar</Button>
     </Space>
    )
}