const https = require('https');
const fs = require('fs');
const path = require('path');

const heroes = [
  { name: 'mahesh.jpg', title: 'Mahesh_Babu' },
  { name: 'allu_arjun.jpg', title: 'Allu_Arjun' },
  { name: 'prabhas.jpg', title: 'Prabhas' },
  { name: 'ram_charan.jpg', title: 'Ram_Charan' }
];

const getImageUrl = (title) => {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${title}&format=json&pithumbsize=500`;
    https.get(url, {
      headers: { 'User-Agent': 'NodeApp/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            reject('No thumbnail found for ' + title);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: { 'User-Agent': 'NodeApp/1.0' }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(`Status ${response.statusCode}`);
      }
    }).on('error', reject);
  });
};

const run = async () => {
  for (const hero of heroes) {
    try {
      console.log(`Fetching URL for ${hero.title}...`);
      const url = await getImageUrl(hero.title);
      console.log(`Downloading from ${url}...`);
      await download(url, path.join(__dirname, 'src', 'assets', hero.name));
      console.log(`Success: ${hero.name}`);
    } catch (e) {
      console.error(`Error with ${hero.title}: ${e}`);
    }
  }
};

run();
