const request = require('request');
const cheerio = require('cheerio');
const { response } = require('express');

const url = 'http://www.cgv.co.kr/movies/?lt=1&ft=0';
request(url, (error,response, body) => {
    console.log('<실습 8-1. 영화 차트 목록> 학번:201902332 이름:유창민');
    const $ = cheerio.load(body);

    $('.sect-movie-chart > ol > li').each((index, element) => {
        const title = $(element).find('.box-contents > a').text().trim();
        const rate = $(element).find('.box-contents > .score > .percent').text().trim();

        const numericRate = rate.replace(/[^\d.]/g, ''); // 숫자와 소수점만 남기고 나머지 제거

        if (title && numericRate) {
            console.log("영화: ", title)
            console.log(`예매율: ${numericRate}%`);
            console.log();
        };
    });
})