import "../App.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ComboTable } from "../helpers/tables.js";

const appearenceColumns = [
    {
        name: "Person",
        selector: (row) => row.Person,
        sortable: true,
    },
    {
        name: "Count",
        selector: (row) => row["Total Count"],
        sortable: true,
    },
];

const versionColumns = [
    {
        name: "Version",
        selector: (row) => row.Version,
        sortable: true,
        format: (row) => `v${row.Version}.x`,
    },
    {
        name: "Number of Combos",
        selector: (row) => row["Total Count"],
        sortable: true,
    },
];

const mapColumns = [
    {
        name: "Map",
        selector: (row) => row.Map,
        sortable: true,
    },
    {
        name: "Number of Combos",
        selector: (row) => row["Total Count"],
        sortable: true,
    },
];

const towerColumns = [
    {
        name: "Tower",
        selector: (row) => row.Tower,
        sortable: true,
    },
    {
        name: "Number of Combos",
        selector: (row) => row["Total Count"],
        sortable: true,
    },
];


export function TwoTCStats() {
    const [ogAppearences, setOgAppearences] = useState();
    const [totalAppearences, setTotalAppearences] = useState();
    const [versionCount, setVersionCount] = useState();
    const [mapCount, setMapCount] = useState();
    const [towerCountOG, setTowerCountOG] = useState();
    const [towerCountTotal, setTowerCountTotal] = useState();
    useEffect(() => {Axios.get("http://localhost:5000/2tc/stats/Appearences/og").then((res) => {setOgAppearences(res.data);})}, []);
    useEffect(() => {Axios.get("http://localhost:5000/2tc/stats/Appearences/total").then((res) => {setTotalAppearences(res.data);})}, []);
    useEffect(() => {Axios.get("http://localhost:5000/2tc/stats/versions").then((res) => {setVersionCount(res.data);})}, []);
    useEffect(() => {Axios.get("http://localhost:5000/2tc/stats/maps").then((res) => {setMapCount(res.data);})}, []);
    useEffect(() => {Axios.get("http://localhost:5000/2tc/stats/towers/og").then((res) => {setTowerCountOG(res.data);})}, []);
    useEffect(() => {Axios.get("http://localhost:5000/2tc/stats/towers/Total").then((res) => {setTowerCountTotal(res.data);})}, []);

    return (
        <div className="2tc-stats-parent">
            <Helmet>
                <title>BTD6 Index | Two Towers CHIMPS | Stats</title>
            </Helmet>
            <h1>Two Towers CHIMPS Stats</h1>

            <div>
                <div style={{width: '45%', float: "left", paddingLeft: '5%'}}>
                    <ComboTable
                        title={<b>OG Person Appearences</b>}
                        columns={appearenceColumns}
                        data={ogAppearences}
                        dense
                        />
                </div>
                <div style={{width: '45%', float: "left", paddingLeft: '5%'}}>
                    <ComboTable
                        title={<b>Total Person Appearences</b>}
                        columns={appearenceColumns}
                        data={totalAppearences}
                        dense
                        />
                </div>
            </div>

            <div>
                <div style={{width: '45%', float: "left", paddingLeft: '5%'}}>
                    <ComboTable
                        title={<b>Version Counts</b>}
                        columns={versionColumns}
                        data={versionCount}
                        dense
                        />
                </div>
                <div style={{width: '45%', float: "left", paddingLeft: '5%'}}>
                    <ComboTable
                        title={<b>Map Counts</b>}
                        columns={mapColumns}
                        data={mapCount}
                        dense
                        />
                </div>
            </div>

            <div>
                <div style={{width: '45%', float: "left", paddingLeft: '5%'}}>
                    <ComboTable
                        title={<b>Tower Counts OG</b>}
                        columns={towerColumns}
                        data={towerCountOG}
                        dense
                        />
                </div>
                <div style={{width: '45%', float: "left", paddingLeft: '5%'}}>
                    <ComboTable
                        title={<b>Tower Counts Total</b>}
                        columns={towerColumns}
                        data={towerCountTotal}
                        dense
                        />
                </div>
            </div>
        </div>
    );
}
