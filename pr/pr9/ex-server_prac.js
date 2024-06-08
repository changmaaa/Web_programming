const express = require('express');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const title = '<실습 9. Express 실습> 학번: 201902332 이름: 유창민';

app.get('/:op/:n1/:n2', (request, response) => {
    let op = request.params.op;
    const n1 = Number(request.params.n1);
    const n2 = Number(request.params.n2);
    let result = 0;
    if (op === 'add') {
        result = n1 + n2;
        op = '+';
    } else if (op === 'sub') {
        result = n1 - n2;
        op = '-';
    } else if (op === 'mul') {
        result = n1 * n2;
        op = '*';
    } else if (op === 'div') {
        result = n1 / n2;
        op = '/';
    }
    response.send(`<p>${title}</p><h3>(1) 사칙연산 계산</h3><p>${n1} ${op} ${n2} = ${result}</p>`);
});

app.get('/sort', (request, response) => {
    const a = Number(request.query.a);
    const b = Number(request.query.b);
    const c = Number(request.query.c);

    const sort_result = [a, b, c].sort((x, y) => x - y);
    response.send(`<p>${title}<p><h3>(2) 숫자 정렬하기</h3><p>a = ${a}, b = ${b}, c = ${c}</p><p>sorted : ${sort_result.join(', ')}</p>`);
});

app.post('/rect', (request, response) => {
    const width = Number(request.body.width);
    const height = Number(request.body.height);

    let result = '';
    
    for (let i = 0; i < height; i++) {
        result += 'H'.repeat(width) + '\n';
    }
    response.send(`<p>${title}</p><h3>(3) 사각형 그리기 (가로 ${width}, 세로 ${height})</h3><pre>${result}</pre>`);
});

app.listen(54321, () => {
    console.log('Server running at http://localhost:54321');
});