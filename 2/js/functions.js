// функция для проверки длины строки.
const checkLengthString = (string, length) => string.length <= length;
checkLengthString('привет', 6);

// Функция для проверки, является ли строка палиндромом
const checkPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ','');
  return string === string.split('').reverse().join('');
};
checkPalindrome('До во д');

//принимает строку или число, извлекает содержащиеся в ней цифры
const extractDigits = (string) => {
  string = String(string).replace(/\D/g, '');
  return parseInt(string, 10);
};
extractDigits('rffd -1 78 0.5 14tfH9');
