export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('cs-CZ')} Kč`
}

export const formatDate = (d: string): string => {
  const date = new Date(d)
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return `${day}.${month}.${year}`
}
