// Function that tells SWR how to fetch data from Netlify lambdas
const lambdaFetcher = (functionURI: string) =>
  fetch(`/.netlify/functions${functionURI}`)
  .then(response => response.json());

export default lambdaFetcher;
