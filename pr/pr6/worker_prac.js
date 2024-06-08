class Worker {
    constructor(name,gender,age,place,number,addr){
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.place = place;
        this.number = number;
        this.addr = addr;
    }

}

let workers = [
    new Worker('김창훈', 'M', 28, '총무부', '010-3838-8577', '경기도 용인시'),
    new Worker('장종훈', 'M', 38, '총무부', '010-3347-7474', '서울시 강동구'),
    new Worker('안달훈', 'M', 25, '인사과', '010-3744-4747', '강원도 정선군'),
    new Worker('이세영', 'F', 48, '경리부', '010-3736-4784', '전라북도 전주시'),
    new Worker('김예은', 'F', 52, '총무부', '010-2845-8978', '전라남도 순천시'),
    new Worker('김영철', 'M', 32, '홍보부', '010-2222-3334', '경기도 용인시'),
    new Worker('도철수', 'M', 23, '홍보부', '010-1235-3788', '경기도 오산시'),
    new Worker('김수정', 'F', 35, '총무부', '010-3636-3563', '충청남도 아산시'),
    new Worker('이예린', 'F', 21, '홍보부', '010-3756-9823', '경기도 성남시'),
    new Worker('강수철', 'M', 53, '홍보부', '010-3834-1248', '강원도 강릉시')
];

console.log('<실습6. 사원 데이터베이스>  학번: 12345678  이름: 고석훈');

// (1) 20대(20~29세) 사원의 이름, 주소 출력
console.log("\n(1) 20대(20~29세) 사원의 이름, 주소 출력");
for (let i = 0; i < workers.length; i++) {
    if (workers[i].age >= 20 && workers[i].age <= 29) {
        console.log(`${workers[i].name} ${workers[i].addr}`);
    }
}

// (2) 강원도에 사는 사원의 이름, 전화번호, 주소를 출력
console.log("\n(2) 강원도에 사는 사원의 이름, 전화번호, 주소를 출력");
for (let i = 0; i < workers.length; i++) {
    if (workers[i].addr.includes('강원도')) {
        console.log(`${workers[i].name} ${workers[i].number} ${workers[i].addr}`);
    }
}
// (3) 총무부에 근무하고 이름에 '김'이 들어간 사원의 이름, 성별, 전화번호 출력
console.log("\n(3) 총무부에 근무하고 이름에 '김'이 들어간 사원의 이름, 성별, 전화번호 출력");
for (let i = 0; i < workers.length; i++) {
    if (workers[i].place == '총무부' && workers[i].name.includes('김')){
        console.log(`${workers[i].name} ${workers[i].gender} ${workers[i].number}`);
    }
}
// (4) 홍보부에 근무하는 남성 사원의 이름과 주소를 가나다 순으로 출력
console.log("\n(4) 홍보부에 근무하는 남성 사원의 이름과 주소를 가나다 순으로 출력");
const male = [];
for (let i = 0; i < workers.length; i++) {
    if (workers[i].place == '홍보부' && workers[i].gender == 'M'){
        male[male.length] = workers[i];
    }
}
male.sort((a, b) => a.name > b.name ? 1 : -1);
for (let i = 0; i < male.length; i++) {
    console.log(`${male[i].name} ${male[i].addr}`);
}
// (5) 경기도에 사는 사원을 나이순으로 이름, 나이, 성별, 전화번호, 주소를 출력
console.log("\n(5) 경기도에 사는 사원을 나이순으로 이름, 나이, 성별, 전화번호, 주소를 출력");
const list = [];
for (let i = 0; i < workers.length; i++) {
    if (workers[i].addr.includes('경기도')){
        list[list.length] = workers[i];
    }
}
list.sort((a, b) => a.age > b.age ? 1 : -1);
for (let i = 0; i < list.length; i++) {
    console.log(`${list[i].name} ${list[i].age} ${list[i].gender} ${list[i].number} ${list[i].addr}`);
}