class Helpers {
  isPalindrome(string){
    if(string) {
      return string.trim().split('').reverse().join('') === string;
    } else {
      return false;
    }
  }
  getRandomInt(max, min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}


export default new Helpers();