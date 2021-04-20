const image = document.querySelector('img');
const title = document.getElementById('title')
const artist = document.getElementById('artist');
const track = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const tracks = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'The White Stripes/Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    }
]
//Check if playing
let isPlaying = false;

// Play
function playTrack() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    track.play();
}

function pauseTrack() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    track.pause();
}

//Update DOM
function loadTrack(o) {
    artist.textContent = o.artist;
    title.textContent = o.displayName;
    track.src = `music/${o.name}.mp3`;
    image.src = `img/${o.name}.jpg`;
}


let trackIndex = 0;
let totalTracks = tracks.length;

//Previous Song
function prevTrack() {
    trackIndex--;
    if (trackIndex === -1) {
        trackIndex = totalTracks - 1;
    }
    loadTrack(tracks[trackIndex]);
    playTrack();
}

//Next Song
function nextTrack() {
    trackIndex++;
    if (trackIndex === totalTracks) {
        trackIndex = 0;
    }
    loadTrack(tracks[trackIndex]);
    playTrack();

}
// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //  Update progress bar width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds);
        
        //Delay switching duration ELement to avoid display NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`
        
        }
}

//On Load - Select First Song
loadTrack(tracks[trackIndex]);

// Set Progress Bar

function setProgressBar(e) {
    const width = this.clientWidth;
    console.log(width);
    const clickX =  e.offsetX;
    console.log(clickX);
    const { duration } = track;
    console.log(clickX / width);
    console.log((clickX / width) * duration);
    track.currentTime = (clickX / width) * duration;
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseTrack() : playTrack()));
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
track.addEventListener('ended', nextTrack);
track.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
