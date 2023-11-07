import { useEffect, useState } from "react";
import { RoutesApp } from "./Router";
import { PatientCard } from "./UserPage/Components/PatientCard";
import axios from "axios";
function App() {
 const [vaccines,setVaccines] = useState([]);
 const API_BASE_URL = "http://localhost:3210";


 const loadData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patient/dto`);

      // response.data[0].vaccines.map((vaccine) => {
      //        console.log(vaccine)
      // } )
      const data = response.data[0];
  //    const list = vaccinesList[0].vaccines.map((vaccine) => {
  //       console.log(vaccine.name);
  //  })

     // console.log('ya: ',response.data[0])
    //  console.log('Dosagem: ', vaccinesList.vaccines.map((vaccine) => {
    //       console.log(vaccine.name);
    //  }))
    // console.log(vaccinesList[0].user)
   // console.log(vaccinesList)
   setVaccines(data.dosageVaccines);
   data.dosageVaccines.forEach((dosageVaccine) => {
    const vaccinesList = dosageVaccine.vacinnes;
    vaccinesList.forEach((vaccine) => {
      console.log(vaccine.name);
    });
  });
    } catch (error) {
       console.error('error: ', error)
    }
 }

 useEffect(() => {
 // loadData();
}, []);


  return (
   <RoutesApp />
  //<PatientCard vaccines={vaccines}/>
  );
}

export default App;
