import {
  Alert,
  Button,
  Input,
  Space,
  Table,
  Typography,
  Modal,
  message,
  Checkbox,
  Rate, 
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CloseOutlined,
  MenuOutlined,
  CommentOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./users.module.css";

export function Patients() {
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [encomenda, setEncomenda] = useState(false);
  const API_BASE_URL = "http://localhost:8082";
  const [rateModal, setRateModal] = useState(false)
  const [dataSource, setDataSource] = useState([]);
  const emptyTextConfig = {
    emptyText: "Sem dados",
  };
  const qtr = 2;
  const columns = [
    {
      key: "1",
      title: "Nome",
      dataIndex: "nome",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        // alert(value)
        return (
          String(record.nome).toLowerCase().includes(value.toLowerCase()) ||
          String(record.horarioFuncionamento).toLowerCase().includes(value.toLowerCase()) ||
          String(record.localizacao).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      key: "2",
      title: "horario de funcionamento",
      dataIndex: "horarioFuncionamento",
    },
    {
      key: "3",
      title: "localizacao",
      dataIndex: "localizacao",
    },
    {
      key: "4",
      title: "Acoes",
      render: (record) => {
        return (
          <>
            <EyeOutlined
             // onClick={() => handleShowPatient(record)}
              style={{ marginRight: 12 }}
            />
            <MenuOutlined
              onClick={() => {
               // handleEdit(record);
              }}
              style={{ marginRight: 12 }}
            />

            <CommentOutlined 
                 onClick={(record) => {
                  setRateModal(true)
                 }}
            />
           
          </>
        );
      }
     ,
    },
  ];

  const loadData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurantes`);
      setDataSource(response.data);
      console.log(response.data);
      console.log(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

 


  




 

  useEffect(() => {
    setLoading(true);
    loadData();
    setLoading(false);
  }, []);

  return (
    //<Space size={20} direction="vertical" >
    <div className={styles.container}>
     
      {/* modal editar */}
     
     
      {/* editar fim */}
      {/* <Typography.Title level={4}>Pacientes</Typography.Title> */}
      <h2 className={styles.title}>Menu</h2>
      <Space.Compact style={{ width: "100%", margin: "30px" }}>
        <Input.Search
          placeholder="Digite o nome do prato"
          name="search"
          // value={searchQuery.search || ''}
          // onChange={handleInputChange}
          allowClear
          enterButton="Pesquisar"
          size="large"
          onSearch={(value) => {
            setSearchText(value);
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        {/* <Button type="primary" onClick={() => alert('ok')}>Pesquisar</Button> */}
      </Space.Compact>

      <Modal
        title="Comentarios e avaliacoes"
        centered
        open={rateModal}
        onOk={() => {}}
        onCancel={() => {
          setRateModal(false);
        }}
      >
        <div className="styles.dateModal">
                  <div className={styles.rates}>
                      <div className={styles.rate}>
                        <div className={styles.group}>
                           <p className={styles.user}>user</p>
                           <p>data</p>
                        </div>
                           <p>comentario</p>
                      </div>
                  </div>

           <h2>Adicionar Classificacao</h2>

           <Rate allowHalf defaultValue={2.5} />

           <h2>Adiconar commentario </h2>
           <TextArea
      showCount
      maxLength={100}
     // onChange={onChange}
      placeholder="Adicione um comentario"
      style={{ height: 120, resize: 'none' }}
    />
        </div>
      </Modal>
     

      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        locale={emptyTextConfig}
      ></Table>
      
    </div>
    // </Space>
  );
}
