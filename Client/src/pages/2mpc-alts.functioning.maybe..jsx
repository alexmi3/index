import '../App.css';
import { ComboTable } from "../helpers/tables";
import { filterAlts } from '../helpers/maps.js';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function Thing(OG, ALT, mapList, columns){
  console.log('a')
  mapList.forEach(map => {
    columns.push({
      name: map.Abbrev,
      selector: row => filterAlts(OG.concat(ALT), row.Number).map(ele => (ele.Map === map.Abbrev) ? 'x' : ''),
      width:'55px'
    })
  }) 
}
    
const customStyles = {
  headRow: {
    style: {
      fontWeight: "bold",
      fontSize: "11px",
      borderBottomColor: "#76a576",
    },
  },
  rows: {
    style: {
      "&:not(:last-of-type)": {
        borderBottomColor: "#76a576",
      },
    },
  },
  pagination: {
    style: {
      borderTopColor: "#76a576",
    },
  },
};

export function TwoMPCAlts() {
  let [OG, setOG] = useState([]);
  let [ALT, setALT] = useState([]);
  let [mapList, setMapList] = useState([]);
  useEffect(() => {Axios.get('http://localhost:5000/2mpc/og/abbrev').then((res) => {setOG(res.data)})}, []);
  useEffect(() => {Axios.get('http://localhost:5000/2mpc/alt').then((res) => {setALT(res.data)})}, []);
  useEffect(() => {Axios.get('http://localhost:5000/maps').then((res) => {setMapList(res.data)})}, []);
  
  let columns = [
    {
        name: 'Tower',
        selector: row => row.Tower,
        sortable: true,
    },
  ];
  
  useEffect(() => {Thing(OG, ALT, mapList, columns)}, [OG, ALT, mapList, columns]);

  console.log(columns)
  
  return (
  <ComboTable
      title = {<b>Two Towers CHIMPS Alt Maps Tracker</b>}
      columns = {columns}
      data = {OG}
      dense
      customStyles={customStyles}
  />
  );
}