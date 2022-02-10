//console.log('h'.charCodeAt())
//console.log(String.fromCharCode(104));
function randomInRange(low, higth) {
    if(low >= higth) {
        throw "El primer argumento debe ser mayor al segundo";
    }
    return Number.parseInt(Math.random()*(higth - low) + low)
}

function salt(size) {
    new_salt = '';
    for(let i = 1; i <= size/2; i++) {
        randomNumber = randomInRange(65, 90);
        new_salt += String.fromCharCode(randomNumber);
    }

    for(let i = 1; i <= size/2; i++) {
        randomNumber = randomInRange(97, 122);
        new_salt += String.fromCharCode(randomNumber);
    }

    return new_salt;
}

function hash(text) {
    new_hash = '';
    for(let char of text){
        new_hash += String.fromCharCode(char.charCodeAt() << 2);
    }
    return new_hash;
}

/*var date = new Date()
console.log(date.toString());*/




