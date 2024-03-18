const navLinks = [
    { href: 'index.html', text: 'Batch 1' },
    { href: 'batch2.html', text: 'Batch 2' },
    { href: 'batch3.html', text: 'Batch 3' },
    { href: 'batch4.html', text: 'Batch 4' },
    { href: 'batch5.html', text: 'Batch 5' },
    { href: 'batch6.html', text: 'Batch 6' },
    { href: 'batch7.html', text: 'Batch 7' },
    { href: 'batch8.html', text: 'Batch 8' },
    { href: 'batch8NC.html', text: 'Batch 8 NC' },
    { href: 'batch9.html', text: 'Batch 9' },
    { href: 'batch9NC.html', text: 'Batch 9 NC' },
    { href: 'batch10.html', text: 'Batch 10' },
    { href: 'batch10NC.html', text: 'Batch 10 NC' },
];

function generateNavigation() {
    const navElement = document.createElement('nav');
    navElement.id = 'main-nav';

    const ul = document.createElement('ul');
    
    navLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        ul.appendChild(li);
    });

    navElement.appendChild(ul);
    document.body.appendChild(navElement);
}

//load contents
function loadContents() {
    const fileList = document.createElement('div');
    fileList.id = 'fileList';
    document.body.appendChild(fileList);

    const buttonArea = document.createElement('div');
    buttonArea.id = 'button-area';
    const zipButton = document.createElement('button');
    zipButton.id = 'zipButton';
    zipButton.textContent = 'Zip Everything!';
    buttonArea.appendChild(zipButton);
    document.body.appendChild(buttonArea);
}

// load scripts
function loadScript(src, attributes = {}) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        Object.keys(attributes).forEach(key => script.setAttribute(key, attributes[key]));
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error: ${src}`));
        document.head.appendChild(script);
    });
}

async function initializePage() {
    generateNavigation();
    loadContents();
    loadScript();

    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js');
}

// Call on page load
document.addEventListener('DOMContentLoaded', initializePage);
