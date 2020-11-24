const cssUtils = {
  getClassName: (classA, classB) => {
    console.log(classA, classB);
    if(typeof classA === 'string' && typeof classB === 'string') {
      return `${classA} ${classB}`;
    }

    if (typeof classB !== 'string') {
      return `${classA}`;
    }

    return '';
  } 
};

export default cssUtils;