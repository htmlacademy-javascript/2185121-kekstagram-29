// функция для проверки длины строки.
const checksLengthString = (string,length) => {
  const result = (string.length <= length);
  return result;
};
checksLengthString('привет',6);

// Функция для проверки, является ли строка палиндромом
const checksPalindrome = (string) => {
  const recycledString = string.toUpperCase().replaceAll(' ','');
  let reverse = '';
  for(let i = -1; i >= (recycledString.length * -1);i--) {
    reverse += recycledString.at(i);
  }
  return (recycledString === reverse);
};
checksPalindrome('До во д');

//принимает строку или число, извлекает содержащиеся в ней цифры
const extractsDigits = (string) => {
  string = String(string);
  let result = '';
  for(let i = 0;i < (string.length);i++) {
    if (Number(string[i]) || string[i] === '0') {
      result += string[i];
    }
  }
  result = (result.length === 0) ? NaN : result;
  return Number(result);
};
extractsDigits('rffd -1 78 0.5 14tfH9');
