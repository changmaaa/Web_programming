const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.hanbit.co.kr/store/books/series_list.html';
request(url, (error, response, body) => {
    console.log('<실습 8. 시리즈 도서 목록> 학번:201902332 이름:유창민');
    const $ = cheerio.load(body);

    $('.series_book_list li').each((index, element) => {
        const dtText = $(element).find('dl > dt a').text().trim(); // 태그 내의 텍스트만 가져오도록 수정
        const ddText = $(element).find('dl > dd').text().trim();

        console.log("차례: ", index + 1);
        console.log("제목: ", dtText);
        console.log("작가: ", ddText);
        console.log();      
    });
});
