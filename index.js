document.addEventListener('DOMContentLoaded', () => {
    const CELL_HEIGHT = 200;
    const CELL_WIDTH = 140;

    const container = document.createElement('div');
    container.className = 'grid-container';
    document.body.appendChild(container);

    for (let i = 0; i < 286; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = i + 1;
        cell.style.width = `${CELL_WIDTH}px`;
        cell.style.height = `${CELL_HEIGHT}px`;
        let isImageVisible = false;

        cell.addEventListener('click', () => {
            if (isImageVisible) {
                cell.innerHTML = i + 1;
            } else {
                const img = document.createElement('img');
                img.src = `assets/${i + 1}.png`;
                img.alt = `Image ${i + 1}`;
                cell.innerHTML = '';
                cell.appendChild(img);
            }
            isImageVisible = !isImageVisible;
        });

        container.appendChild(cell);
    }
});

