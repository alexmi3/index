import "../App.css";
import { Helmet } from "react-helmet";
import { Rules } from "../helpers/actions.js";
import { changeMap, filterAlts } from '../helpers/maps.js';
import { AltsTable, CombosWithAlts } from "../helpers/tables.js";
import Axios from 'axios';
import { useEffect, useState } from 'react'

let ALT;
Axios.get('http://localhost:5000/2mpc/alt').then((res) => {ALT = res.data})

const columns = [
  {
    name: "Number",
    selector: (row) => row.Number,
    sortable: true,
  },
  {
    name: "Tower",
    selector: (row) => row.Tower,
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
  }
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
    rule: "One tower/hero must have a total of or exceeding 2 million pops (damage) after round 100.",
  },
  {
    name: "Stolen Pops",
    rule: "The combined pop count of all other towers that exist or have ever existed cannot exceed 42,543",
  },
  {
    name: "Tiebreaking",
    rule: "Third tier or above towers are considered identical if they have the same upgrades ignoring crosspathing. Second tier or below is considered the \"base\" tower.",
  },
  {
    name: "Proof Requirement",
    rule: "All completions must have a recording of you clicking through all the towers showing stolen pops, and showing challenge stats. The submission doesn't need to be the video, but you do need to provide the video.",
  },
  {
    name: "Benjamin",
    rule: "Benjamin is allowed as long as he doesn't reach Level 7 by the end of the game.",
  },
  {
    name: "Geraldo",
    rule: "2MPC with Darts affected by the Worn Hero's Cape count as Super 2MPCs instead of Dart.",
  },
];

export function TwoMPC() {
  let [OG, setOG] = useState()
  useEffect(() => {Axios.get('http://localhost:5000/2mpc/og').then((res) => {setOG(res.data)})}, [])

  return (
    <div>
      <Helmet>
        <title>BTD6 Index | Two Mega Pops CHIMPS</title>
      </Helmet>
      <CombosWithAlts
        title = {<b>Two Mega Pops CHIMPS</b>}
        columns={columns}
        data={OG}
        expandableRowsComponent={expandComponent}
        actions={Rules(listRules)}
      />
    </div>
  );
}
