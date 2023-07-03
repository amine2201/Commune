import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { ArcElement} from 'chart.js'
Chart.register(ArcElement);
import {CategoryScale} from 'chart.js'; 
import Navbar from './Navbar';
Chart.register(CategoryScale);

const StatsComponent: React.FC = () => {

  useEffect(() => {
    localStorage.setItem('user',"president@commune.com")
        axios.get('http://localhost:8080/api/v1/president/stats').then((response) => {
            const data = response.data;
            setEmployees(data.employees);
            setCitizens(data.citizens);
            setTotalDocuments(data.documents);
            setValidatedDocuments(data.documentsAccepted);
            }).catch((error) => {  
            console.log(error);  
            });
  }, []);


const [employees,setEmployees] = useState(10);
const [citizens,setCitizens] = useState(20);
const barData = {
    labels: ["Employés", "Citoyens"],
    datasets: [
      {
        label : "nombre d'employés et de citoyens",
        data: [employees, citizens],
        backgroundColor: ["#007D9C", "#244D70"],
        borderColor: ["#007D9C", "#244D70"],
        borderWidth: 1,
      },
    ],
  };

  const [totalDocuments,setTotalDocuments] = useState(100);
  const [validatedDocuments,setValidatedDocuments] = useState(20);
  const pieData = {
    labels: ["nombre total des Documents", "ombre total des Documents signés"],
    datasets: [
      {
        label: "documents signés par rapport au nombre total",
        data: [totalDocuments, validatedDocuments],
        backgroundColor: ["#D123B3", "#F7E018"],
        borderColor: ["#D123B3", "#F7E018"],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    console.log(pieData);
console.log(barData);});
  return (
    <>
    <Navbar isAuthenticated={true}/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="shadow rounded p-4 ">
        <Pie data={pieData}  options={{ maintainAspectRatio: false }}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Bar data={barData} />
      </div>
    </div>
    </>
  );
};

export default StatsComponent;
