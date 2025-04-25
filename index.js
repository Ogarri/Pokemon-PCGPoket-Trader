document.addEventListener('DOMContentLoaded', () => {
    const CELL_HEIGHT = 200;
    const CELL_WIDTH = 140;
    let connectedUser = null;
    let userData = [];

    // Charger les données JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            userData = data;
        });

    const container = document.createElement('div');
    container.className = 'grid-container';
    document.body.appendChild(container);

    const cells = [];
    for (let i = 0; i < 286; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = i + 1;
        cell.style.width = `${CELL_WIDTH}px`;
        cell.style.height = `${CELL_HEIGHT}px`;
        let isImageVisible = false;

        cell.addEventListener('click', () => {
            if (connectedUser) {
                if (isImageVisible) {
                    cell.innerHTML = i + 1;
                    const index = connectedUser.Cartes.indexOf(i + 1);
                    if (index > -1) connectedUser.Cartes.splice(index, 1);
                } else {
                    const img = document.createElement('img');
                    img.src = `assets/${i + 1}.png`;
                    img.alt = `Image ${i + 1}`;
                    cell.innerHTML = '';
                    cell.appendChild(img);
                    connectedUser.Cartes.push(i + 1);
                }
                isImageVisible = !isImageVisible;
                saveUserData();
            }
        });

        container.appendChild(cell);
        cells.push(cell);
    }

    const headerButtons = document.createElement('div');
    headerButtons.className = 'header-buttons';

    const connectionButton = document.createElement('button');
    connectionButton.textContent = 'Connection';
    connectionButton.addEventListener('click', () => {
        const pseudo = prompt('Entrez votre pseudo :');
        const user = userData.find(u => u.Pseudo === pseudo);
        if (user) {
            connectedUser = user;
            displayConnectedUser();
            highlightUserCards();
        } else {
            alert('Pseudo non trouvé.');
        }
    });
    headerButtons.appendChild(connectionButton);

    const inscriptionButton = document.createElement('button');
    inscriptionButton.textContent = 'Inscription';
    inscriptionButton.addEventListener('click', () => {
        const newWindow = window.open('', '_blank', 'width=400,height=200');
        newWindow.document.write(`
            <input type="text" id="newPseudo" placeholder="Entrez votre pseudo">
            <button id="validate">Valider</button>
            <script>
                document.getElementById('validate').addEventListener('click', () => {
                    const pseudo = document.getElementById('newPseudo').value;
                    window.opener.registerNewUser(pseudo);
                    window.close();
                });
            </script>
        `);
    });
    headerButtons.appendChild(inscriptionButton);

    document.body.appendChild(headerButtons);

    const connectedUserDisplay = document.createElement('div');
    connectedUserDisplay.className = 'connected-user';
    connectedUserDisplay.style.position = 'absolute';
    connectedUserDisplay.style.top = '10px';
    connectedUserDisplay.style.left = '10px';
    connectedUserDisplay.style.fontSize = '16px';
    connectedUserDisplay.style.fontWeight = 'bold';
    document.body.appendChild(connectedUserDisplay);

    function displayConnectedUser() {
        connectedUserDisplay.textContent = `Connecté : ${connectedUser.Pseudo}`;
    }

    function highlightUserCards() {
        cells.forEach((cell, index) => {
            const cardNumber = index + 1;
            if (connectedUser.Cartes.includes(cardNumber)) {
                const img = document.createElement('img');
                img.src = `assets/${cardNumber}.png`;
                img.alt = `Image ${cardNumber}`;
                cell.innerHTML = '';
                cell.appendChild(img);
            } else {
                cell.innerHTML = cardNumber;
            }
        });
    }

    function saveUserData() {
        fetch('data.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData, null, 2)
        });
    }

    window.registerNewUser = (pseudo) => {
        if (!userData.find(u => u.Pseudo === pseudo)) {
            const newUser = { Pseudo: pseudo, Cartes: [] };
            userData.push(newUser);
            connectedUser = newUser;
            displayConnectedUser();
            saveUserData();
        } else {
            alert('Pseudo déjà utilisé.');
        }
    };
});