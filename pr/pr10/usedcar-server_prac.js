const express = require('express');
const app = express();

const title = '<실습 10. 중고차 검색> 학번: 201902332 이름: 유창민';

class Car {
    constructor(id, model, year, distance, color, price) {
        this.id = id;
        this.model = model;
        this.year = year;
        this.distance = distance;
        this.color = color;
        this.price = price;
    }
}

let usedcarDB = [
    //      등록번호,  차종,   연식, 주행거리, 색상,   가격
    new Car ('S-1', '소나타', 2016, 133033, 'black',  890),
    new Car ('S-2', '소나타', 2016, 104832, 'white', 1050),
    new Car ('S-3', '소나타', 2022,   3900, 'green', 3090),
    new Car ('S-4', '소나타', 2012, 167468, 'grey',   450),
    new Car ('S-5', '소나타', 2018,  67640, 'black', 1820),
    new Car ('G-1', '그랜저', 2018,  29893, 'black', 2830),
    new Car ('G-2', '그랜저', 2011, 184298, 'black',  690),
    new Car ('G-3', '그랜저', 2015, 130535, 'grey',  1050),
    new Car ('G-4', '그랜저', 2013, 134647, 'grey',   740),
    new Car ('A-1', '아반떼', 2018,  94379, 'grey',   960),
    new Car ('A-2', '아반떼', 2018,  27955, 'blue',  1390),
    new Car ('A-3', '아반떼', 2011,  55268, 'grey',   490),
    new Car ('A-4', '아반떼', 2017,  60006, 'white', 1220),
    new Car ('A-5', '아반떼', 2013,  73461, 'grey',   670),
    new Car ('A-6', '아반떼', 2019,  56530, 'black', 1220),
    new Car ('A-7', '아반떼', 2020,  26347, 'red',   2630)
];

app.get('/search.usedcar', (request, response) => {
    let model = request.query.model;
    let color = request.query.color;
    let price = request.query.price; 

    let mycar = usedcarDB.filter((car) => {
        return (model == '전체' || car.model == model) &&
               ((color == '전체' || car.color == color) || 
               (color == "기타" && car.color != 'black' && car.color != 'white')) &&
               ((price == '전체') || 
               (parseInt(price) == 2000 && car.price >= 2000) ||
               (parseInt(price) == 1000 && car.price >= 1000 && car.price < 2000) ||
               (parseInt(price) == 990 && car.price < 990)
               );
    });
    

    let number = mycar.length;

    let result = `
        ${title}
        <h2>중고차 검색 결과: ${number}대</h2>
        <table class="tble">
            <tr class="r">
                <th class="h">순서</th>
                <th class="h">등록번호</th>
                <th class="h">차종</th>
                <th class="h">연식</th>
                <th class="h">주행거리</th>
                <th class="h">색상</th>
                <th class="h">가격</th>
            </tr>
    `;

    result += mycar.map((car, index) => `
        <tr>
            <td class="d">${index + 1}</td>
            <td class="d">${car.id}</td>
            <td class="d">${car.model}</td>
            <td class="d">${car.year}년</td>
            <td class="dd">${car.distance}km</td>
            <td class="d">${car.color}</td>
            <td class="dd">${car.price}만원</td>
        </tr>
    `).join('');

    result += `</table>`;

    response.send(result);
});


app.listen(54321, () => {
    console.log('Server running at http://localhost:54321');
});
