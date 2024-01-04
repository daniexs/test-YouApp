function birthdayFormat(inputDate) {
  const date = new Date(inputDate);

  // Formatting the date to 'DD / MM / YYYY'
  const formattedDate = `${date.getDate().toString().padStart(2, '0')} / ${(
    date.getMonth() + 1
  ).toString().padStart(2, '0')} / ${date.getFullYear()}`;

  // Calculating age
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const result = `${formattedDate} (Age ${age})`;
  return { age, date: formattedDate }
}

module.exports = birthdayFormat