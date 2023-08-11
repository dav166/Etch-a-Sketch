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
            this.style.backgroundColor = getRandomColor();
        });

        container.appendChild(square);
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function resetGrid() {
    let newSize = parseInt(prompt('Enter the size for the new grid (max 100):', 16));
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }

    // Remove old squares
    const container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Create new grid
    createGrid(newSize);
}
