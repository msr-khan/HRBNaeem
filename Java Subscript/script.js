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

// 1. API Configuration
const API_KEY = 'AIzaSyCBBVp4Qw8l6LTFQ0zMdrzzz7uzZH9mjxY';
const CHANNEL_ID = 'UCFfq8nFDK1sjcXzHmc_Bd2w';

// 2. Function to fetch and display videos
async function fetchYouTubeVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // This ID matches your HTML exactly: "videoContainer"
        const videoList = document.getElementById('videoContainer');
        
        if (data.items && videoList) {
            videoList.innerHTML = ''; // Clear the "Loading..." message

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                if (!videoId) return; 

                const title = item.snippet.title;
                const thumbnail = item.snippet.thumbnails.high.url;

                const videoHTML = `
                    <div class="video-card">
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <img src="${thumbnail}" alt="${title}" style="width:100%; border-radius:8px;">
                            <h3 style="font-size:16px; margin-top:10px; color:#333;">${title}</h3>
                        </a>
                    </div>
                `;
                videoList.innerHTML += videoHTML;
            });
        }
    } catch (error) {
        console.error('Error loading YouTube videos:', error);
    }
}

// 3. Run the function when the page loads
window.addEventListener('DOMContentLoaded', fetchYouTubeVideos);
