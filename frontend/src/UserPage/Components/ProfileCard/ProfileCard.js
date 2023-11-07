import styles from './profile.module.css'
import { Button } from 'antd';
import {EditOutlined }from "@ant-design/icons";

export function ProfileCard({name, contact, age, vaccines, nextVaccine, nextVaccineDate, editNextVaccineDate}){



    return (
        <div className={styles.card} >
         {/* <h1>Dados do Paciente</h1> */}
            <div className={styles.cardContent}>
                <p ><span className={styles.title}>Nome</span> : {name}</p>
                <p><span className={styles.title}>Contacto do encarregado</span> : {contact}</p>
                <p><span className={styles.title}>Idade(meses)</span> : {age}</p>
                <p><span className={styles.title}>Proxima(s) vacina(s)</span> : {nextVaccine.map((vaccine) => (
                <p key={vaccine.id}>- {vaccine.name}</p>    
           ))}</p>
                <p><span className={styles.title}>Data da Proxima dose</span> : {nextVaccineDate} <span><Button  
                type="primary" 
                 shape="circle"
                 icon={<EditOutlined />} 
                 onClick={editNextVaccineDate}
                 /></span></p>
            </div>
       
        <div className={styles.vaccineInfo}>
         <p><span className={styles.title}>Vacinas Tomadas</span> :   </p>
            {vaccines.length === 0 ? (
                <p>sem vacinas tomadas</p>
            ) : (
                <ul className={styles.list}> 
           {vaccines.map((dosageVaccine) => {
                <li>{dosageVaccine.id}</li>
                const vaccinesList = dosageVaccine.vacinnes;

                return vaccinesList.map((vaccine, index) => (
                     <li key={index}>{vaccine.name}</li>
                ))
               
            })}
                </ul>    
            )}
        
        </div> 
        </div>
    )
}
// incons
//mostrar um perfi do usuario ao clicar no olho
//<EyeOutlined />

// export function ProfileCard({ name, contact, date, vaccines }) {
//     return (
//       <div className={styles.card}>
//         <h1>Dados do Paciente</h1>
//         <div className={styles.cardInfo}>
//           <p>
//             <span className={styles.title}>Nome</span> : {name}
//           </p>
//           <p>
//             <span className={styles.title}>Contacto do encarregado</span> : {contact}
//           </p>
//           <p>
//             <span className={styles.title}>Data de nascimento</span> : {date}
//           </p>
//           <p>
//             <span className={styles.title}>Vacinas</span> : 
//             {vaccines.map((vaccine, index) => (
//               <span key={index}>{vaccine}</span>
//             ))}
//           </p>
//         </div>
//       </div>
//     );
//   }

//const vaccines = patient.vaccines.map(vaccine => vaccine.vacinneDTO);
// return (
//     <div>
//       <h1>Exemplo de Componente</h1>
//       <ProfileCard
//         name={patient.name}
//         contact={patient.contact}
//         date={patient.dateOfBirth}
//         vaccines={vaccines}
//       />
//     </div>
//   );

  