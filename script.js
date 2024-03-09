document.addEventListener('DOMContentLoaded', function() {
    const items = [
        {
            "name": "Sun_Durand Extra Wide LBF-668-SRW",
            "color": "Rose Water"
        },
        {
            "name": "Sun_Durand Extra Wide-668-SRW",
            "color": "Rose Water"
        },
        {
            "name": "Sun_Durand Medium-500-SRW",
            "color": "Crystal"
        },
        {
            "name": "Sun_Durand Medium-668-SRW",
            "color": "Rose Water"
        },
        {
            "name": "Sun_Durand Medium-723-SRW",
            "color": "Green Garnet Fade"
        },
        {
            "name": "Sun_Durand Narrow-668-SRW",
            "color": "Rose Water"
        },
        {
            "name": "Sun_Durand Wide LBF-668-SRW",
            "color": "Rose Water"
        },
        {
            "name": "Sun_Durand Wide-500-SRW",
            "color": "Crystal"
        },
        {
            "name": "Sun_Durand Wide-668-SRW",
            "color": "Rose Water"
        },
        {
            "name": "Sun_Percey Wide-319-SRW",
            "color": "Viridian"
        },
        {
            "name": "Sun_Percey-319-SRW",
            "color": "Viridian"
        },
        {
            "name": "Sun_Esme Epigraph-1345-SRW",
            "color": "Bellflower Crystal with Polished Gold"
        },
        {
            "name": "Sun_Esme LBF-500-SRW",
            "color": "Crystal"
        },
        {
            "name": "Sun_Esme Wide-500-SRW",
            "color": "Crystal"
        },
        {
            "name": "Sun_Esme-500-SRW",
            "color": "Crystal"
        },
        {
            "name": "Carlton Extra Wide-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Carlton Extra Wide-714-ODF",
            "color": "Seaweed Crystal"
        },
        {
            "name": "Carlton LBF-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Carlton LBF-714-ODF",
            "color": "Seaweed Crystal"
        },
        {
            "name": "Carlton Medium-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Carlton Medium-714-ODF",
            "color": "Seaweed Crystal"
        },
        {
            "name": "Carlton Wide LBF-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Carlton Wide LBF-714-ODF",
            "color": "Seaweed Crystal"
        },
        {
            "name": "Carlton Wide-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Carlton Wide-714-ODF",
            "color": "Seaweed Crystal"
        },
        {
            "name": "Hughes Wide-371-ODF",
            "color": "Pacific Crystal"
        },
        {
            "name": "Hughes-371-ODF",
            "color": "Pacific Crystal"
        },
        {
            "name": "Hughes-723-ODF",
            "color": "Green Garnet Fade"
        },
        {
            "name": "Crane LBF-165-ODF",
            "color": "Sea Glass Grey"
        },
        {
            "name": "Crane LBF-325-ODF",
            "color": "Eastern Bluebird Fade"
        },
        {
            "name": "Crane-165-ODF",
            "color": "Sea Glass Grey"
        },
        {
            "name": "Crane-325-ODF",
            "color": "Eastern Bluebird Fade"
        },
        {
            "name": "Crane-506-ODF",
            "color": "Crystal with English Oak"
        },
        {
            "name": "Whalen-332-ODF",
            "color": "Driftwood Fade"
        },
        {
            "name": "Whalen-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Daisy Extra Narrow-615-ODF",
            "color": "Tea Rose Fade"
        },
        {
            "name": "Daisy Medium LBF-615-ODF",
            "color": "Tea Rose Fade"
        },
        {
            "name": "Daisy Narrow LBF-615-ODF",
            "color": "Tea Rose Fade"
        },
        {
            "name": "Daisy Narrow-615-ODF",
            "color": "Tea Rose Fade"
        },
        {
            "name": "Daisy Wide LBF-615-ODF",
            "color": "Tea Rose Fade"
        },
        {
            "name": "Daisy Wide LBF-623-ODF",
            "color": "Cardinal Crystal"
        },
        {
            "name": "Daisy Wide-615-ODF",
            "color": "Tea Rose Fade"
        },
        {
            "name": "Daisy-615-ODF",
            "color": "Tea Rose Fade"
        }
    ];
    const fileList = document.getElementById('fileList');
    const filesToZip = {};

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    fileList.appendChild(tableContainer);

    // Create header
    const headerRow = document.createElement('div');
    headerRow.className = 'row';
    headerRow.innerHTML = `<div class="cell">Name</div><div class="cell">Color</div><div class="drop-area">Drag & Drop File Here</div>`;
    tableContainer.appendChild(headerRow);

    // Generate rows for items with separate drop areas
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
            dropCell.classList.add('file-uploaded'); // Change background color
        });

        row.appendChild(nameCell);
        row.appendChild(colorCell);
        row.appendChild(dropCell);

        tableContainer.appendChild(row);
    });

    // zip and download
    document.getElementById('zipButton').addEventListener('click', () => {
        const zipName = prompt("Please enter a name for the zip file:", "Batch.zip");
        if (zipName) { // Proceed if a name was entered
            const zip = new JSZip();
            Object.keys(filesToZip).forEach(name => {
                const file = filesToZip[name];
                if (file) {
                    zip.file(file.name, file);
                }
            });
            zip.generateAsync({type: 'blob'}).then(content => {
                saveAs(content, zipName); // Use the provided name for the zip file
            });
        }
    });
});
