import "../App.css";
import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useMemo } from "react";
import Axios from 'axios';

function CRUD(action, type, challenge, mapList){
  let og; if(type === 'OG') {og = true} else if(type === 'ALT'){og = false};
  const [number, setNumber] = useState();
  const [tower1, setTower1] = useState();
  const [tower2, setTower2] = useState();
  const [upgrades, setUpgrades] = useState();
  const [map, setMap] = useState();
  const [version, setVersion] = useState();
  const [date, setDate] = useState();
  const [person, setPerson] = useState();
  const [link, setLink] = useState();
  //const [current, setCurrent] = useState(false);
  const [editNumber1, setEditNumber1] = useState('');
  const [editNumber2, setEditNumber2] = useState('');
  const [editCombo, setEditCombo] = useState([{"Number":0,"Tower 1":"Your","Tower 2":"Mom","Upgrades":"6-9-0 | 4-2-0","Map":"Your Moms House","Version":"69.420","Date":"69/420/1337","Person":"Me","Link":"https://com   .org.xyz"}]);
  useMemo(() => {Axios.get(`http://localhost:5000/2tc/og/${editNumber2}`).then(res => setEditCombo(res.data))}, [editNumber2]);

  if(action === '' || type === '' || challenge === ''){
    return<img src='https://preview.redd.it/3n2zbtb71x141.png?width=960&crop=smart&auto=webp&s=fbd98bbc057b3b222dcc4438fc47b3f6ef39ba86' alt='PatFunky' width='400px'></img>
  }else if(action === 'Add'){
    if(type === 'OG' && challenge === '2TC'){
        return(
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Number" onChange={e => setNumber(e.target.value)}/>
                        <Form.Control type="text" placeholder="Tower 1" onChange={e => setTower1(e.target.value)}/>
                        <Form.Control type="text" placeholder="Tower 2" onChange={e => setTower2(e.target.value)}/>
                        <Form.Control type="text" placeholder="Upgrades" onChange={e => setUpgrades(e.target.value)}/>
                        <Form.Label>Map</Form.Label>
                        <Form.Select onChange={e => setMap(e.target.value)}>{mapList.map(ele => {return(<option value={ele.Map}>{ele.Map}</option>)})}</Form.Select>
                        <Form.Control type="text" placeholder="Version" onChange={e => setVersion(e.target.value)}/>
                        <Form.Control type="text" placeholder="Date" onChange={e => setDate(e.target.value)}/>
                        <Form.Control type="text" placeholder="Person" onChange={e => setPerson(e.target.value)}/>
                        <Form.Control type="text" placeholder="Link" onChange={e => setLink(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={addOG2tc}>Add Combo</Button>
                </Form>
            </div>
        )
    } else if (type === 'ALT' && challenge === '2TC'){
        return(
          <div>
              <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Number" onChange={e => setNumber(e.target.value)}/>
                      <Form.Label>Map</Form.Label>
                      <Form.Select onChange={e => setMap(e.target.value)}>{mapList.map(ele => {return(<option value={ele.Abbrev}>{ele.Map}</option>)})}</Form.Select>
                      <Form.Control type="text" placeholder="Person" onChange={e => setPerson(e.target.value)}/>
                      <Form.Control type="text" placeholder="Link" onChange={e => setLink(e.target.value)}/>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={addALT2tc}>Add Combo</Button>
              </Form>
          </div>
    )}
  } else if (action === 'Delete'){
    if(type === 'OG' && challenge === '2TC'){
      return(
          <div>
              <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Number" onChange={e => setNumber(e.target.value)}/>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={deleteOG2tc}>Delete Combo</Button>
              </Form>
          </div>
    )} else if (type === 'ALT' && challenge === '2TC'){
      return(
          <div>
              <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Number" onChange={e => setNumber(e.target.value)}/>
                      <Form.Label>Map</Form.Label>
                      <Form.Select onChange={e => setMap(e.target.value)}>{mapList.map(ele => {return(<option value={ele.Abbrev}>{ele.Map}</option>)})}</Form.Select>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={deleteALT2tc}>Delete Combo</Button>
              </Form>
          </div>
    )}
  } else if (action === 'Edit'){
    if(type === 'OG' && challenge === '2TC'){
      if (editNumber2 !== ''){
        return(
          <div className="editing">
            <Form>
              <Form.Label>Editing OG 2TC #{editNumber2}</Form.Label>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder='Number' Value={`${editCombo[0].Number}`} onMouseOver={e => setNumber(editCombo[0].Number)} onChange={e => setNumber(e.target.value)}/>
                  <Form.Control type="text" placeholder="Tower 1" Value={`${editCombo[0]['Tower 1']}`} onMouseOver={e => setTower1(editCombo[0]['Tower 1'])} onChange={e => setTower1(e.target.value)}/>
                  <Form.Control type="text" placeholder="Tower 2" Value={`${editCombo[0]['Tower 2']}`} onMouseOver={e => setTower2(editCombo[0]['Tower 2'])} onChange={e => setTower2(e.target.value)}/>
                  <Form.Control type="text" placeholder="Upgrades" Value={`${editCombo[0].Upgrades}`} onMouseOver={e => setUpgrades(editCombo[0].Upgrades)} onChange={e => setUpgrades(e.target.value)}/>
                  <Form.Control type="text" placeholder="Map" Value={`${editCombo[0].Map}`} onMouseOver={e => setMap(editCombo[0].Map)} onChange={e => setMap(e.target.value)}/>
                  <Form.Control type="text" placeholder="Version" Value={`${editCombo[0].Version}`} onMouseOver={e => setVersion(editCombo[0].Version)} onChange={e => setVersion(e.target.value)}/>
                  <Form.Control type="text" placeholder="Date" Value={`${editCombo[0].Date}`} onMouseOver={e => setDate(editCombo[0].Date)} onChange={e => setDate(e.target.value)}/>
                  <Form.Control type="text" placeholder="Person" Value={`${editCombo[0].Person}`} onMouseOver={e => setPerson(editCombo[0].Person)} onChange={e => setPerson(e.target.value)}/>
                  <Form.Control type="text" placeholder="Link" Value={`${editCombo[0].Link}`} onMouseOver={e => setLink(editCombo[0].Link)} onChange={e => setLink(e.target.value)}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={e => editOG2tc()}>Edit Combo</Button>
            </Form>
          </div>
        )
      }
      return(
        <div className='Number'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>2TC to Edit</Form.Label>
              <Form.Control type="text" placeholder="Combo Number to Edit" onChange={e => setEditNumber1(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={e => setEditNumber2(editNumber1)}>Edit Combo</Button>
          </Form>
        </div>
      )
    }
  }


  function addOG2tc(){
    Axios.post('http://localhost:5000/add/2tc/og', {
      number: +number, 
      tower1: tower1, 
      tower2: tower2, 
      upgrades: upgrades,
      map: map,
      version: +version,
      date: date,
      person: person,
      link: link
    })
  }

  function addALT2tc(){
    Axios.post('http://localhost:5000/add/2tc/alt', {
      number: +number, 
      map: map,
      person: person,
      link: link,
      og: og ? 1 : 0
    })
  }

  function deleteOG2tc(){
    Axios.delete(`http://localhost:5000/delete/2tc/og/${number}`)
  }

  function deleteALT2tc(){
    Axios.delete(`http://localhost:5000/delete/2tc/alt/${number}/${map}`)
  }

  function editOG2tc(){
    Axios.put(`http://localhost:5000/update/2tc/og/${editNumber2}`, {number: number, tower1: tower1, tower2: tower2, upgrades: upgrades, map: map, version: version, date: date, person: person, link: link})
  }
}

export function Helper() {
    const [action, setAction] = useState('');
    const [type, setType] = useState('');
    const [challenge, setChallenge] = useState('');
    const [mapList, setMapList] = useState()
    useEffect(() => {Axios.get('http://localhost:5000/maps').then((res) => {setMapList(res.data)})}, [])

  return (
    <div>
      <Helmet>
        <title>BTD6 Index | Helpers</title>
      </Helmet>
      <h1>Helpers Section</h1>
      <Form>
        <div key='action' className="mb-3">
          <Form.Check inline label="Add Combo" name="group1" type="radio" id='Add' onChange={(e) => setAction(e.target.id)}/>
          <Form.Check inline label="Delete Combo" name="group1" type="radio" id='Delete' onChange={(e) => setAction(e.target.id)}/>
          <Form.Check inline label="Edit Combo" name="group1" type="radio" id='Edit' onChange={(e) => setAction(e.target.id)}/>
        </div>
        <div key='type' className="mb-3">
          <Form.Check inline label="OG Combo" name="group3" type="radio" id='OG' onChange={(e) => setType(e.target.id)}/>
          <Form.Check inline label="ALT Combo" name="group3" type="radio" id='ALT' onChange={(e) => setType(e.target.id)}/>
        </div>
        <div key='challenge' className="mb-3">
          <Form.Check inline label="2TC" name="group2" type="radio" id='2TC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="FTTC" name="group2" type="radio" id='FTTC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="LCC" name="group2" type="radio" id='LCC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="LTC" name="group2" type="radio" id='LTC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="2MPC" name="group2" type="radio" id='2MPC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="LCD" name="group2" type="radio" id='LCD' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="2TCC" name="group2" type="radio" id='2TCC' onChange={(e) => setChallenge(e.target.id)}/>
        </div><br/>
      </Form>

      {CRUD(action, type, challenge, mapList)}
    </div>
  );
}
