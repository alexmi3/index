import "../App.css";
import Axios from "axios";
import { Helmet } from "react-helmet";
import { ComboTable } from "../helpers/tables";
import { filterAlts,  /*waterLess */ } from "../helpers/maps.js";
import { useEffect, useState, useMemo } from "react";
  let columns = [
    {
      name: "Tower",
      selector: (row) => row.Number,
      format: row => `${row.Tower}`
    },
  ];

  function Alts(OG, ALT, mapList){
    columns = [{name: "Tower",selector: (row) => row.Number,format: row => `${row.Tower}`},]
    mapList.forEach(map => {
      columns.push({
        name: map.Abbrev,
        selector: row => filterAlts(OG.concat(ALT), row.Number).map(ele => ele.Map === map.Abbrev ? '✔️' : ''),
        width: '55px',
        conditionalCellStyles: [
          {
            when: row => (row.Map === map.Abbrev),
            style: { backgroundColor: '#2aa198'}
          },
          {
            when: row => (filterAlts(ALT, row.Number).map(ele => (ele.Map === map.Abbrev))),
            style: {backgroundColor: '#2aa198'}
          },]
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
  let [ALT, setALT] = useState([]);
  let [OG, setOG] = useState([]);
  let [mapList, setMapList] = useState([]);
  useEffect(() => {Axios.get('http://localhost:5000/2mpc/og/abbrev').then((res) => {setOG(res.data)})}, []);
  useEffect(() => {Axios.get('http://localhost:5000/2mpc/alt').then((res) => {setALT(res.data)})}, []);
  useEffect(() => {Axios.get('http://localhost:5000/maps').then((res) => {setMapList(res.data)})}, []);
  
  useMemo(() => Alts(OG, ALT, mapList), [OG, ALT, mapList]);

  return (
    <div>
      <Helmet>
      <title>BTD6 Index | Two Mega Pops CHIMPS | Alts</title>
      </Helmet>
      <ComboTable
        title={<b>Two Mega Pops CHIMPS Alt Maps Tracker</b>}
        columns={columns}
        data={OG}
        dense
        customStyles={customStyles}
      />
    </div>
  );
}
