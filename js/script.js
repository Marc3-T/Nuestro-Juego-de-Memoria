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
    const replayBtn = document.getElementById('replay-btn');

    // Crear tablero
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.index = index;
        cardElement.style.setProperty('--front-image', `url('${card.image}')`);
        
        cardElement.addEventListener('click', flipCard);
        cardElement.addEventListener('touchend', flipCard, { passive: true });
        memoryBoard.appendChild(cardElement);
    });

    function flipCard(e) {
        const selectedCard = e.currentTarget;
        
        if (selectedCard.classList.contains('flipped') || flippedCards.length >= 2) return;
        
        selectedCard.classList.add('flipped');
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
                    winModal.classList.remove('hidden');
                    triggerConfetti();
                }, 800);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }
        
        flippedCards = [];
    }

    function triggerConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
    }

    replayBtn.addEventListener('click', () => {
        winModal.classList.add('hidden');
        resetGame();
    });

    function resetGame() {
        memoryBoard.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        gameCards.sort(() => Math.random() - 0.5).forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;
            cardElement.dataset.index = index;
            cardElement.style.setProperty('--front-image', `url(${card.image})`);
            cardElement.addEventListener('click', flipCard);
            cardElement.addEventListener('touchend', flipCard, { passive: true });
            memoryBoard.appendChild(cardElement);
        });
    }
});
