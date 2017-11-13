'use strict'

const critics = {
  'Lisa Rose': {
    'Lady in the Water': 2.5,
    'Snakes on a Plane': 3.5,
    'Just My Luck': 3.0,
    'Superman Returns': 3.5,
    'You, Me and Dupree': 2.5,
    'The Night Listener': 3.0
  },
  'Gene Seymour': {
    'Lady in the Water': 3.0,
    'Snakes on a Plane': 3.5,
    'Just My Luck': 1.5,
    'Superman Returns': 5.0,
    'The Night Listener': 3.0,
    'You, Me and Dupree': 3.5
  },
  'Michael Phillips': {
    'Lady in the Water': 2.5,
    'Snakes on a Plane': 3.0,
    'Superman Returns': 3.5,
    'The Night Listener': 4.0
  },
  'Claudia Puig': {
    'Snakes on a Plane': 3.5,
    'Just My Luck': 3.0,
    'The Night Listener': 4.5,
    'Superman Returns': 4.0,
    'You, Me and Dupree': 2.5
  },
  'Mick LaSalle': {
    'Lady in the Water': 3.0,
    'Snakes on a Plane': 4.0,
    'Just My Luck': 2.0,
    'Superman Returns': 3.0,
    'The Night Listener': 3.0,
    'You, Me and Dupree': 2.0
  },
  'Jack Matthews': {
    'Lady in the Water': 3.0,
    'Snakes on a Plane': 4.0,
    'The Night Listener': 3.0,
    'Superman Returns': 5.0,
    'You, Me and Dupree': 3.5
  },
  'Toby': {
    'Snakes on a Plane': 4.5,
    'You, Me and Dupree': 1.0,
    'Superman Returns': 4.0
  }
}

// Returns the Pearson correlation coefficient for p1 and p2
const simPearson = (prefs, p1, p2) => {
  // Find the items that are rated by both critics, p1 and p2
  const si = {} // object to store the mutually rated items
  for (const item in prefs[p1]) {
    if (item in prefs[p2]) {
      si[item] = 1
    }
  }

  // Find the length of our array
  let n = 0
  // If there are no ratings in common, return 0
  for (let key in si) {
    n++
  }

  if (n === 0) {
    return 0
  }

  let sum1 = 0
  // Adds up all the preferences
  for (let it in si) {
    if (it in prefs[p1]) {
      sum1 += prefs[p1][it]
    }
  }

  let sum2 = 0
  // Adds up all the preferences
  for (let it in si) {
    if (it in prefs[p2]) {
      sum2 += prefs[p2][it]
    }
  }

// Sum up all the squares
  let sumSq1 = 0
  // Adds up all the preferences
  for (let it in si) {
    if (it in prefs[p1]) {
      sumSq1 += Math.pow(prefs[p1][it], 2)
    }
  }

// Sum up all the squares
  let sumSq2 = 0
  // Adds up all the preferences
  for (let it in si) {
    if (it in prefs[p2]) {
      sumSq2 += Math.pow(prefs[p2][it], 2)
    }
  }

  // Sum up the products
  let pSum = 0
    // Adds up all the preferences
    //  sum1=sum([prefs[p1][it] for it in si])
  for (let it in si) {
    if (it in prefs[p1] && it in prefs[p2]) {
      pSum += (prefs[p1][it] * prefs[p2][it])
    }
  }

    // Calculate the Pearson score
  let numerator = (pSum) - (sum1 * sum2 / n)
  let denominator = Math.sqrt((sumSq1 - Math.pow(sum1, 2) / n) *
  ((sumSq2 - Math.pow(sum2, 2) / n)))

  if (denominator === 0) {
    return 0
  }
  let pearsonScore = numerator / denominator
  return pearsonScore
}

// Returns the best matches for persom from prefs object
// Number of results and similarity function are optional params
const topMatches = (prefs, person, n, similarity = simPearson) => {
  let scores = []
  for (let critic in prefs) {
    if (critic !== person) {
      let pScore = similarity(prefs, person, critic)
      scores.push([pScore, critic])
    }
  }
  // const sortFunction = (a, b) => {
  //   if (a[0] === b[0]) {
  //     return 0
  //   } else {
  //     return (a[0] > b[0] ? -1 : 1)
  //   }
  // }
  scores.sort()
  scores.reverse()
  return scores.slice(0, n + 1)
}

