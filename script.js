document.addEventListener('DOMContentLoaded', function() {
    createGrid(16);
    document.getElementById('reset').addEventListener('click', resetGrid);
});

function createGrid(size) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    const squareHeight = calculateSquareHeight(container, size);

    for (let i = 0; i < size * size; i++) {
        const square = createSquare(squareHeight);
        container.appendChild(square);
    }
}

function calculateSquareHeight(container, size) {
    const gap = 1; // Gap size in pixels
    const border = 1; // Border size in pixels
    return (container.clientHeight - (size - 1) * gap - size * 2 * border) / size;
}

function createSquare(height) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.height = `${height}px`;
    square.addEventListener('mouseenter', onSquareHover);
    return square;
}

function onSquareHover() {
    const count = Math.min((parseInt(this.getAttribute('data-count') || 0) + 1), 10);
    this.getAttribute('data-count', count);
    this.style.backgroundColor = count === 1 ? getRandomColor() : darkenColor(this.style.backgroundColor, count * 10);
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
