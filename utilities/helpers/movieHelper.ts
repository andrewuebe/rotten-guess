export const getOverviewExcerpt = (overview: string) => {
  const sentenceEndPunctuations = /[.!?]/;
  let excerpt = "";

  // If the overview is shorter than 160 characters, just return the entire overview
  if (overview.length <= 140) {
    return overview;
  }

  let firstSentenceEndIndex = -1;

  // Start searching for the end of the first sentence after 160 characters
  for (let i = 140; i < overview.length; i++) {
    if (sentenceEndPunctuations.test(overview[i])) {
      firstSentenceEndIndex = i;
      break;
    }
  }

  if (firstSentenceEndIndex === -1) {
    return overview;  // If there's no sentence-ending punctuation, return the whole string
  }

  // Add the first sentence to the excerpt
  excerpt += overview.slice(0, firstSentenceEndIndex + 1);

  // Get the rest of the overview after the first sentence
  const restOfOverview = overview.slice(firstSentenceEndIndex + 1).trim();

  // Find the first four words of the second sentence
  const words = restOfOverview.split(/\s+/).slice(0, 4);
  if (words.length > 0) {
    excerpt += " " + words.join(" ") + "...";
  }

  return excerpt;
}