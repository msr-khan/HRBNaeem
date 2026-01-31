/**
 * HRBNaeem - Ultimate YouTube Integration
 * Features: Quota Saver, Content Mixer, Auto-Suggestions, Filter-on-Click, Enter-to-Search
 */

const API_KEY = 'AIzaSyCBBVp4Qw8l6LTFQ0zMdrzzz7uzZH9mjxY'; 
const CHANNEL_ID = 'UCFfq8nFDK1sjcXzHmc_Bd2w'; 

async function fetchYouTubeVideos() {
    const videoList = document.getElementById('videoContainer');
    
    // 1. QUOTA CHECK: Verify if videos exist in browser memory to save API units
    const savedVideos = localStorage.getItem('myVideos');
    const lastFetch = localStorage.getItem('lastFetchTime');
    const now = new Date().getTime();

    // If data is less than 3 hours old, load from LocalStorage instead of calling YouTube
    if (savedVideos && lastFetch && (now - lastFetch < 10800000)) {
        processAndDisplay(JSON.parse(savedVideos));
        return;
    }

    // 2. API CALL: Fetch up to 50 videos from the specified channel
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items) {
            // Save successful fetch to LocalStorage
            localStorage.setItem('myVideos', JSON.stringify(data.items));
            localStorage.setItem('lastFetchTime', now);
            processAndDisplay(data.items);
        }
    } catch (error) {
        videoList.innerHTML = "<p style='color:white;'>Connection Error. Please refresh the page.</p>";
    }
}

function processAndDisplay(allVideos) {
    const videoList = document.getElementById('videoContainer');
    videoList.innerHTML = '';

    // ALGORITHM: Separate videos into Latest (10), Random Shuffle (10), and Library (30)
    const latest = allVideos.slice(0, 10);
    const rest = allVideos.slice(10);
    const random = rest.sort(() => 0.5 - Math.random()).slice(0, 10);
    const library = rest.filter(v => !random.includes(v)).slice(0, 30);

    const finalMix = [...latest, ...random, ...library];

    finalMix.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.high.url;

        videoList.innerHTML += `
            <div class="video-card">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <div class="thumbnail-wrapper">
                        <img src="${thumbnail}" alt="${title}">
                    </div>
                    <h3>${title}</h3>
                </a>
            </div>`;
    });

    // Pass the titles to the search system for suggestions
    const titles = finalMix.map(v => v.snippet.title);
    initSearch(titles);
}

function initSearch(videoTitles) {
    const searchInput = document.getElementById('videoSearch');
    const suggestionList = document.getElementById('suggestionList');
    const videoCards = document.querySelectorAll('.video-card');

    // Helper function to handle the actual filtering of cards on the screen
    function performFilter(query) {
        const lowerQuery = query.toLowerCase().trim();
        let foundAny = false;

        videoCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            if (title.includes(lowerQuery)) {
                card.style.display = "block";
                foundAny = true;
            } else {
                card.style.display = "none";
            }
        });

        // Show a message if no videos match the search
        const container = document.getElementById('videoContainer');
        let noResMsg = document.getElementById('noResultsMsg');
        
        if (!foundAny) {
            if (!noResMsg) {
                noResMsg = document.createElement('p');
                noResMsg.id = 'noResultsMsg';
                noResMsg.style.cssText = "color:white; grid-column:1/-1; text-align:center; padding:20px;";
                noResMsg.innerText = "No matching videos found.";
                container.appendChild(noResMsg);
            }
        } else if (noResMsg) {
            noResMsg.remove();
        }
    }

    // Show suggestions dropdown when input is focused
    searchInput.addEventListener('focus', () => showDropdown(videoTitles));

    // Update suggestions list in real-time as user types
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = videoTitles.filter(t => t.toLowerCase().includes(query));
        showDropdown(filtered);
    });

    // Trigger search when the user presses the 'Enter' key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performFilter(searchInput.value);
            suggestionList.style.display = "none";
        }
    });

    function showDropdown(list) {
        suggestionList.innerHTML = '';
        if (list.length > 0) {
            suggestionList.style.display = "block";
            list.forEach(title => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerText = title;
                
                // When a suggestion is clicked: update input, filter videos, and hide dropdown
                div.onclick = () => {
                    searchInput.value = title;
                    performFilter(title);
                    suggestionList.style.display = "none";
                };
                suggestionList.appendChild(div);
            });
        } else {
            suggestionList.style.display = "none";
        }
    }

    // Close suggestion dropdown if user clicks outside the search box
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) suggestionList.style.display = "none";    


    });

}
// Start everything when the page is ready
document.addEventListener('DOMContentLoaded', fetchYouTubeVideos);


