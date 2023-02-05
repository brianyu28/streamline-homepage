document.addEventListener('DOMContentLoaded', function() {
    getLatestVersionNumber();

    new Typed('#intro-text', {
        strings: [':info', 'A free, open-source text expander for macOS'],
        typeSpeed: 60,
        backDelay: 500,
        backSpeed: 5,
        startDelay: 1000,
        onComplete: (self) => {
            self.cursor.style.display = 'none';
        },
        preStringTyped: (pos, self) => {
            if (pos === 1) {
                self.typeSpeed = 10;
            }
        }
    });

    new Typed('#expand-example-1', {
        strings: [':meet?', '`Would you be available to meet sometime tomorrow to discuss in more detail?`'],
        typeSpeed: 60,
        backDelay: 500,
        backSpeed: 5,
        startDelay: 5000,
        loop: true,
        onComplete: (self) => {
            self.startDelay = 1000;
        },
        preStringTyped: (pos, self) => {
            if (pos === 0) {
                self.typeSpeed = 60;
                self.backDelay = 500;
            }
            if (pos === 1) {
                self.typeSpeed = 5;
                self.backDelay = 3000;
            }
        }
    });
});

function getLatestVersionNumber() {
    fetch("https://api.github.com/repos/brianyu28/streamline/releases")
    .then(res => res.json())
    .then(data => {
        if (!data.length || data[0] === undefined) {
            return;
        }
        let releaseDatetime = data[0].published_at;
        if (typeof(releaseDatetime) !== 'string') {
            return;
        }
        let releaseDate = releaseDatetime.split('T')[0];
        let version = data[0].name;
        if (typeof(version) !== 'string') {
            return;
        }

        const elt = document.querySelector('#version');
        elt.innerHTML = `Latest version: <strong>${escapeString(version)}</strong>, released <strong>${escapeString(releaseDate)}</strong>`;
        elt.style.display = 'block';
    })
    .catch(err => {});
}

function escapeString(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
