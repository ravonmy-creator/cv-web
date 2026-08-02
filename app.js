document.addEventListener("DOMContentLoaded", () => {
    fetch('cv-data.json')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            renderBasics(data.basics);
            renderSkills(data.skills);
            renderExperience(data.experience);
        })
        .catch(error => console.error('Error loading CV data:', error));
});

function renderBasics(basics) {
    const header = document.getElementById('header-section');
    header.innerHTML = `
        <h1>${basics.name}</h1>
        <h2>${basics.title}</h2>
        <p>${basics.summary}</p>
        <hr>
    `;
}

function renderSkills(skills) {
    const skillsContainer = document.getElementById('skills-section');
    const skillsList = skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    skillsContainer.innerHTML = `<h3>Core Tools & Tech</h3><div>${skillsList}</div><hr>`;
}

function renderExperience(experience) {
    const expContainer = document.getElementById('experience-section');
    const expHTML = experience.map(job => `
        <div class="job" style="margin-bottom: 20px;">
            <h4>${job.role}</h4>
            <p><em>${job.duration}</em></p>
            <ul>${job.highlights.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
    `).join('');
    expContainer.innerHTML = `<h3>Experience</h3>${expHTML}`;
}

// --- IDLE TIMER LOGIC ---
let idleTimer;
const idleTimeLimit = 5000; // 5 seconds for testing

function showBugsBunny() {
    const bugsContainer = document.getElementById('bugs-bunny-animation');
    bugsContainer.style.display = 'block';
}

function resetIdleTimer() {
    const bugsContainer = document.getElementById('bugs-bunny-animation');
    if (bugsContainer.style.display === 'block') {
        bugsContainer.style.display = 'none';
    }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(showBugsBunny, idleTimeLimit);
}

window.onload = resetIdleTimer;
document.onmousemove = resetIdleTimer;
document.onscroll = resetIdleTimer;
document.onkeypress = resetIdleTimer;
document.onmousedown = resetIdleTimer;