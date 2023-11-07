import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

function AppHeader() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const BASE_API_URL = "http://localhost:3210";
 
  const [not,setNot] = useState([
    'Palestra sobre incetivo a vacinação materno-infatil, marcada para amanha.',
    'O estoque da vacina contra tuberculose esta terminando'
  ]);
  const loggedUser = localStorage.getItem('user');
  const user = JSON.parse(loggedUser);
  
  const loadNots = async () => {
    try {
     const response = axios.get(`${BASE_API_URL}/notifications`)
     .then(response => {
       console.log(response.data)
       setNotifications(response.data)
     });
     
    } catch (error) {
       console.error(error)
    }
 }

 const markAllAsRead = () => {
  axios.put(`${BASE_API_URL}/notifications/mark-all-as-read`)
    .then(response => {
      // Notificações marcadas como lidas com sucesso
      // Atualize o estado ou faça outras ações necessárias
      console.log('Nots: ', response.data)
    })
    .catch(error => {
      // Trate erros de solicitação, se houver
      console.error('erros:', error)
    });
};


  useEffect(() => {
    loadNots()
  }, []);

  return (
    <div className="AppHeader">
      <Image
        width={50}
        height={50}
        src="https://www.portaldogoverno.gov.mz/extension/mzbwebin/design/mzbwebin/images/logo.png"
      ></Image>
      <Typography.Title>EatExplorer Inc</Typography.Title>
      
      <Drawer
        title="Mensagens"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={notifications}
          renderItem={(item) => {
            return <List.Item>{item.isReady == 0 ? `${item.msg} - nao lida` :  `${item.msg} - lida`}</List.Item>;
          }}
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
          dataSource={notifications}
          renderItem={(item) => {
            return <List.Item>{item.isReady == 0 ? `${item.msg} - nao lida` :  `${item.msg} - lida`}</List.Item>;
          }}
        ></List>
      </Drawer>
    </div>
  ); 
}
export default AppHeader;
