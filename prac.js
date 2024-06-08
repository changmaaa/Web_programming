function printTree(height) {
    for (let i = 1; i <= height; i++) {
      const space = ' '.repeat(height - i);
      const star = '*'.repeat(2 * i - 1);
      console.log(space + star);
    }
  }
  
  // 트리 높이 설정
  const treeHeight = 5;
  
  // 트리 출력
  printTree(treeHeight);
  
  