import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import Axios from "axios";

export function Rules(arrayRules) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>Rules</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rules</Modal.Title>
                </Modal.Header>
                {arrayRules.map(rule => {
                    return (
                        <div>
                            <Modal.Body as='b'>{rule.name}</Modal.Body>
                            <Modal.Body as='p'>{rule.rule}</Modal.Body>
                        </div>
                    )
                })
                }
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function AvgCost(challenge){
    let [AVG, setAVG] = useState();
    useEffect(() => {
      if(challenge === 'lcc')Axios.get(`http://localhost:5000/average/lcc`).then((res) => {setAVG(res.data)})
      if(challenge === 'lcd')Axios.get(`http://localhost:5000/average/lcd`).then((res) => {setAVG(res.data)})
    }, [challenge])
    return(
      <DataTable
        theme="dark"
        dense
        data={AVG}
        columns={
        [{
          name: "Difficulty",
          selector: (row) => row.difficulty,
        },
        {
          name: "Average Cost",
          selector: row => row['Average Cost'],
          format: row => '$'.concat(row['Average Cost'].toLocaleString())
        }]}
      />
    )
  }