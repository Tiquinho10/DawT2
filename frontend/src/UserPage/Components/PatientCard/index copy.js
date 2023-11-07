import { useState } from 'react';
import styles from './patientCard.module.css'
import QRCode from 'react-qr-code';
import QrReader from 'react-qr-reader';
import { QrCodeScanner } from '../QrCodeScanner';
//import { QrReader } from 'modern-react-qr-reader';



export function PatientCardTest({id,name, contact, date, vaccines, nextVaccine, nextVaccineDate, address, healthCentre}){
 const [inputValue, setInputValue] = useState(id);
 const [scannedId, setScannedId] = useState('');

 const webCamError = (error) => {
    if(error){
        console.log(error);
    }
 }

 const webCamScan = (result) => {
    if(result){
        setScannedId(result);
    }
 }

 const handleScan = (data) => {
    setScannedId(data);
    // Aqui você pode fazer o processamento adicional com o ID escaneado, como enviar para a API, etc.
  };

    return(
             
            <div className={styles.card}>
                 
             <div className={styles.left}>
                  <p className={styles.title}>Dados do Paciente</p>
                  <div className={styles.info}>
                  <p><span className={styles.subTitle}>Nome</span>: </p>
                  <p className={styles.infoValue}>{name}</p>
                  </div>

                  <div className={styles.info}>
                  <p><span className={styles.subTitle}>Contacto do encarregado</span>:</p>
                  <p className={styles.infoValue}>{contact}</p>
                  </div>

                  <div className={styles.info}>
                  <p><span className={styles.subTitle}>Data de nascimento</span>:</p>
                  <p className={styles.infoValue}>{date}</p>
                  </div>

                  <div className={styles.info}>
                  <p><span className={styles.subTitle}>Proxima(s) Vacina(s)</span>:</p>
                  <p className={styles.infoValue}>{nextVaccine}</p>
                  </div>

                  <div className={styles.info}>
                  <p><span className={styles.subTitle}>Data da Proxima dose</span>:</p>
                  <p className={styles.infoValue}>{nextVaccineDate}</p>
                  </div>

                  <div className={styles.info}>
                  <p><span className={styles.subTitle}>Bairro</span>:</p>
                  <p className={styles.infoValue}>{address}</p>
                  </div>

                  <div className={styles.info}>
                  <p><span className={styles.subTitle}>Centro de Saude</span>:</p>
                  <p className={styles.infoValue}>{healthCentre}</p>
                  </div>

             </div>
                    <div className={styles.right}>
                    <h2>QRCode</h2>
                    {/* <input  onChange={(e) => {
                         setInputValue(e.target.value)
                    }} /> */}
                
                  <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>
                  <QRCode 
                     size={256}
                     style={{height: "auto", maxWidth: "100%"}}
                    value={id.toString()}
                   // value={'https://linktr.ee/luiztiquejr'}
                     viewBox={`0 0 256 256`}
                  />
                  </div>


                    <p className={styles.title}>Dados de Vacinas</p> 
                    <p><span className={styles.title}>Calendario De Vacinação </span>: </p>
                        {/* {vaccines.map((dosageVaccine) => {
                            const vaccinesList = dosageVaccine.vacinnes;
                            {console.log('dosage', dosageVaccine.dosageDate
                            )}
                            return vaccinesList.map((vaccine, index) => (
                            <li key={index}>{vaccine.name} - {dosageVaccine.dosageDate}</li>
                            ));
                        })} */}

                        {/* <table className={styles.tableContent}>
                            <thead>
                                 <tr>
                                    <th>Idade(meses)</th>
                                   <th>Vacina(s)</th>
                                    <th>Data da Aplicacao</th>
                                 </tr>                    
                            </thead>
                            <tbody >
                                {console.log('count:', vaccines.length)}
                                {vaccines.map((dosageVaccine) => {
                            const vaccinesList = dosageVaccine.vacinnes;
                          
                            return vaccinesList.map((vaccine, index) => (
                                
                               <tr>
                                <td key={vaccine.id}>{`${vaccine.name} - ${dosageVaccine.id}`}</td>
                                <td key={vaccine.id}>{dosageVaccine.dosageDate}</td>
                               </tr> 
                            
                            ));
                        })}
                               
                               
                            </tbody>
                            
                        </table> */}
                        <table className={styles.tableContent}>
                            <thead>
                                 <tr>
                                     <th>Idade(meses)</th>
                                   <th>Vacina(s)</th>
                                    <th>Data da Aplicacao</th>
                                 </tr>                    
                            </thead>
                            <tbody >
                              { vaccines.map((vaccine, index) => {
                              vaccine.vaccines.map((vaccine) => {
                                       {console.log(`vaccineName: ${vaccine.name} - ${vaccine.id} `)}
                              })})}
                               
                                {vaccines.map((calendar) => (
                            <tr key={calendar.ageInMonths}> 
                                <td >{`${calendar.ageInMonths} `}</td>
                                {/* <td>  
                                    <ul>
                                     { calendar.vaccines.map((vaccine) => (
                                   <li key={vaccine.id}>{vaccine.name}</li>
                                      ))};                        
                                    </ul> 
                            </td>          */}
                            <td>
                             {calendar.vaccines.map((vaccine, index) => (
                             <span key={vaccine.id}>
                                 {vaccine.name}
                                 {index < calendar.vaccines.length - 1 ? ', ' : ''}
                            </span>
                                ))}
                            </td>
                            <td>{calendar.date}</td>
                            </tr>  
                        ))}
                            </tbody> 
                        </table>
                    </div>
                 
            </div>
    )
}

{/*<div>
<h1>Minha Aplicação</h1>
 <QrReader
    //scanDelay={3000}
   // onError={webCamError}
    onScan={webCamScan}
    
    //onResult={webCamScan}
   // facingMode={"user"}
    
  //  onResult={(result, error) => {
  //      if(!!result){
  //         console.log(result?.text);
  //      }

  //      if(!!error){
  //         console.log(error);
  //      }
  //  }
  // }
   style={{width: '100%'}}
/> *
<QrReader
delay={3000}
  onError={webCamError}
  onScan={webCamScan}
  facingMode={"environment"}
/>
{/* <QrCodeScanner onScan={handleScan} />
{scannedId && <p>Scanned ID: {scannedId}</p>} 
</div>*/}