const data = ['홍길동', 173, 48, '임꺽정', 180, 78,
              '전우치', 165, 92, '부채도사', 145, 68];

const fig0 = "----+----+----+----+----+----+----+----+----+----+";
const fig1 = "####+####+####+####+####+####+####+####+####+####+";
const fig2 = "    5   10   15   20   25   30   35   40   45   50";
        
// 학생 정보
console.log();
console.log('<실습5. 비만도 판정>  학번: 201902332 이름: 유창민');
console.log();

for(let i = 0; i<data.length; i += 3){
    const name = data[i];
    const height = data[i+1];
    const weight = data[i+2];

    const bmi = weight / ((height / 100) ** 2);
    const res = bmi < 18.5 ? '저체중' : (bmi < 25.0 ? '정상' : (bmi < 30.0 ? '과체중' : '비만'));

    const figure = fig1.substring(0, bmi) + fig0.substring(bmi,fig0.length);

    console.log(`이름: ${name}`);
    console.log(`신장: ${height}`);
    console.log(`체중: ${weight}`);
    console.log(`판정: ${res} (bmi = ${bmi})`);
    console.log(`도표: ${figure}`);
    console.log(`     ${fig2}`);
}