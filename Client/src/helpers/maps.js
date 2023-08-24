import Axios from 'axios';

let mapList;
Axios.get('http://localhost:5000/maps').then((res) => {mapList = res.data})

export const waterLess = ['SY', 'TS', 'H', 'AR', 'MM', 'ML', 'KD', 'CF', 'XF', 'MN', 'GD', 'UG', 'MS', 'W'];

export function changeMap(comboList, prop) {
    let changeValue;
    if(prop === 'Abbrev') changeValue = 'Map';
    if(prop === 'Map') changeValue = 'Abbrev.';
    comboList.forEach(combo => {
        mapList.forEach(map => {
            if (combo.Map === map[prop]) {
                combo.Map = map[changeValue];
            }
        })
    });
    return comboList;
}

export function getDifficulty(comboMap) {
    return mapList.filter(map => comboMap === map.Map)[0]?.Difficulty || 'Map not found'
}

export function filterAlts(alts, number) {
    let filteredALT = [];
    alts.forEach((alt) => {
        if (number === alt.Number) filteredALT.push(alt);
    });
    return filteredALT;
}

export function filterAltsFttc(alts, map) {
    let filteredALT = [];
    alts.forEach((alt) => {
        if (map === alt.Map) filteredALT.push(alt);
    });
    return filteredALT;
}

/* export function abbrToName(comboList){

    comboList.forEach(combo => {combo.Map = mapList.filter(map => combo.Map === map['Abbrev.'])[0].Map});
    return comboList;
}*/


/*export function getDifficulty(comboMap){
    let temp = ''
    mapList.forEach(map => {
        if(comboMap === map.Map) {
            temp = map.Difficulty
        };
    })
    return temp;
} */