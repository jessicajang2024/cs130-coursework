const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/879c7106422b0b53852209da6a63210be7e09b01?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                let firstFive = data.splice(0, 5);
                console.log(firstFive[0]);

                // convert to HTML
                let html = firstFive.map(track2Html);
                // plug it back into the index.html file
                document.querySelector("#tracks").innerHTML = html;
            } else {
                let html = "<p>No tracks found that match your seach criteria.</p>";
                document.querySelector("#tracks").innerHTML = html;
            }
        });
};

const track2Html = (track) => {
    return `
      <button class="track-item preview" data-preview-track=${track.preview_url} onclick="handleTrackClick(event);">
              <img src=${track.album.image_url}>
              <i class="fas play-track fa-play" aria-hidden="true"></i>
              <div class="label">
                  <h2>${track.album.name}</h2>
                  <p>
                   ${track.artist.name}
                  </p>
              </div>
      </button>
      `;
  };

getTracks("Lady gaga");

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
};

const getArtist = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                let firstArtist = data[0];
                console.log(firstArtist);
                // convert to HTML
                let html = artist2Html(firstArtist);
                // plug it back into the index.html file
                document.querySelector("#artist").innerHTML = html;
            } else {
                let html = "<p>No artists have been found.</p>";
                document.querySelector("#artist").innerHTML = html;
            }
        });
};

const artist2Html = (artist) => {
    return `
    <section class="artist-card" id=${artist.id}>
    <div>
        <img src=${artist.image_url}>
        <h2>${artist.name}</h2>
        <div class="footer">
            <a href=${artist.spotify_url} target="_blank">
                view on spotify
            </a>
        </div>
    </div>
</section> `;
};

getArtist("Lady gaga");

const handleTrackClick = (ev) => {
  const previewUrl = ev.currentTarget.getAttribute("data-preview-track");
  console.log(previewUrl);
};

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};