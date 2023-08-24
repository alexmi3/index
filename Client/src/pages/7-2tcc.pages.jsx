import "../App.css";
import { Helmet } from "react-helmet";
import { Rules } from "../helpers/actions.js";
import { changeMap, filterAlts } from '../helpers/maps.js';
import { AltsTable, CombosWithAlts } from "../helpers/tables.js";
import Axios from "axios";
import { useState, useEffect } from "react";

let ALT;
Axios.get('http://localhost:5000/2tcc/alt').then((res) => {ALT = res.data})

const columns = [
  {
    name: "Number",
    selector: (row) => row.Number,
    sortable: true,
  },
  {
    name: "Tower 1",
    selector: (row) => row["Tower 1"],
    sortable: true,
  },
  {
    name: "Tower 2",
    selector: (row) => row["Tower 2"],
    sortable: true,
  },
  {
    name: "Upgrades",
    selector: (row) => row.Upgrades,
  },
  {
    name: "Map",
    selector: (row) => row.Map,
    sortable: true,
  },
  {
    name: "Version",
    selector: (row) => row.Version,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.Date,
    sortable: true,
  },
  {
    name: "Person 1",
    selector: (row) => row['Person 1'],
    sortable: true,
  },
  {
    name: "Person 2",
    selector: (row) => row['Person 2'],
    sortable: true,
  },
  {
    name: "Link",
    selector: (row) => row.Link,
    sortable: true,
    format: row => {
      if(row.Link.includes('youtu.be')){return <a href={row.Link}>YouTube</a>}
      else if(row.Link.includes('reddit')){return <a href={row.Link}>Reddit</a>}
      else if(row.Link.includes('imgur')){return <a href={row.Link}>Image</a>}
      else {return <a href={row.Link}>Link</a>}
    }
  },
  {
    name: "Starting Cash",
    selector: (row) => row['Starting Cash'],
    format: row => '$'.concat(row['Starting Cash'].toLocaleString()),
  },
];

const columnsNested = [
  {
    name: "Map",
    selector: (row) => row.Map,
    sortable: true,
  },
  {
    name: "Person 1",
    selector: (row) => row['Person 1'],
    sortable: true,
  },
  {
    name: "Person 2",
    selector: (row) => row['Person 2'],
    sortable: true,
  },
  {
    name: "Link",
    selector: (row) => row.Link,
    sortable: true,
    format: row => <a href={`https://${row.Link}`}>Link</a>
  },
];

let expandComponent = ({ data }) => (
  <AltsTable
    columns={columnsNested}
    data={filterAlts(changeMap(ALT, 'Abbrev.'), data.Number)}
    noDataComponent={`No Alt Maps Found For Combo #${data.Number}`}
  />
);

let listRules = [
  {
    name: "Objective",
    rule: "Complete a game of CHIMPS on any map in co-op with only 2 towers placed throughout the entire game. A 2TC cannot be done as a 2TCC, unless impossible as a 2TC but not as a 2TCC.",
  },
  {
    name: "Sacrificing (Adora/Temple)",
    rule: "Sacrificing towers is allowed, but you cannot buy back any sacrificed towers.",
  },
  {
    name: "Proof Requirement",
    rule: "Video proof of rounds considered impossible is required for new completions without exceptions.",
  },
  {
    name: "Version Discrepancy",
    rule: "A combo must start and end in the same version, including sub-versions (e.g. 8.0 and 8.1 are considered different versions).",
  },
  {
    name: "Update Grace Period",
    rule: "A combo must either be completed in the current version or precisely one day after the next update.",
  },
  {
    name: "Alternate Accounts",
    rule: "Alternate Accounts are not allowed, unless it is being used to give extra coop cash then immediately leaving",
  },
  {
    name: "Hacks/Mods",
    rule: "Hacks and mods are not allowed, including speedhack.",
  }
];

export function TwoTCC() {
  let [OG, setOG] = useState()
  useEffect(() => {Axios.get('http://localhost:5000/2tcc/og').then((res) => {setOG(res.data)})}, [])

  return (
    <div>
      <Helmet>
        <title>BTD6 Index | Two Towers CHIMPS Co-op</title>
      </Helmet>

      <CombosWithAlts
        title={<b>Two Towers CHIMPS Co-op</b>}
        columns={columns}
        data={OG}
        expandableRowsComponent={expandComponent}
        actions={Rules(listRules)}
      />
    </div>
  );
}
