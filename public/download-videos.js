const https = require('https');
const fs = require('fs');
const path = require('path');

const videos = [
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-particles-floating-against-a-dark-background-154-large.mp4', name: 'bg-particles.mp4' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-typing-on-his-laptop-1379-large.mp4', name: 'bg-typing.mp4' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-computer-in-a-dark-room-1540-large.mp4', name: 'bg-working.mp4' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-41108-large.mp4', name: 'bg-city.mp4' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-notebook-in-a-desk-with-several-pens-viewed-from-above-2007-large.mp4', name: 'bg-notebook.mp4' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-network-of-connections-over-a-city-1744-large.mp4', name: 'bg-network.mp4' }
];

const publicDir = process.argv[2] || './public';

async function downloadVideo(url, filename) {
  return new Promise((resolve) => {
    const filepath = path.join(publicDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, { timeout: 60000 }, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(filepath).size / (1024 * 1024);
        console.log('OK Downloaded ' + filename + ' (' + size.toFixed(2) + ' MB)');
        resolve();
      });
    }).on('error', () => {
      fs.unlink(filepath, () => {});
      console.log('FAIL Failed ' + filename);
      resolve(); // Continue despite errors
    });
  });
}

(async () => {
  console.log('Downloading videos...');
  for (const video of videos) {
    await downloadVideo(video.url, video.name);
    await new Promise(r => setTimeout(r, 500)); // Delay between requests
  }
  console.log('Download complete');
})();
