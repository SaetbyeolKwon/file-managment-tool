document.addEventListener('DOMContentLoaded', async function() {
    let items = [];
    try {
        const scriptTag = document.currentScript || document.querySelector('script[data-jsonfile]');
        const jsonFileName = scriptTag.getAttribute('data-jsonfile');
        const response = await fetch(jsonFileName);
        
        if (response.ok) {
            items = await response.json();
        } else {
            throw new Error('Failed to load items list');
        }
    } catch (error) {
        console.error('Error loading items:', error);
        return;
    }

    const fileList = document.getElementById('fileList');
    const filesToZip = {};

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    fileList.appendChild(tableContainer);

    // header
    const headerRow = document.createElement('div');
    headerRow.className = 'row';
    headerRow.innerHTML = `<div class="cell">Name</div><div class="cell">Color</div><div class="drop-area">Drag & Drop File Here</div>`;
    tableContainer.appendChild(headerRow);

    // compare the name on the list and actual file name
    function checkFileName(dropCell, itemName, fileName) {
        // Convert strings to lowercase so it's not case sensitive.
        const itemNameLower = itemName.toLowerCase();
        const fileNameLower = fileName.toLowerCase();

        const hasWordInItem = (word) => itemNameLower.includes(word.toLowerCase()) && !fileNameLower.includes(word.toLowerCase());
        const hasWordInFile = (word) => !itemNameLower.includes(word.toLowerCase()) && fileNameLower.includes(word.toLowerCase());

        const hasWord = (word) => itemName.includes(word) && !fileName.includes(word);
        if (hasWordInItem('Sun') || hasWordInItem('LBF') || hasWordInFile('Sun') || hasWordInFile('LBF')) {
            dropCell.classList.remove('file-uploaded');
            dropCell.classList.add('file-error');
        } else {
            dropCell.classList.add('file-uploaded');
            dropCell.classList.remove('file-error');
        }
    }

    // rows for items with separate drop areas
    items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'row';

        const nameCell = document.createElement('div');
        nameCell.className = 'cell';
        nameCell.textContent = item.name;

        const colorCell = document.createElement('div');
        colorCell.className = 'cell';
        colorCell.textContent = item.color;

        const dropCell = document.createElement('div');
        dropCell.className = 'drop-area';
        dropCell.textContent = 'Empty';

        dropCell.addEventListener('dragover', e => e.preventDefault());
        dropCell.addEventListener('drop', e => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            filesToZip[item.name] = file;
            dropCell.textContent = `${file.name}`;
            dropCell.classList.add('file-uploaded'); // Change background color when file is uploaded
            checkFileName(dropCell, item.name, file.name);
        });

        row.appendChild(nameCell);
        row.appendChild(colorCell);
        row.appendChild(dropCell);

        tableContainer.appendChild(row);
    });

    // zip and download
    document.getElementById('zipButton').addEventListener('click', () => {
        const zipName = prompt("Please enter a name for the zip file:", "Batch.zip");
        if (zipName) {
            const zip = new JSZip();
            Object.keys(filesToZip).forEach(name => {
                const file = filesToZip[name];
                if (file) {
                    zip.file(file.name, file);
                }
            });
            zip.generateAsync({type: 'blob'}).then(content => {
                saveAs(content, zipName);
            });
        }
    });
});
