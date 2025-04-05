document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        { id: 1, image: 'images/foto1.jpg' },
        { id: 2, image: 'images/foto2.jpg' },
        { id: 3, image: 'images/foto3.jpg' },
        { id: 4, image: 'images/foto4.jpg' },
        { id: 5, image: 'images/foto5.jpg' },
        { id: 6, image: 'images/foto6.jpg' }
    ];

    const gameCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    let flippedCards = [];
    let matchedPairs = 0;

    const memoryBoard = document.getElementById('memory-board');
    const winModal = document.getElementById('win-modal');
    const closeBtn = document.querySelector('.close-btn');
    const replayBtn = document.getElementById('replay-btn');

    // Crear tablero
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.index = index;
        
        cardElement.addEventListener('click', flipCard);
        cardElement.addEventListener('touchend', flipCard, { passive: true });
        
        memoryBoard.appendChild(cardElement);
    });

    function flipCard(e) {
        e.preventDefault();
        const selectedCard = e.currentTarget;
        
        if (selectedCard.classList.contains('flipped') return;
        
        selectedCard.classList.add('flipped');
        selectedCard.style.backgroundImage = `url(${gameCards[selectedCard.dataset.index].image})`;
        flippedCards.push(selectedCard);
        
        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.id === card2.dataset.id) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            // Verificar si todas las cartas están emparejadas
            if (matchedPairs === cards.length) {
                setTimeout(() => {
                    winModal.classList.remove('hidden');
                }, 1000);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = 'url(images/back-card.png)';
                card2.style.backgroundImage = 'url(images/back-card.png)';
            }, 500);
        }
        
        flippedCards = [];
    }

    // Cerrar modal y reiniciar juego
    closeBtn.addEventListener('click', () => {
        winModal.classList.add('hidden');
    });

    replayBtn.addEventListener('click', () => {
        winModal.classList.add('hidden');
        location.reload();
    });

    // Cerrar modal al hacer clic fuera del contenido
    winModal.addEventListener('click', (e) => {
        if (e.target === winModal) {
            winModal.classList.add('hidden');
        }
    });
});
