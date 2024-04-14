export const dataFetch = async (link) => {
  const res = await fetch(link)
  const { drinks } = await res.json()

  return drinks
}
