for (let i = 0;i<5;i++){
    let output = "";
    for (let j=0;j<4;j++){
        output += '';
    }
    for(let j=0;j<i*2+1;j++){
        output += '*';
    }
    console.log(output);
}