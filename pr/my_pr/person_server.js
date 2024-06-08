const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const { URL } = require('url');

const app = express();

class Person {
    constructor(name, original_price, sale_price, link) {
        this.name = name;
        this.original_price = original_price;
        this.sale_price = sale_price;
        this.link = link;
    }
}

const persons = [];

app.get('/search.person', (req, res) => {
    const name = req.query.name;

    const url = new URL('https://youth-lab.kr/product/list.html?cate_no=337');

    request(url.href, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(body);

            $('.xans-element- xans-product xans-product-listnormal ec-base-product > .prdList grid3').each((index, element) => {
                const name = $(element).find('.description > name').text().trim();
                const original_price = $(element).find('.description > .xans-element- xans-product xans-product-listitem spec > . xans-record- > .title displaynone').text().trim();
                const sale_price = $(element).find('.description > .xans-element- xans-product xans-product-listitem spec > . xans-record- > .title displaynone').text().trim();
                const link = $(element).find('.description > .name > a').attr('href');

                const numericOriginal_price = original_price.replace(/[^\d.]/g, '');
                const numericSale_price = sale_price.replace(/[^\d.]/g, '');

                if (name && numericOriginal_price) {
                    persons.push(new Person(name, numericOriginal_price, numericSale_price, link));
                }
            });

            console.log(persons);
            res.send(persons);
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});
