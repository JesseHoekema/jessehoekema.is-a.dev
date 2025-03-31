let DarkMode;
const svg = document.getElementById('svg');
const body = document.body;
const nametext = document.getElementById('text2');
const hellotext = document.getElementById('text1');
let project = document.getElementById('project');
let projects = document.querySelectorAll('#project');
const pagrafs = document.getElementsByTagName('p');
const about = document.getElementById('des');
const aboutProject = document.getElementById('title');
const widgets = document.querySelectorAll('#widget');
const nameinput = document.getElementById('name');
const emailinput = document.getElementById('email');
const messageinput = document.getElementById('message');
const sendbtn = document.getElementById('send-btn');
const style = document.createElement('style');
document.head.appendChild(style);

// Function to update the text color based on DarkMode
const updateTextColor = () => {
    const headers = document.getElementsByTagName('h1'); // Get all h1 elements
    for (let header of headers) {
        if (DarkMode) {
            localStorage.setItem('theme', 'dark');
            header.style.color = '#FFCC66'; // Light text for dark mode
            body.style.backgroundColor = '#24221D'
            hellotext.style.color = '#FFF1D4'
            nametext.style.color = '#FFCC66'
            body.classList.remove('light');
            body.classList.add('dark');
            svg.style.fill = '#FFCC66'
            for (let pagraf of pagrafs) {
                pagraf.style.color = '#FFFFFF'
            }
            
            for (let proj of projects) {
                proj.classList.remove('light');
                proj.classList.add('dark');
            } 
            for (let widget of widgets) {
                widget.classList.remove('light');
                widget.classList.add('dark');
            } 
            about.style.color = '#FFF1D4' 
            nameinput.style.border = '1px solid #FFCC66'
            emailinput.style.border = '1px solid #FFCC66'
            messageinput.style.border = '1px solid #FFCC66'
            sendbtn.style.backgroundColor = '#FFCC66'  
            sendbtn.style.color = '#000000'  
            kofiWidgetOverlay.draw('jessiflessi', {
                'type': 'floating-chat',
                'floating-chat.donateButton.text': 'Donate',
                'floating-chat.donateButton.background-color': '#FFCC66',
                'floating-chat.donateButton.text-color': '#000'
            });
               
        } else {
            localStorage.setItem('theme', 'light');
            header.style.color = '#000000'; // Dark text for light mode
            body.style.backgroundColor = '#FFCC66';
            nametext.style.color = '#5C4E30'
            hellotext.style.color = '#110C03'
            sendbtn.style.color = '#FFFFFF'  
            svg.style.fill = '#000000'
            body.classList.remove('dark');
            body.classList.add('light');

            project.classList.add('dark');
            nameinput.style.border = '1px solid #000000'
            emailinput.style.border = '1px solid #000000'
            messageinput.style.border = '1px solid #000000'
            sendbtn.style.backgroundColor = '#000000'
            for (let proj of projects) {
                proj.classList.remove('dark');
                proj.classList.add('light');
            } 
            for (let pagraf of pagrafs) {
                pagraf.style.color = '#110C03'
            }
            for (let widget of widgets) {
                widget.classList.remove('dark');
                widget.classList.add('light');
            } 
            kofiWidgetOverlay.draw('jessiflessi', {
                'type': 'floating-chat',
                'floating-chat.donateButton.text': 'Donate',
                'floating-chat.donateButton.background-color': '#5c4e30',
                'floating-chat.donateButton.text-color': '#fff'
            });
        }
    }
};

// Event listener for the SVG click
svg.addEventListener('click', () => {
    DarkMode = !DarkMode; // Toggle the DarkMode state
    updateTextColor(); // Update the text color based on the new DarkMode state
    console.log("DarkMode is now:", DarkMode);
});

// Initial color update

function donate() {
    kofiWidgetOverlay.draw('jessiflessi', {
        'type': 'floating-chat',
        'floating-chat.donateButton.text': 'Donate',
        'floating-chat.donateButton.background-color': '#FFCC66',
        'floating-chat.donateButton.text-color': '#000'
    });
}
donate()

function loadTheme() {
    if (localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') === 'dark') {
            DarkMode = true;
        } else {
            DarkMode = false;
        }
    } else {
        DarkMode = true;
    }
    updateTextColor();
}
loadTheme();
