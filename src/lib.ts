export const randomPickFromArray = <T>(array: [T, ...T[]]) => {
  const arrayIndex = Math.floor(Math.random() * array.length)
  return array[arrayIndex]
}

export const formatDate = (date: Date, format: string): string => {
  return format
    .replace(/yyyy/g, date.getFullYear().toString())
    .replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    .replace(/dd/g, ('0' + date.getDate()).slice(-2))
    .replace(/HH/g, ('0' + date.getHours()).slice(-2))
    .replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    .replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
    .replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
    .replace(/M/g, (date.getMonth() + 1).toString())
    .replace(/d/g, date.getDate().toString())
    .replace(/H/g, date.getHours().toString())
    .replace(/m/g, date.getMinutes().toString())
    .replace(/s/g, date.getSeconds().toString())
    .replace(/S/g, date.getMilliseconds().toString())
}

export const copyDate = (date: Date): Date => {
  return new Date(date.getTime())
}

export const getJstDate = (date: Date): Date => {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000)
}

export const arrayAtLeastOne = <T>(array: T[]): array is [T, ...T[]] => {
  return array.length > 0
}
