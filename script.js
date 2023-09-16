console.log("Welcome to Journey");

//Initialize
let songIndex=0;
let audioElement=new Audio('./songs/sunflower.mp3');
let masterPlay=document.getElementById('masterPlay');
let progressBar=document.getElementById('progressBar');
let masterSongName=document.getElementById('masterSongName');
let gif=document.getElementById('gif');
let songItem=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Sunflower",filePath:"./songs/1.mp3",coverpath:"./covers/1.jpg"},
    {songName:"Apna Bana Le",filePath:"./songs/2.mp3",coverpath:"./covers/2.jpg"},
    {songName:"Ed Sheeran - Perfect",filePath:"./songs/3.mp3",coverpath:"./covers/3.jpg"},
    {songName:"Main Jahaan Rahoon",filePath:"./songs/4.mp3",coverpath:"./covers/4.jpg"},
    {songName:"Ordinary",filePath:"./songs/5.mp3",coverpath:"./covers/5.jpg"},
    {songName:"OneRepublic - I Aint Worried",filePath:"./songs/6.mp3",coverpath:"./covers/6.jpg"},
]

songItem.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})

// Function to update background image
function updateBackgroundImage(songIndex) {
    const backgroundImageElement = document.querySelector('.container');
    backgroundImageElement.style.backgroundImage = `url(${songs[songIndex].coverpath})`;
}

//Handle play/pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        updateBackgroundImage(songIndex); // Update background when playing
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value=progress;
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime=progressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`./songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`./songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`./songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
