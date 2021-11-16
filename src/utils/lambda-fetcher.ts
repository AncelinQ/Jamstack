
// Function that tells swr how to fetch data from netlify lambdas
const lambdaFetcher = (functionURI: string) => fetch(`/.netlify/functions${functionURI}`).then(response => response.json());

export default lambdaFetcher;