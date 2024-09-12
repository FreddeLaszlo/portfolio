// Global variables
let logo = null;        // The lgo element
let fontAvailable = []; // List of fonts
let timerLogo;          // Timer for changing fonts

// List of fonts we would like to use
const fontCheck = [
    // Windows 10
    'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype', 'Segoe Print', 'Segoe Script', 'SimSun', 'Sitka', 'Sylfaen', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Yu Gothic',
    // macOS
    'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate', 'Courier', 'Courier New', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Microsoft Sans Serif', 'Monaco', 'Noteworthy', 'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Tahoma', 'Times', 'Times New Roman', 'Trattatello', 'Trebuchet MS', 'Verdana', 'Zapfino',
];

// Randomly change font of logo 
function randomLogo() {
    let fontFamily = fontAvailable[Math.floor(Math.random() * fontAvailable.length)];
    let italic = Math.floor(Math.random() * 10) >= 5 ? 'italic' : 'normal';
    let bold = Math.floor(Math.random() * 10) >= 5 ? 'bold' : 'normal';
    logo.style.fontFamily = fontFamily;
    logo.style.fontStyle = italic;
    logo.style.fontWeight = bold;
}

// When mouse enters logo, start random font changes 
function setRandomLogo() {
    logo = document.getElementById('myself');
    logo.style.backgroundImage = 'url(./resources/images/flag.png)';
    logo.style.backgroundSize = '100% 100%';
    logo.style.color = 'white';
    logo.style.textAlign = 'center';
    logo.style.textShadow = '1px 1px black';
    timerLogo = setInterval(randomLogo, 100);
    logo.style.transition = 'none';
    logo.style.width = '350px';
}

// Once mouse moved away from logo, set back to defaults
function unsetRandomLogo() {
    clearInterval(timerLogo);
    logo.style.fontFamily = "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif";
    logo.style.fontStyle = 'normal';
    logo.fontWeight = 'normal';
    logo.style.backgroundImage = 'none';
    logo.style.color = 'black';
    logo.style.textAlign = 'left';
    logo.style.textShadow = 'none';
    logo.style.width = 'auto';

}


// Only start JS handlers, etc. once everything loaded and read
window.onload = () => {
    // Get available fonts (may return true for EVERY font...)
    for (const font of fontCheck.values()) {
        if (document.fonts.check(`12px "${font}"`)) {
            fontAvailable.push(font);
        }
    }

    // Ensure each font appears only once in the array
    fontAvailable = [...new Set(fontAvailable)];
    fontAvailable.sort();

    // Start event handlers 
    logo = document.getElementById('myself');
    logo.addEventListener('mouseover', setRandomLogo);
    logo.addEventListener('mouseout', unsetRandomLogo);

    // Create mouse ripple
    let ripple = document.createElement('div');
    ripple.id = 'rippleDiv';
    
    ripple.style.position = "absolute";
    ripple.style.width = "100%";
    ripple.style.height = "100%";
    
    ripple.style.left = "0";
    ripple.style.top = "0";
    document.querySelector('body').appendChild(ripple);
    ripple.style.zIndex - "-10";
    document.addEventListener('mousemove', addRipple);
    document.addEventListener('touchmove', addRipple);
}

function addRipple(event) {
    let newCircle = document.createElement('div');
    newCircle.style.border = '1px solid #F8F8F8';
    newCircle.style.position = 'absolute';
    newCircle.style.width = '20px';
    newCircle.style.height = '20px';
    newCircle.style.left = `${event.clientX - 10}px`;
    newCircle.style.top = `${event.clientY - 10}px`;
    newCircle.style.borderRadius = '50%';
    document.getElementById('rippleDiv').appendChild(newCircle);
    let newAnimation = newCircle.animate(
        [
            {
                transform: "scale(500%)",
                opacity: 0
            }
        ],
        {
            duration: 1000
        }
    );
    newAnimation.onfinish = (event) => {
        newCircle.remove();
    };

}



