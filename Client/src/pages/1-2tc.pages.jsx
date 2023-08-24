import "../App.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Rules } from "../helpers/actions.js";
import { changeMap, filterAlts } from '../helpers/maps.js';
import { AltsTable, CombosWithAlts } from "../helpers/tables.js";

let ALT;
Axios.get('http://localhost:5000/2tc/alt').then((res) => {ALT = res.data})

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
    name: "Person",
    selector: (row) => row.Person,
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
];

const columnsNested = [
  {
    name: "Map",
    selector: (row) => row.Map,
    sortable: true,
  },
  {
    name: "Person",
    selector: (row) => row.Person,
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
    data={filterAlts(changeMap(ALT, 'Abbrev'), data.Number)}
    noDataComponent={`No Alt Maps Found For Combo #${data.Number}`}
  />
);

let listRules = [
  {
    name: "Objective",
    rule: "Complete a game of CHIMPS on any map with only 2 towers placed throughout the entire game.",
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
    name: "Challenge Code Restrictions",
    rule: "A code proving the completion of a combo must also have the associated path/upgrade restrictions (as of v16.0).",
  },
  {
    name: "Hacks/Mods",
    rule: "Hacks and mods are not allowed, with the exception of speedhack under certain conditions. You cannot use speedhack maliciously, as in to take someone's combo, nor use it within 3 days of a new major update.",
  },
  {
    name: "1 Tower CHIMPS (1TC)",
    rule: "If a tower has a 1TC completed, all combos with that tower will be removed from the list.",
  },
];

export function TwoTC() {
  let [OGList, setOGList] = useState()
  useEffect(() => {Axios.get('http://localhost:5000/2tc/og').then((res) => {setOGList(res.data)})}, [])

  return (
    <div>
      <Helmet>
        <title>BTD6 Index | Two Towers CHIMPS</title>
      </Helmet>

      <CombosWithAlts
        title={<b>Two Towers CHIMPS</b>}
        columns={columns}
        data={OGList}
        expandableRowsComponent={expandComponent}
        actions={Rules(listRules)}
      />
    </div>
  );
}
