import { Helmet } from "react-helmet";
import { AvgCost, Rules } from "../helpers/actions.js";
import { getDifficulty } from "../helpers/maps";
import { ComboTable } from "../helpers/tables.js";
import Axios from "axios";
import { useState, useEffect } from "react";

const columns = [
  {
    name: "Map",
    selector: (row) => row.Map,
    sortable: true,
  },
  {
    name: "Cost",
    selector: (row) => row.Cost,
    format: row => '$'.concat(row.Cost.toLocaleString()),
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
  {
    name: "Current?",
    selector: (row) => row.Current,
    format: row => row.Current === 1 ? 'True' : 'False'
  },
];

const conditionalRowStyles = [
  {
    when: row => getDifficulty(row.Map) === 'Beginner',
    style: {
      backgroundColor:'#99cc99',
    }
  },
  {
    when: row => getDifficulty(row.Map) === 'Intermediate',
    style: {
      backgroundColor:'#cccc00',
    }
  },
  {
    when: row => getDifficulty(row.Map) === 'Advanced',
    style: {
      backgroundColor:'#cc8400',
    }
  },
  {
    when: row => getDifficulty(row.Map) === 'Expert',
    style: {
      backgroundColor:'#ff7f7f',
    }
  },
]

let listRules = [
  {
    name: "General Rules",
    rule: "Monkey Knowledge is allowed, easy prices. Rounds 31-60. SELLING IS NOT ALLOWED",
  },
  {
    name: "Version Discrepancy",
    rule: "A combo must start and end in the same version.",
  },
  {
    name: "Update Grace Period",
    rule: "A combo must either be completed in the current version or precisely one day after the next update.",
  },
  {
    name: "Proof Requirement",
    rule: "The Least Cash special condition is required to verify the exact cost of the run. If asked for more proof, you are required to show more images / a video.",
  },
  {
    name: "Cost",
    rule: "Submissions must be $20,200 in cost, or lower.",
  },
];

export function LCD() {
  let [LCD, setLCD] = useState()
  useEffect(() => {Axios.get('http://localhost:5000/lcd').then((res) => {setLCD(res.data)})}, [])

  return (
    <div>
      <Helmet><title>BTD6 Index | Least Cost Deflation</title></Helmet>
      <ComboTable
        title = {<b>Least Cost Deflation</b>}
        columns={columns}
        data={LCD}
        actions={[AvgCost('lcd'), Rules(listRules)]}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}
