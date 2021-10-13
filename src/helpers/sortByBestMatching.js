function compareTwoStrings(first, second) {
    const one = first.replace(/\s+/g, '');
    const two = second.replace(/\s+/g, '');

    if (one === two) return 1; // identical or empty
    if (one.length < 2 || two.length < 2) return 0; // if either is a 0-letter or 1-letter string

    const firstBigrams = new Map();
    for (let i = 0; i < one.length - 1; i += 1) {
        const bigram = one.substring(i, i + 2);
        const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

        firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < two.length - 1; i += 1) {
        const bigram = two.substring(i, i + 2);
        const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

        if (count > 0) {
            firstBigrams.set(bigram, count - 1);
            intersectionSize += 1;
        }
    }

    return (2.0 * intersectionSize) / (one.length + two.length - 2);
}

function sortBestMatch(mainString = '', targetObjects = []) {
    const ratings = [];
    if (!mainString || targetObjects.length === 0) return [];

    for (let i = 0; i < targetObjects.length; i += 1) {
        const currentTargetString = targetObjects[i]?.city_ascii;
        const currentRating = compareTwoStrings(mainString, currentTargetString);
        ratings.push({ target: targetObjects[i], rating: currentRating });
    }
    ratings.sort((a, b) => b.rating - a.rating);

    return ratings;
}

export default sortBestMatch;
