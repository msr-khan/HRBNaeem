/**
 * HRBNaeem - Professional Video Gallery Logic
 * Features: Live Search, Suggestions, Smooth Scroll, and Highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('videoSearch');
    const suggestionList = document.getElementById('suggestionList');
    const videoCards = document.querySelectorAll('.video-card');

    // 1. Show Suggestions on Focus
    searchInput.addEventListener('focus', () => {
        showSuggestions();
    });

    // 2. Universal Search Logic (Optimized)
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        let foundAny = false;

        videoCards.forEach(card => {
            const titleElement = card.querySelector('h3');
            const titleText = titleElement.innerText.toLowerCase();

            if (titleText.includes(query)) {
                card.style.display = "block";
                card.style.animation = "fadeIn 0.5s ease"; // Smooth entry
                foundAny = true;
            } else {
                card.style.display = "none";
            }
        });

        // Toggle Suggestions: Hide if typing, show if empty focus
        suggestionList.style.display = query.length > 0 ? 'none' : 'block';
    });

    // 3. Populate Suggestions Dropdown
    function showSuggestions() {
        suggestionList.innerHTML = '';
        
        videoCards.forEach((card, index) => {
            const title = card.querySelector('h3').innerText;
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `<span>🔍</span> ${title}`;
            
            item.onclick = () => {
                searchInput.value = title;
                // Run filter
                videoCards.forEach(c => c.style.display = "none");
                card.style.display = "block";
                suggestionList.style.display = 'none';
                
                // Professional Smooth Scroll to the video
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };
            suggestionList.appendChild(item);
        });
        
        suggestionList.style.display = 'block';
    }

    // 4. Click Outside to Close
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            suggestionList.style.display = 'none';
        }
    });
});

// 1. YOUR DATA
const API_KEY = 'PASTE_YOUR_COPIED_API_KEY_HERE'; 
const CHANNEL_ID = 'https://www.youtube.com/channel/UCFfq8nFDK1sjcXzHmc_Bd2w'; // Your actual Channel ID

// 2. FETCH VIDEOS FROM YOUTUBE
async function fetchYouTubeVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=9`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
            displayVideos(data.items);
        } else {
            console.error("No videos found or API Error:", data);
        }
    } catch (error) {
        console.error("Error fetching YouTube data:", error);
    }
}

// 3. DISPLAY VIDEOS ON YOUR WEBSITE
function displayVideos(videos) {
    const videoContainer = document.getElementById('video-container'); // Make sure this ID exists in your HTML
    videoContainer.innerHTML = ''; 

    videos.forEach(video => {
        const videoId = video.id.videoId;
        if (!videoId) return; // Skip if it's not a video

        const videoElement = `
            <div class="video-card">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
                <h3>${video.snippet.title}</h3>
            </div>
        `;
        videoContainer.innerHTML += videoElement;
    });
}

// Start the process
fetchYouTubeVideos();