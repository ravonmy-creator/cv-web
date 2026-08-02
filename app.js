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
            if (data.certificates) renderCertificates(data.certificates);
            if (data.education) renderEducation(data.education);
        })
        .catch(error => console.error('Error loading CV data:', error));
});

function renderBasics(basics) {
    const header = document.getElementById('header-section');
    header.innerHTML = `
        <h1>${basics.name}</h1>
        <h2>${basics.title}</h2>
        <div style="color: #718096; margin-bottom: 20px; font-size: 0.95em;">
            📍 ${basics.location} &nbsp;|&nbsp; 
            ✉️ <a href="mailto:${basics.email}" style="color: #3182ce; text-decoration: none;">${basics.email}</a> &nbsp;|&nbsp; 
            🔗 <a href="https://${basics.linkedin}" target="_blank" style="color: #3182ce; text-decoration: none;">LinkedIn</a>
        </div>
        <p>${basics.summary}</p>
    `;
}

function renderSkills(skills) {
    const skillsContainer = document.getElementById('skills-section');
    const skillsList = skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    skillsContainer.innerHTML = `<h3>Core Tools & Tech</h3><div>${skillsList}</div>`;
}

function renderExperience(experience) {
    const expContainer = document.getElementById('experience-section');
    const expHTML = experience.map(job => `
        <div class="job">
            <h4>${job.role}</h4>
            <p><em>${job.duration}</em></p>
            <ul>${job.highlights.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
    `).join('');
    expContainer.innerHTML = `<h3>Experience</h3>${expHTML}`;
}

function renderCertificates(certificates) {
    // Try to find the container
    let certContainer = document.getElementById('certificates-section');

    // DEFENSIVE CHECK: If it doesn't exist, create it dynamically!
    if (!certContainer) {
        certContainer = document.createElement('section');
        certContainer.id = 'certificates-section';
        document.getElementById('cv-container').appendChild(certContainer);
    }

    const certList = certificates.map(cert => `<li>${cert}</li>`).join('');
    certContainer.innerHTML = `<h3>Certifications</h3><ul>${certList}</ul>`;
}

function renderEducation(education) {
    // Try to find the container
    let eduContainer = document.getElementById('education-section');

    // DEFENSIVE CHECK: If it doesn't exist, create it dynamically!
    if (!eduContainer) {
        eduContainer = document.createElement('section');
        eduContainer.id = 'education-section';
        document.getElementById('cv-container').appendChild(eduContainer);
    }

    const eduHTML = education.map(edu => `
        <div style="margin-bottom: 15px;">
            <h4>${edu.institution}</h4>
            <p style="margin: 0; color: #4a5568;"><strong>${edu.degree}</strong></p>
            <p style="margin: 0; color: #718096; font-size: 0.9em;"><em>${edu.duration}</em></p>
        </div>
    `).join('');
    eduContainer.innerHTML = `<h3>Education</h3>${eduHTML}`;
}

// --- IDLE TIMER LOGIC ---
let idleTimer;
const idleTimeLimit = 3000; // 3 seconds

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
