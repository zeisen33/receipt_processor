const getPoints = (receipt) => {
    
    // One point per alphanumeric char in retailer name
    let retailerPoints = 0
    const retailer = receipt.retailer
    const alphaNums = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
    const retailerChars = retailer.split('')
    // console.log(retailer)
    retailerChars.forEach(char => {
        if (alphaNums.includes(char)) {
            retailerPoints++
        }
    })

    // 50 points if total is round dollar (no cents)
    let roundedTotalPoints = 0
    const total = receipt.total
    const cents = total.slice(-2)
    if (cents === '00') {
        roundedTotalPoints = 50
    }

    // 25 points if total is a multiple if 0.25
    let quarterTotalPoints = 0
    if (cents % 25 === 0) {
        quarterTotalPoints = 25
    }

    // 5 points for every two items
    let pointsPerTwoItems = 0
    const pointsPerTwoMultiplier = 5
    const items = receipt.items
    pointsPerTwoItems = pointsPerTwoMultiplier * Math.floor(items.length / 2)
    
    // 0.2 * price points for each item that, when trimmed, has a num of chars with a multiple of 3
    let descriptionPoints = 0
    items.forEach(item => {
        const trimmedDesc = item.shortDescription.trim()
        if (trimmedDesc.length % 3 === 0) {
            descriptionPoints += Math.ceil(0.2 * item.price)
        }
    })

    // 6 points if purchase day is odd
    let datePoints = 0
    const date = receipt.purchaseDate
    const day = date.split('-')[2]
    if (day % 2 === 1) {
        datePoints = 6
    }

    // 10 points if purchased between 2pm and 4pm
    let timePoints = 0
    const time = receipt.purchaseTime
    const hour = time.split(':')[0]
    if (hour >= 14 && hour < 16) {
        timePoints = 10
    }

    // 5 pts per item if all items are unique (Different desc and price)
    // let uniquePoints = 0
    // const uniquePointsMultiplier = 5
    // // Loop through items with two indexes comparing those items
    // for (let i = 0; i < items.length; i++) {
    //     for (let j = 0; j < items.length; j++) {
    //         if (i < j) {
    //             console.log(items[i])
    //             console.log(items[j])
    //         }
    //     }
    // }

    
    const points = retailerPoints + roundedTotalPoints + quarterTotalPoints 
                    + pointsPerTwoItems + descriptionPoints + datePoints + timePoints
    
    // console.log(`retailerPoints: ${retailerPoints}`)
    // console.log(`roundedTotalPoints: ${roundedTotalPoints}`)
    // console.log(`quarterTotalPoints: ${quarterTotalPoints}`)
    // console.log(`pointsPerTwoItems: ${pointsPerTwoItems}`)
    // console.log(`descriptionPoints: ${descriptionPoints}`)
    // console.log(`datePoints: ${datePoints}`)
    // console.log(`timePoints: ${timePoints}`)

    
    return points
}

module.exports = getPoints