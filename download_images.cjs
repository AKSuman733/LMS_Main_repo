const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'mahesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Mahesh_Babu_in_Spyder_%28cropped%29.jpg'
  },
  {
    name: 'allu_arjun.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Allu_Arjun_at_62nd_Filmfare_awards_south.jpg'
  },
  {
    name: 'prabhas.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Prabhas_by_Gage_Skidmore.jpg'
  },
  {
    name: 'ram_charan.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Ram_Charan_Teja_at_RRR_press_meet.jpg'
  }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (response) => {
      if (response.statusCode === 200 || response.statusCode === 301 || response.statusCode === 302) {
        if (response.statusCode === 301 || response.statusCode === 302) {
          download(response.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err.message));
    });
  });
};

const run = async () => {
  for (const img of images) {
    const dest = path.join(__dirname, 'src', 'assets', img.name);
    console.log(`Downloading ${img.name}...`);
    try {
      await download(img.url, dest);
      console.log(`Successfully downloaded ${img.name}`);
    } catch (err) {
      console.error(`Failed to download ${img.name}: ${err}`);
    }
  }
};

run();
