function getLastItemArray(data){
    return data.slice(-1)[0]
}

function removeLastItemArray(data){
    const lastKey = data.length - 1
    return data.slice(0,lastKey)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
