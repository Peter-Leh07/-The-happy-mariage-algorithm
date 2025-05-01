const men = [
  { name: "Peter", ratings: ["Katarina", "Anna", "Dominika", "Veronika", "Eva", "Barbora", "Lucia", "Zuzana", "Maria", "Jana"] },
  { name: "Martin", ratings: ["Jana", "Barbora", "Katarina", "Anna", "Dominika", "Zuzana", "Lucia", "Maria", "Veronika", "Eva"] },
  { name: "Jozef", ratings: ["Anna", "Lucia", "Veronika", "Eva", "Zuzana", "Dominika", "Maria", "Katarina", "Jana", "Barbora"] },
  { name: "Marek", ratings: ["Zuzana", "Eva", "Veronika", "Barbora", "Maria", "Dominika", "Anna", "Katarina", "Jana", "Lucia"] },
  { name: "Lukas", ratings: ["Dominika", "Veronika", "Eva", "Katarina", "Anna", "Zuzana", "Maria", "Lucia", "Barbora", "Jana"] },
  { name: "Tomas", ratings: ["Barbora", "Maria", "Zuzana", "Katarina", "Lucia", "Veronika", "Eva", "Anna", "Jana", "Dominika"] },
  { name: "Adam", ratings: ["Eva", "Lucia", "Katarina", "Barbora", "Dominika", "Jana", "Zuzana", "Anna", "Veronika", "Maria"] },
  { name: "Jakub", ratings: ["Anna", "Katarina", "Lucia", "Dominika", "Jana", "Veronika", "Eva", "Barbora", "Maria", "Zuzana"] },
  { name: "Michal", ratings: ["Maria", "Dominika", "Barbora", "Zuzana", "Jana", "Anna", "Eva", "Katarina", "Veronika", "Lucia"] },
  { name: "Filip", ratings: ["Lucia", "Eva", "Zuzana", "Katarina", "Dominika", "Anna", "Barbora", "Jana", "Veronika", "Maria"] }
];

const women = [
  { name: "Anna", ratings: ["Jozef", "Peter", "Adam", "Filip", "Marek", "Michal", "Jakub", "Tomas", "Martin", "Lukas"] },
  { name: "Maria", ratings: ["Lukas", "Michal", "Jozef", "Peter", "Adam", "Tomas", "Jakub", "Martin", "Filip", "Marek"] },
  { name: "Katarina", ratings: ["Peter", "Jakub", "Filip", "Marek", "Tomas", "Adam", "Martin", "Jozef", "Lukas", "Michal"] },
  { name: "Eva", ratings: ["Tomas", "Marek", "Filip", "Michal", "Martin", "Adam", "Peter", "Jozef", "Lukas", "Jakub"] },
  { name: "Jana", ratings: ["Adam", "Filip", "Marek", "Jozef", "Peter", "Tomas", "Martin", "Jakub", "Michal", "Lukas"] },
  { name: "Zuzana", ratings: ["Michal", "Martin", "Tomas", "Jozef", "Jakub", "Filip", "Marek", "Peter", "Lukas", "Adam"] },
  { name: "Dominika", ratings: ["Marek", "Jakub", "Jozef", "Michal", "Adam", "Lukas", "Tomas", "Peter", "Filip", "Martin"] },
  { name: "Lucia", ratings: ["Peter", "Jozef", "Jakub", "Adam", "Lukas", "Filip", "Marek", "Michal", "Martin", "Tomas"] },
  { name: "Barbora", ratings: ["Martin", "Adam", "Michal", "Tomas", "Lukas", "Peter", "Marek", "Jozef", "Filip", "Jakub"] },
  { name: "Veronika", ratings: ["Jakub", "Marek", "Tomas", "Jozef", "Adam", "Peter", "Michal", "Lukas", "Filip", "Martin"] }
];

const superposition = [];

const getUniqueIds = (someMan, someWoman) => {
  const usedIds = new Set();

  someMan.forEach(man => usedIds.add(man.id));
  someWoman.forEach(woman => usedIds.add(woman.id));

  const generateId = () => {
    const number = Math.floor(Math.random() * 1000); 
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); 
    return `${number}${letter}`;
  };

  const getUniqueId = () => {
    let id;
    do {
      id = generateId();
    } while (usedIds.has(id)); 
    usedIds.add(id); 
    return id;
  };

  
  someMan.forEach(man => {
    man.id = getUniqueId();
  });

  someWoman.forEach(woman => {
    woman.id = getUniqueId();
  });
};

const convertNamesInRatingsToIds = (someMan, someWoman) => {
  someMan.forEach(man => {
    man.ratings = man.ratings.map(rating => {
      const womanId = someWoman.find(w => w.name === rating)?.id;
      return womanId || rating
    });
  });
  someWoman.forEach(woman => {
    woman.ratings = woman.ratings.map(rating => {
      const manId = someMan.find(m => m.name === rating)?.id;
      return manId || rating
    });
  });
};

const getSuperPosition = (man , woman) => {
  for(let i = 0; i < man.length; i++){
      const idMen = man[i].id;
      const manName =  man[i].name
      for(let j = 0; j < woman.length; j++){
          const idWomen = woman[j].id
          const womanName =   woman[j].name;
          const womanRating = woman[j].ratings.findIndex(r => r === idMen)
          const manRating = man[i].ratings.findIndex(r => r === idWomen)
          const superpositionNumber = womanRating + manRating
          const pair = {
              "superpositionNumber" : superpositionNumber,
              "men" : idMen,
              "women" : idWomen,
              "woman-name" : womanName,
              "man-name" : manName           
          }
          superposition.push(pair)
      }
  }
} 

const getOrderedSuperPositions = (superpositions) => {
  const sortedPositions = [...superpositions].sort((a , b) => a.superpositionNumber - b.superpositionNumber)
  console.log(sortedPositions)
  createIdealPairs(sortedPositions)
}

const createIdealPairs = (pairs) => {
  let finallPairs = [];

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    if (pair.superpositionNumber >= i) {
      finallPairs.push(pair);
      const manId = pair.men;
      const womanId = pair.women;
      pairs = pairs.filter(p => p.men !== manId && p.women !== womanId);
    }
    i = -1;
  }
  console.log(finallPairs)
  return finallPairs;
};
const happyMariageAlgorithm = () => {
  getUniqueIds(men , women)
  convertNamesInRatingsToIds(men , women)
  getSuperPosition(men , women)
  getOrderedSuperPositions(superposition)
}

export default happyMariageAlgorithm();
  

  
