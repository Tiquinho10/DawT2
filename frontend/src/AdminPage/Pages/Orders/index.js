import { Avatar, Button, Input, Space, Table, Typography ,  Modal, message} from "antd";
import { EditOutlined, DeleteOutlined , EyeOutlined, PlusCircleOutlined, MenuOutlined, CommentOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './vaccines.module.css'


  
export function Vaccines(){
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalOpen3, setModalOpen3] = useState(false);
    const [formData, setFormData] = useState({});
    const [restaurante , setRestaurante ] = useState(null);
    const [error,setError] = useState("");
    
   
  const API_BASE_URL = "http://localhost:8082";
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
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
            < EditOutlined
              onClick={() => handleEdit(record)}
              style={{ marginRight: 12 }}
            />
            <PlusCircleOutlined
              onClick={() => {
               // handleEdit(record);
              }}
              style={{ marginRight: 12 }}
            />

              <DeleteOutlined
              onClick={() => {
                handleDelete(record);
              }}
              style={{ marginRight: 12 }}
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

  setRestaurante (pre=>{
    return {...pre, [name]: value}
  })
  setFormData(
    {...formData, restaurante }
  )
}

const handleSubmit = async (e) =>{
    e.preventDefault();
    //const response = axios.post()
    if(formData.nome == null || formData.horarioFuncionamento == null || formData.localizacao == null){
      setError("Por favor preencha todos campos")
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/restaurantes`, formData)
      .then((response) => {
        loadData();
        setTimeout(() => {
          message.success('rest adicionada com sucesso')
      }, 1000)
      setModalOpen(false);

      handleReset();
      });
      
    } catch (error) {
      console.error(error);
      setError(error.response.data.message)
    }
  
  
  }

  const handleEditSubmit = async (e) =>{
    e.preventDefault();
  
    try {
     // await axios.post(`${API_BASE_URL}/vaccine `, formData);
      await axios.put(`${API_BASE_URL}/restaurantes/${parseInt(restaurante.id)}`, restaurante)
      .then((response) => {
        loadData();
        setTimeout(() => {
          message.success('restaurante atualizado com sucesso')
      }, 1000)
      setModalOpen2(false);
      handleReset();
      });
    
    
    } catch (error) {
      console.error(error);
      setError(error.response.data.message)
    }

    
  }

  const handleAddUnitsSubmit = async (e) =>{
    e.preventDefault();
    // if(vaccine.name == null || vaccine.descricao == null || vaccine.lot == null || vaccine.expiresAt == null || vaccine.units == null){
    //   setError("Por favor preencha todos campos")
    //   return;
    // }
     if(count == 0){
         setError("Por favor insira a quantidade")
     }
    restaurante.units += count;
    
    //const response = axios.post()
    try {
     // await axios.post(`${API_BASE_URL}/restaurante `, formData);
      await axios.put(`${API_BASE_URL}/restaurante/${parseInt(restaurante.id)}`, restaurante)
      .then((response) => {
        loadData();
        setTimeout(() => {
          message.success('Quantidade adicionada com sucesso')
      }, 1000)
      setModalOpen3(false);
      handleReset();
      });
    
    
    } catch (error) {
   console.error(error);
      setError(error.response.data.message)
    }

    
  }


  
  const handleReset = () => {
    setFormData({})
    setError("");
    setCount(1);
  }

  const handleEdit = (record) => {
     //alert(record.id)
     //modalito(record, true);
     setRestaurante (record)
     console.log(restaurante )
     setModalOpen2(true);
  }

  const handleAddUnits = (record) => {
    setRestaurante (record)
    console.log(restaurante )
    setModalOpen3(true);
  }

  const handleDelete = (record ) => {
      //alert(record.id)
      Modal.confirm({
        title: 'Tem a certeza que pretende remover?',
        okText: 'Sim',
        cancelText: 'nao',
        okType: 'danger',
        onOk: ()=> {
            setDataSource((prev) => {
                return prev.filter((restaurante ) => restaurante.id !== record.id)
              })
        }
      })
  }

  

  useEffect(() => {
    setLoading(true);
    loadData();
    setLoading(false);
  }, []);

  return (
     <div className={styles.container}>
   {/* <Space size={20} direction="vertical"> */}
         <Modal
        title="Adicionar restaurante"
        centered
        open={modalOpen}
       // onOk={() => setModalOpen(false)}
        onCancel={() => {
           handleReset();
          setModalOpen(false)}}
        footer={[
          <Button key="cancel" onClick={() => {
            handleReset();
            setModalOpen(false);
          }}>
            Cancelar
          </Button>,
          <Button key="save" type="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        ]}
      >
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          {/* <input type="text" name="name" value={formData.name || ''} onChange={handleChange} /> */}
          <Input type="text" name="nome" value={formData.nome || ''} onChange={handleChange}
            required
            rules={[{required: true, message: "por favor digite o nome da vacina"}]}
          />
        </label>
        <label>
        horario de funcionamento: 
          {/* <input type="text" name="descricao" value={formData.descricao || ''} onChange={handleChange} />   */}
          <Input type="text" name="horarioFuncionamento" value={formData.horarioFuncionamento || ''} onChange={handleChange} required/>
        </label>

        <label>
        localizacao: 
          {/* <input type="text" name="lot" value={formData.lot || ''} onChange={handleChange} />   */}
           <Input type="text" name="localizacao" value={formData.localizacao || ''} onChange={handleChange} required/>
        </label>
        
          {error && <div className="error">{error}</div>}
      </form>
      
      </Modal>

      {/* modal editar */}
      <Modal
        title="Editar"
        centered
        open={modalOpen2}
       // onOk={() => setModalOpen(false)}
        onCancel={() => {
           handleReset();
          setModalOpen2(false)}}
        footer={[
          <Button key="cancel" onClick={() => {
            handleReset();
            setModalOpen2(false);
          }}>
            Cancelar
          </Button>,
          <Button key="save" type="primary" onClick={handleEditSubmit}>
            Editar
          </Button>
        ]}
      >
      <form onSubmit={handleEditSubmit}>

      <input type="hidden" name="id" value={restaurante ? restaurante.id || '' : ''} onChange={handleChangeEdit} />
      <label>
          Nome:
          {/* <input type="text" name="name" value={formData.name || ''} onChange={handleChange} /> */}
          <Input type="text" name="nome" value={restaurante?.nome || ''} onChange={handleChangeEdit} required/>
        </label>
        <label>
          horario de funcionamento: 
          {/* <input type="text" name="descricao" value={formData.descricao || ''} onChange={handleChange} />   */}
          <Input type="text" name="descricao" value={restaurante?.horarioFuncionamento || ''} onChange={handleChangeEdit} required/>
        </label>

        <label>
          preco: 
          {/* <input type="text" name="lot" value={formData.lot || ''} onChange={handleChange} />  */}
          <Input type="text" name="localizacao" value={restaurante?.localizacao || ''} onChange={handleChangeEdit} required/> 
        </label>
       {error && <div className="error" >{error}</div>}
       </form>
      
      </Modal>
{/* editar fim */}
  <Modal
   title="Adicionar Quantidade"
   centered
   open={modalOpen3}
  // onOk={() => setModalOpen(false)}
   onCancel={() => {
      handleReset();
     setModalOpen3(false)}}
   footer={[
     <Button key="cancel" onClick={() => {
      setCount(1)
       handleReset();
       setModalOpen3(false);
     }}>
       Cancelar
     </Button>,
     <Button key="save" type="primary" onClick={handleAddUnitsSubmit}>
       Salvar
     </Button>
   ]}
  >
      <p> Unidades Disponiveis: {restaurante?.units || ''}</p>

        <label className={styles.quantity}> 
      {/* <Space direction="horizontal"> */}
          <Button style={{color: 'gray', backgroundColor: '#f0f0f0', fontWeight: '900'}} onClick={() => {
            if(count > 1){
              setCount(prevQuantity => prevQuantity - 1)
            }
             
          }}>-</Button>
          <Input  size="small" type="text" inputMode="numeric" min={1} name="units"   value={count !== 0 ? count : ''}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              if (!isNaN(newValue)) {
                setCount(newValue);
              }else{
                setCount(0)
              }
            }}
          required />  
          <Button style={{color: 'gray', backgroundColor: '#f0f0f0', fontWeight: '900'}} onClick={() => {
              setCount(prevQuantity => prevQuantity + 1)
          }}>+</Button>
         {/* </Space> */}
        </label>
  </Modal>
      {/* <Typography.Title level={4}>Vacinas</Typography.Title> */}
      <h2 className={styles.title}>Admin restaurante</h2>
      <Space.Compact style={{ width: '100%', margin : '30px' }}>
      <Input.Search 
       placeholder="Pesquise pelo nome, descricao e unidades"
       allowClear
       enterButton="Pesquisar"
       size="large"
      name="search"
     // value={searchQuery.search || ''}
     // onChange={handleInputChange}
     
       onSearch={(value)=>{
          setSearchText(value);
       }}
        onChange={(e) => {
          setSearchText(e.target.value)
        }}
      />
      {/* <Button type="primary" onClick={() => alert('ok')}>Pesquisar</Button> */}
    </Space.Compact>
         <Button className={styles.btnAdd} type="primary" onClick={() => setModalOpen(true)}>Adicionar restaurante</Button>
         <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
         >

         </Table>
    {/* </Space> */}
    </div>
  );

}
