const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const getit = '학번: 201902332 이름: 유창민';

class Moneyrate {
    constructor(country, rate) {
        this.country = country;
        this.rate = rate;
    }
}

let moneyrateDB = [
    new Moneyrate('KRW', 1),
    new Moneyrate('USD', 1300),
    new Moneyrate('EUR', 1420),
    new Moneyrate('JPY', 9.2),
];

app.get('/search.money', (request, response) => {
    let number = request.query.number;
    let country = request.query.country;

    if (country == 'USD') {
        number = number * 1300;
    }
    else if (country == 'EUR') {
        number = number * 1420;
    }
    else if (country == 'JPY') {
        number = number * 9.2;
    }
    else {
        number = number;
    }

    let myrate = moneyrateDB.filter((rate) => {
        return (rate.country == 'USD' || rate.country == 'EUR' || rate.country == 'JPY' || rate.country == 'KRW');
    });
    function fu(num) {
        const temp = Math.round(num);
        
        return new Intl.NumberFormat().format(temp);
    }



    let result = `
    ${getit}
    <h2>기말시험 2.환율 계산기</h2>
    <table style="border-collapse: collapse; border: 1px solid black;">
        <tr style="background : skyblue;">
            <th style="border: 1px solid black; text-align : center; padding : 2px 5px">금액</th>
            <th style="border: 1px solid black; text-align : center; padding : 2px 5px">통화</th>
        </tr>
    `;

    result += myrate.map((rate, index) => `
        <tr>
            <td style="border: 1px solid black; text-align : right; padding : 2px 5px">${Intl.NumberFormat().format(Math.round(number / rate.rate))}</td>
            <td style="border: 1px solid black; text-align : center; padding : 2px 5px">${rate.country}</td>
        </tr>
    `).join('');

    result += `</table>`;
    response.send(result);

});

app.listen(54321, () => {
    console.log('Server running at http://localhost:54321');
});

