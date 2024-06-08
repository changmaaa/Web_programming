const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const { response } = require('express');

const app = express();

const getit = '<실습 10-1. 영화 검색 사이트> 학번: 201902332 이름: 유창민';

class Movie {
    constructor(title, rate, date, link) {
        this.title = title;
        this.rate = rate;
        this.date = date;
        this.link = link;
    }
}

const movies = [];

const url = 'http://www.cgv.co.kr/movies/?lt=1&ft=0';
request(url, (error,response, body) => {
    const $ = cheerio.load(body);

    $('.sect-movie-chart > ol > li').each((index, element) => {
        const title = $(element).find('.box-contents > a').text().trim();
        const rate = $(element).find('.box-contents > .score > .percent').text().trim();
        const date = $(element).find('.box-contents > .txt-info').text().trim();
        const link = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=' + title;

        const numericRate = rate.replace(/[^\d.]/g, '');
        const numericDate = date.replace(/[^\d.]/g, '');

        if (title && numericRate) {
            movies.push(new Movie(title, numericRate, numericDate, link));
        };
    });
    console.log(movies);
});

app.get('/search.movie', (request, response) => {
    const title = request.query.title;
    const rate = request.query.rate;

    let mymovie = movies.filter((movie) => {
        return (title == '전체' || movie.title.includes(title)) &&
               (rate == '전체' || movie.rate >= parseFloat(rate))
    });

    let number = mymovie.length;

    let result = `
    ${getit}
    <h2>영화 검색 결과: ${number}개</h2>
    <table style="border-collapse: collapse; border: 2px solid blue;">
        <tr style="background : yellow;">
            <th style="border: 1px solid black; text-align : center; padding : 2px 5px">순서</th>
            <th style="border: 1px solid black; text-align : center; padding : 2px 5px">제목</th>
            <th style="border: 1px solid black; text-align : center; padding : 2px 5px">예매율</th>
            <th style="border: 1px solid black; text-align : center; padding : 2px 5px">영화 정보</th>
        </tr>
    `

    result += mymovie.map((movie, index) => `
        <tr>
            <td style="border: 1px solid black; text-align : center; padding : 2px 5px">${index + 1}</td>
            <td style="border: 1px solid black; text-align : center; padding : 2px 5px">${movie.title}</td>
            <td style="border: 1px solid black; text-align : center; padding : 2px 5px">${movie.rate}%</td>
            <td style="border: 1px solid black; text-align : center; padding : 2px 5px"><a href="${movie.link}" target="_blank">영화 정보</a></td>
        </tr>
    `).join('');

    result += `</table>`;
    response.send(result);
});

app.listen(54321, () => {
    console.log('Server running at http://localhost:54321');
});