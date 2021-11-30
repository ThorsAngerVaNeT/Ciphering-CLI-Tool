const alph = 'abcdefghijklmnopqrstuvwxyz';

const cipherCaesar = (str, shift) => {
  return str.split('').map(el =>{
    if(shift < 0) shift += 26;
    if(-1 !== alph.indexOf(el)){
      return alph[(alph.indexOf(el)+shift)%26];
    }
    else if(-1 !== alph.toUpperCase().indexOf(el)){
      return alph[(alph.toUpperCase().indexOf(el)+shift)%26].toUpperCase();
    }
    else{
      return el;
    }
  }).join('');
}

const cipherAtbash = (str) => {
  return str.split('').map(el =>{
    if(-1 !== alph.indexOf(el)){
      return alph[(25 - alph.indexOf(el))];
    }
    else if(-1 !== alph.toUpperCase().indexOf(el)){
      return alph[(25 - alph.toUpperCase().indexOf(el))].toUpperCase();
    }
    else{
      return el;
    }
  }).join('');
}

module.exports = {cipherCaesar, cipherAtbash};