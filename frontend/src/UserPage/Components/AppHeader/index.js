import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography, Button, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";

function AppHeader() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const API_BASE_URL = "http://localhost:8082";
  const loggedUser = localStorage.getItem('user');
const user = JSON.parse(loggedUser);
const [formData, setFormData] = useState({});
const [userY , setUsery ] = useState(null);
const [error, setError] = useState("")

const loadData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    console.log(response.data)
    console.log(response.data.length)
  } catch (error) { 
    console.error(error);
  }
}

const handleChange = (e) =>{
  const {name, value} = e.target;
  setFormData({...formData, [name] : value})  
}
const handleChangeEdit = (e) =>{
const {name, value} = e.target;

setUsery (pre=>{
  return {...pre, [name]: value}
})
setFormData(
  {...formData, user }
)
}

const handleSubmit = async (e) =>{
  e.preventDefault();
  console.log((!formData.firtsName) || (!formData.lastName)  || (!formData.email))
  // if(!formData.firtsName || !formData.lastName  || !formData.email){
  //   setError("Por favor preencha todos campos")
  //   return;
  // }
  //const response = axios.post()
  try {
    await axios.post(`${API_BASE_URL}/user`, formData)
    .then((response) => {
       loadData();
    setFormData({})
    setTimeout(() => {
      message.success('Administrador adicionado com sucesso')
  }, 1000)

  setTimeout(() => {
      message.info('O Administrador foi atribuido uma senha padrao: admin1234, que podera ser alterada pelo mesmo.')
  }, 4000)

  setError("");
  setModalOpen(false)
    })
  } catch (error) {
    setError(error.response.data.message)
    console.error(error);
  }

  console.log(`1 + 2`)
  console.log(formData)
  
}


const handleEditSubmit = async (e) =>{
  e.preventDefault();
  if(user.firtsName == null || user.lastName == null || user.email == null){
    setError("Por favor preencha todos campos")
    return;
  }
  //const response = axios.post()
  try {
    await axios.put(`${API_BASE_URL}/user/${user.id}`, user)
    .then((response) => {
      loadData();
    setFormData({})
    setTimeout(() => {
      message.success('Administrador editado com sucesso')
  }, 1000);
  setError("");
  setModalOpen2(false)
    }); 
  } catch (error) {
    console.error(error);
    setError(error.response.data.message)
  }

  
}


const handleReset = () => {
  setFormData({})
  setError('')
}

const handleEdit = (record) => {
   //alert(record.id)
   //modalito(record, true);
   setUsery (record)
   console.log(user )
   setModalOpen2(true);
}


  const loadNots = async () => {
     try {
      const response = axios.get(`${API_BASE_URL}/notifications`)
      .then(response => {
        console.log(response.data)
        setNotifications(response.data)
      });
      
     } catch (error) {
        console.error(error)
     }
  }




  useEffect(() => {
      loadNots();
  }, []);

  return (
    <div className="AppHeader">
      <Image
        width={50}
         height={50}
        src="https://www.portaldogoverno.gov.mz/extension/mzbwebin/design/mzbwebin/images/logo.png"
      ></Image>
      <Typography.Title>EatExplorer Inc</Typography.Title>
      <Space>
        {user && (
          <Typography.Title level={3}>{`${user.name}`}</Typography.Title>
        )}

       {user && (
          <div>
            <Button onClick={() => {
            setModalOpen(true)
          }}>criar conta</Button>

           <Button onClick={() => {
                navigate('/');
          }}>Entrar</Button>
          </div>

          
          
        )}
       
      </Space>
      <Drawer
        title="Mensagens"
        maskClosable
      >
        <List
          //dataSource={notifications}
        ></List>
      </Drawer>
      <Drawer
        title="Notificações"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          // dataSource={notifications}
          // renderItem={(item) => {
          //   return <List.Item>{item.isReady == 0 ? `${item.msg} - nao lida` :  `${item.msg} - lida`}</List.Item>;
          // }}
        ></List>
      </Drawer>

      <Modal
        title="Adicionar Agente"
        centered
        open={modalOpen}
       // onOk={() => setModalOpen(false)}
        onCancel={() => {
          setModalOpen(false)
          handleReset();
        }}
        footer={[
          <Button key="cancel" onClick={() =>{
            setModalOpen(false)
            handleReset();
          } }>
            Cancelar
          </Button>,
          <Button key="save" type="primary" htmlType="submit" onClick={handleSubmit}>
            Salvar
          </Button>
        ]}
      >
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          {/* <input type="text" name="name" value={formData.name || ''} onChange={handleChange} /> */}
          <Input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange}
            required
          />
        </label>
        <label>
          Apelido: 
          {/* <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} />   */}
          <Input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} required/>
        </label>

        <label>
          Email: 
          {/* <input type="text" name="email" value={formData.email || ''} onChange={handleChange} />   */}
           <Input type="email" name="email" value={formData.email || ''} onChange={handleChange} required/>
        </label>

        <label>
          Password: 
          {/* <input type="text" name="email" value={formData.email || ''} onChange={handleChange} />   */}
           <Input type="password" name="password" value={formData.password || ''} onChange={handleChange} required/>
        </label>
        {error && <div className="error">{error}</div>}
      
      </form>
      
      </Modal>
    </div>
  );
}
export default AppHeader;