// Get recommendations for a person by using a weighted average
// of every other user's rankings
const getRecommendations = (prefs, person, similarity = simPearson) => {
  let totals = {}
  let simSums = {}
  let rankings = []
  let sim = 0
  for (let critic in prefs) {
    // Don't compare me to myself
    if (critic === person) continue
    sim = similarity(prefs, person, critic)
    // Ignore scores of zero
    if (sim <= 0) continue

    for (let item in prefs[critic]) {
      // Only score movies I haven't seen yet
      if (!(prefs[person].hasOwnProperty(item)) || prefs[person][item] === 0) {
        // Similarity * Score
        if (totals[item]) {
          totals[item] += prefs[critic][item] * sim
        } else {
          totals[item] = prefs[critic][item] * sim
        }
        // Sum of similarities
        if (simSums[item]) {
          simSums[item] += sim
        } else {
          simSums[item] = sim
        }
      }
    }
  }
  // Create the normalized list
  for (let item in totals) {
    rankings.push([(parseFloat(totals[item] / simSums[item])), item])
    // }
  }
  // Return the sorted list
  rankings.sort()
  rankings.reverse()
  return rankings
}

// Try recursion
const transformPrefs = (prefs) => {
  let result = {}
  for (let person in prefs) {
    for (let item in prefs[person]) {
      if (!(result[item])) {
        result[item] = {}
        result[item][person] = prefs[person][item]
      } else {
        result[item][person] = prefs[person][item]
      }
    }
  }
  return result
}

const simDistance = (prefs, person1, person2) => {
  let si = {}
  for (let item in prefs[person1]) {
    if (item in prefs[person2]) {
      si[item] = 1
    }
  }
  let n = 0
  for (let key in si) {
    n++
  }

  if (n === 0) {
    return 0
  }
  let sumOfSquares = 0
  for (let item in prefs[person1]) {
    if (item in prefs[person2]) {
      sumOfSquares += Math.pow((prefs[person1][item] - prefs[person2][item]), 2)
    }
  }
  return 1 / (1 + sumOfSquares)
}

// Building the Item Comparison Dataset
const calculateSimilarItems = (prefs, n = 10) => {
  // Create a object of items howing which other items they are most similar to
  let result = {}
  let scores = []
  // Invert the preference matrix to be item-centric
  let itemPrefs = transformPrefs(prefs)
  // Find the most similar items to this one
  for (let item in itemPrefs) {
    scores = topMatches(itemPrefs, item, n, simDistance)
    result[item] = scores
    // console.log(result)
  }
  return result
}

export const getRecommendedItems = (itemMatch, user) => {
  let prefs = critics
  let userRatings = prefs[user]
  let scores = {}
  let totalSim = {}

  // Loop over items rated by this user
  for (let item in userRatings) {
    for (let item2 in itemMatch[item]) {
      // Ignore if this user has already rated this item
      if (itemMatch[item][item2][1] in userRatings) {
        continue
      }

      // Weighted sum of rating times similarity
      if (scores[itemMatch[item][item2][1]]) {
        scores[itemMatch[item][item2][1]] += itemMatch[item][item2][0] * userRatings[item]
      } else {
        scores[itemMatch[item][item2][1]] = itemMatch[item][item2][0] * userRatings[item]
      }
      // Sum of all the similarities
      if (totalSim[itemMatch[item][item2][1]]) {
        totalSim[itemMatch[item][item2][1]] += itemMatch[item][item2][0]
      } else {
        totalSim[itemMatch[item][item2][1]] = itemMatch[item][item2][0]
      }
    }
  }

  // Divide each total score by total weighting to get an average
  let rankings = []
  for (let item in scores) {
    rankings.push([scores[item] / totalSim[item], item])
  }
  rankings.sort()
  rankings.reverse()
  return rankings
}

// const loadMovieLens = (path = '../data/') => {
//   // Get movie titles
//   let movies = {}
//   for (let line in FileReader(path + '/u.data')) {
//     let [id, title] = line.split('|')
//     movies[id] = title
//     console.log('movielends id title test', id, title)
//   }
// }

// const movies = transformPrefs(critics)
// let r = simDistance(critics, 'Lisa Rose', 'Gene Seymour')
// let r = calculateSimilarItems(critics)
const itemSim = calculateSimilarItems(critics)
export const get = getRecommendedItems(itemSim, 'Michael Phillips')
// loadMovieLens()
console.log('getRecommendedItems Function', get)
