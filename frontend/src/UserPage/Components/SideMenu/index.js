import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
      style={{marginTop : '10px', borderRadius : '20px'}}
        className="SideMenuVertical"
        mode="inline"
        onClick={(item) => {
          if(item.key == "/logout"){
            Modal.confirm({
              title: 'Tem a certeza que pretende sair?',
              okText: 'Sim',
              cancelText: 'nao',
              okType: 'danger',
              onOk: ()=> {
                   //item.key
          navigate(item.key);
              }
            })
          }else{
            //item.key
          navigate(item.key);
          }
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Inicio",
            icon: <AppstoreOutlined />,
            key: "/user",
          },
         
          {label : "Sair" , key : "/logout", danger : "true"}
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
