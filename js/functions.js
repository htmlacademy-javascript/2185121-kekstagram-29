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

// Высчитывает укладывается ли встреча в рабочий день
const getMinutes = (time) => {
  const times = time.split(':');
  return Number(times[0] * 60) + Number(times[1]);
};

const isWorkingDay = (startWork, endWork, startMeeting, durationMeeting) => {
  const startMin = getMinutes(startWork) ;
  const endMin = getMinutes(endWork);
  const startMeetingMin = getMinutes(startMeeting);
  const timeLeft = endMin - startMeetingMin;

  if (startMeetingMin >= startMin && timeLeft >= durationMeeting) {
    return true;
  }
  return false;
};

isWorkingDay('08:00', '17:30', '14:00', 90);
