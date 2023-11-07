import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BranchesOutlined,
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
        className="SideMenuVertical"
        style={{marginTop : '10px', borderRadius : '20px'}}
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
            label: "inicio",
            icon: <AppstoreOutlined />,
            key: "/admin",
          },
          {title : "ok",label : "Sair" , key : "/logout", danger : "true"}
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
