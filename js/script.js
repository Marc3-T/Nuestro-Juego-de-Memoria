document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        { id: 1, image: 'images/foto1.jpg' },
        { id: 2, image: 'images/foto2.jpg' },
        { id: 3, image: 'images/foto3.jpg' },
        { id: 4, image: 'images/foto4.jpg' },
        { id: 5, image: 'images/foto5.jpg' },
        { id: 6, image: 'images/foto6.jpg' }
    ];

    // Duplicar y mezclar cartas
    const gameCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    let flippedCards = [];
    let matchedPairs = 0;

    const memoryBoard = document.getElementById('memory-board');
    const winMessage = document.getElementById('win-message');
    const replayBtn = document.getElementById('replay-btn');

    // Crear tablero
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.index = index;
        
        // Usar eventos táctiles y de clic
        cardElement.addEventListener('click', flipCard);
        cardElement.addEventListener('touchend', flipCard, { passive: true });
        
        memoryBoard.appendChild(cardElement);
    });

    function flipCard(e) {
        e.preventDefault(); // Para Safari en iOS
        const selectedCard = e.currentTarget;
        
        // Evitar voltear si ya está volteada o emparejada
        if (selectedCard.classList.contains('flipped') || flippedCards.length >= 2) return;
        
        selectedCard.classList.add('flipped');
        selectedCard.style.backgroundImage = `url(${gameCards[selectedCard.dataset.index].image})`;
        flippedCards.push(selectedCard);
        
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.id === card2.dataset.id) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            if (matchedPairs === cards.length) {
                setTimeout(() => {
                    winMessage.classList.remove('hidden');
                }, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = 'url(images/back-card.jpg)';
                card2.style.backgroundImage = 'url(images/back-card.jpg)';
            }, 1000);
        }
        
        flippedCards = [];
    }

    replayBtn.addEventListener('click', () => {
        location.reload();
    });
});
