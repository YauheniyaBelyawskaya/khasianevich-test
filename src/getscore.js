const scores = {
  Anna: 10,
  Olga: 1,
  Ivan: 5,
  John: ''
}

function getScore(scores) {
  let total = 0
  for (let name in scores) {
    switch (typeof scores[name]) {
      case 'number':
        total = total + scores[name]
        break
      default:
        break
    }
  }
  return total
}

console.log(getScore(scores)) // 16
