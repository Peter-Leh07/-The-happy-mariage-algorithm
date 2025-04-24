const men = [
    { id: "1A", name: "Peter", ratings: ["3G", "1G", "7G", "10G", "4G", "9G", "8G", "6G", "2G", "5G"] },
    { id: "2A", name: "Martin", ratings: ["5G", "9G", "3G", "1G", "7G", "6G", "8G", "2G", "10G", "4G"] },
    { id: "3A", name: "Jozef", ratings: ["1G", "8G", "10G", "4G", "6G", "7G", "2G", "3G", "5G", "9G"] },
    { id: "4A", name: "Marek", ratings: ["6G", "4G", "10G", "9G", "2G", "7G", "1G", "3G", "5G", "8G"] },
    { id: "5A", name: "Lukas", ratings: ["7G", "10G", "4G", "3G", "1G", "6G", "2G", "8G", "9G", "5G"] },
    { id: "6A", name: "Tomas", ratings: ["9G", "2G", "6G", "3G", "8G", "10G", "4G", "1G", "5G", "7G"] },
    { id: "7A", name: "Adam", ratings: ["4G", "8G", "3G", "9G", "7G", "5G", "6G", "1G", "10G", "2G"] },
    { id: "8A", name: "Jakub", ratings: ["1G", "3G", "8G", "7G", "5G", "10G", "4G", "9G", "2G", "6G"] },
    { id: "9A", name: "Michal", ratings: ["2G", "7G", "9G", "6G", "5G", "1G", "4G", "3G", "10G", "8G"] },
    { id: "10A", name: "Filip", ratings: ["8G", "4G", "6G", "3G", "7G", "1G", "9G", "5G", "10G", "2G"] }
  ];
  
  const women = [
    { id: "1G", name: "Anna", ratings: ["3A", "1A", "7A", "10A", "4A", "9A", "8A", "6A", "2A", "5A"] },
    { id: "2G", name: "Maria", ratings: ["5A", "9A", "3A", "1A", "7A", "6A", "8A", "2A", "10A", "4A"] },
    { id: "3G", name: "Katarina", ratings: ["1A", "8A", "10A", "4A", "6A", "7A", "2A", "3A", "5A", "9A"] },
    { id: "4G", name: "Eva", ratings: ["6A", "4A", "10A", "9A", "2A", "7A", "1A", "3A", "5A", "8A"] },
    { id: "5G", name: "Jana", ratings: ["7A", "10A", "4A", "3A", "1A", "6A", "2A", "8A", "9A", "5A"] },
    { id: "6G", name: "Zuzana", ratings: ["9A", "2A", "6A", "3A", "8A", "10A", "4A", "1A", "5A", "7A"] },
    { id: "7G", name: "Dominika", ratings: ["4A", "8A", "3A", "9A", "7A", "5A", "6A", "1A", "10A", "2A"] },
    { id: "8G", name: "Lucia", ratings: ["1A", "3A", "8A", "7A", "5A", "10A", "4A", "9A", "2A", "6A"] },
    { id: "9G", name: "Barbora", ratings: ["2A", "7A", "9A", "6A", "5A", "1A", "4A", "3A", "10A", "8A"] },
    { id: "10G", name: "Veronika", ratings: ["8A", "4A", "6A", "3A", "7A", "1A", "9A", "5A", "10A", "2A"] }
  ];

  const superposition = [];

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


  getSuperPosition(men , women)
  getOrderedSuperPositions(superposition)
  

  
