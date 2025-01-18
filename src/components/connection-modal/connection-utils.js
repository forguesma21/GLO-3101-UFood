export function setTokenExpirationDate(checked) {
  const endDate = new Date()
  //expiration au bout d'un an dans le cas où remember me est coché
  if (checked) {
    endDate.setFullYear(endDate.getFullYear() + 1)
  }
  //sinon expiration en 30 minutes
  else {
    endDate.setMinutes(endDate.getMinutes() + 30)
  }
  return endDate
}
