const API_KEY = '';
const LONDON_ID = '61';

export async function getRestaurants(searchTerm = '', offset = 0) {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${LONDON_ID}&entity_type=city&start=${offset}&q=${searchTerm}`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getRestaurants ${error.message}`);
    throw error;
  }
};