function getCurrentDate() {
  const newDate = new Date();
  const currentDate = `${newDate.today()} ${newDate.timeNow()}`;

  return currentDate;
}

function getIndividualDate(date) {
  const year = `${date[0]}${date[1]}${date[2]}${date[3]}`;
  const month = getMonthName(`${date[5]}${date[6]}`);
  const day = `${date[8]}${date[9]}`;

  return { day, month, year }
}

function getMonthName(month) {
  switch (month) {
    case "01":
      return "JANEIRO"
    case "02":
      return "FEVEREIRO"
    case "03":
      return "MARÇO"
    case "04":
      return "ABRIL"
    case "05":
      return "MAIO"
    case "06":
      return "JUNHO"
    case "07":
      return "JULHO"
    case "08":
      return "AGOSTO"
    case "09":
      return "SETEMBRO"
    case "10":
      return "OUTUBRO"
    case "11":
      return "NOVEMBRO"
    case "12":
      return "DEZEMBRO"
  }
}

export {
  getIndividualDate,
  getCurrentDate
}