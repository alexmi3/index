import "../App.css";
import { Helmet } from "react-helmet";
import { Rules } from "../helpers/actions.js";
import { CombosWithAlts, AltsTable } from "../helpers/tables.js";
import { useState, useEffect } from "react";
import Axios from "axios";
import { filterAltsFttc } from '../helpers/maps.js'

let ALT;
Axios.get('http://localhost:5000/fttc/alt').then((res) => {ALT = res.data})

const columns = [
  {
    name: "Map",
    selector: (row) => row.Map,
    sortable: true,
  },
  {
    name: "Number of Towers",
    selector: (row) => row["Number of Towers"],
    sortable: true,
  },
  {
    name: "Tower(s)",
    selector: (row) => row["Tower(s)"],
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
    name: "Tower(s)",
    selector: (row) => row['Tower(s)'],
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
    data={filterAltsFttc(ALT, data.Map)}
    noDataComponent={`No Alt Combos found for ${data.Map}`}
  />
);


let listRules = [
  {
    name: "Heroes",
    rule: "No heroes allowed!",
  },
  {
    name: "Alt Combos",
    rule: "Must use the same number of tower types as the current record. The X-tower-type combination must be unique for the map.",
  },
  {
    name: "Restrictions",
    rule: "You may use as many of each enabled tower type as you need. A map's FTTC tower type amount for alternate completions must be less than that map's heroless LTC. This is to prevent combo overflows on \"milkable\" maps.",
  }
];

export function FTTC() {
  let [OG, setOG] = useState()
  useEffect(() => {Axios.get('http://localhost:5000/fttc/og').then((res) => {setOG(res.data)})}, [])

  return (
    <div>
      <Helmet>
        <title>BTD6 Index | Fewest Tower Types CHIMPS</title>
      </Helmet>

      <CombosWithAlts
        title={<b>Fewest Tower Types CHIMPS</b>}
        columns={columns}
        data={OG}
        expandableRowsComponent={expandComponent}
        actions={Rules(listRules)}
      />
    </div>
  );
}