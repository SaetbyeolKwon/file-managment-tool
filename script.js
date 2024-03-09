document.addEventListener('DOMContentLoaded', function() {
    const items = [
        {
            "name": "Durand Extra Narrow-668-ODF",
            "color": "Rose Water"
        },
        {
            "name": "Durand Extra Wide LBF-668-ODF",
            "color": "Rose Water"
        },
        {
            "name": "Durand Extra Wide-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Durand Extra Wide-668-ODF",
            "color": "Rose Water"
        },
        {
            "name": "Durand LBF-668-ODF",
            "color": "Rose Water"
        },
        {
            "name": "Durand Medium-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Durand Medium-668-ODF",
            "color": "Rose Water"
        },
        {
            "name": "Durand Medium-911-ODF",
            "color": "Crystal with Oak Barrel"
        },
        {
            "name": "Durand Narrow-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Durand Narrow-668-ODF",
            "color": "Rose Water"
        },
        {
            "name": "Durand Wide LBF-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Durand Wide LBF-668-ODF",
            "color": "Rose Water"
        },
        {
            "name": "Durand Wide-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Durand Wide-668-ODF",
            "color": "Rose Water"
        },
        {
            "name": "Durand Wide-704-ODF",
            "color": "Palm Crystal"
        },
        {
            "name": "Durand Wide-911-ODF",
            "color": "Crystal with Oak Barrel"
        },
        {
            "name": "Percey Extra Narrow-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Percey Extra Wide LBF-207-ODF",
            "color": "Chestnut Crystal"
        },
        {
            "name": "Percey Extra Wide-207-ODF",
            "color": "Chestnut Crystal"
        },
        {
            "name": "Percey LBF-207-ODF",
            "color": "Chestnut Crystal"
        },
        {
            "name": "Percey Narrow-207-ODF",
            "color": "Chestnut Crystal"
        },
        {
            "name": "Percey Wide LBF-207-ODF",
            "color": "Chestnut Crystal"
        },
        {
            "name": "Percey Wide-207-ODF",
            "color": "Chestnut Crystal"
        },
        {
            "name": "Percey Wide-706-ODF",
            "color": "Seaweed Crystal with Amber Tortoise"
        },
        {
            "name": "Percey-207-ODF",
            "color": "Chestnut Crystal"
        },
        {
            "name": "Percey-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Percey-570-ODF",
            "color": "Crystal with Oak Barrel and Blue Bay"
        },
        {
            "name": "Percey-706-ODF",
            "color": "Seaweed Crystal with Amber Tortoise"
        },
        {
            "name": "Chamberlain Extra Wide-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Chamberlain LBF-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Chamberlain Wide-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Chamberlain-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Esme Epigraph-1345-ODF",
            "color": "Bellflower Crystal with Polished Gold"
        },
        {
            "name": "Esme LBF-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Esme Wide-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Esme-500-ODF",
            "color": "Crystal"
        },
        {
            "name": "Wilkie Extra Narrow-165-ODF",
            "color": "Sea Glass Grey"
        },
        {
            "name": "Wilkie Extra Narrow-325-ODF",
            "color": "Eastern Bluebird Fade"
        },
        {
            "name": "Wilkie Extra Wide LBF-325-ODF",
            "color": "Eastern Bluebird Fade"
        },
        {
            "name": "Wilkie Extra Wide-165-ODF",
            "color": "Sea Glass Grey"
        },
        {
            "name": "Wilkie Extra Wide-325-ODF",
            "color": "Eastern Bluebird Fade"
        },
        {
            "name": "Wilkie LBF-325-ODF",
            "color": "Eastern Bluebird Fade"
        },
        {
            "name": "Wilkie-165-ODF",
            "color": "Sea Glass Grey"
        },
        {
            "name": "Wilkie-325-ODF",
            "color": "Eastern Bluebird Fade"
        },
        {
            "name": "Wilkie-506-ODF",
            "color": "Crystal with English Oak"
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
