const normalizeWord = (word: string) => {
  if (!word) {
    return ''
  }

  const firstLatter = word[0]?.toUpperCase()

  return firstLatter + word.slice(1, word.length)
}

export default normalizeWord