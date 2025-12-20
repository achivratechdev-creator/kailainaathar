// utils/helpers.ts
export const calculateSavePercent = (price: number, mrp: number) =>
  mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0

export const formatTimeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return days === 0 ? "Today" : `${days} days ago`
}
