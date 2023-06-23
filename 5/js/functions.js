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
const calculatesTime = (startWork, endWork, startMeeting, durationMeeting) => {
  startWork = startWork.split(':');
  const startMin = Number(startWork[0] * 60) + Number(startWork[1]);

  endWork = endWork.split(':');
  const endMin = Number(endWork[0] * 60) + Number(endWork[1]);

  startMeeting = startMeeting.split(':');
  const startMeetingMin = Number(startMeeting[0] * 60) + Number(startMeeting[1]);

  if (startMeetingMin >= startMin && startMeetingMin <= endMin) {
    if ((endMin - startMeetingMin) >= durationMeeting) {
      return true;
    }
  }
  return false;
};

calculatesTime('08:00', '17:30', '14:00', 90);
