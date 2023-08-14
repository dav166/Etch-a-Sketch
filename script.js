document.addEventListener('DOMContentLoaded', function() {
    createGrid(16);

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetGrid);
});

function createGrid(size) {
    const container = document.getElementById('container');

    // Set the square dimensions
    const squareSize = 960 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Hover effect
        square.addEventListener('mouseenter', function() {
            // Increase the interaction count
            let count = parseInt(this.getAttribute('data-count') || 0);
            this.setAttribute('data-count', count + 1);

            if (count === 0) {
                // First interaction: set a random color
                this.style.backgroundColor = getRandomColor();
            } else {
                // Subsequent interactions: darken the color
                const currentColor = this.style.backgroundColor;
                this.style.backgroundColor = darkenColor(currentColor, 10);
            }
        });

        container.appendChild(square);
    }
}

function darkenColor(rgbColor, percent) {
    percent = Math.min(percent, 100); // Ensure percent does not exceed 100%
    
    const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const matches = rgbColor.match(regex);

    const r = Math.floor(parseInt(matches[1]) * (1 - percent / 100));
    const g = Math.floor(parseInt(matches[2]) * (1 - percent / 100));
    const b = Math.floor(parseInt(matches[3]) * (1 - percent / 100));

    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function resetGrid() {
    let input = prompt('Enter the size for the new grid (max 100):', 16);

    // Check if Cancel was clicked
    if (input === null) {
        console.log("User cancelled the prompt");
        return;
    }

    let newSize = parseInt(input);
    console.log("Entered size:", newSize); // Debugging statement

    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }

    // Remove old squares
    const container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    console.log("Old grid cleared"); // Debugging statement

    // Create new grid
    createGrid(newSize);
    console.log("New grid created with size:", newSize); //Debugging statement
}
