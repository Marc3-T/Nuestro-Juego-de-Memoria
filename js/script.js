document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        { id: 1, image: 'images/foto1.jpg' },
        { id: 2, image: 'images/foto2.jpg' },
        { id: 3, image: 'images/foto3.jpg' },
        { id: 4, image: 'images/foto4.jpg' },
        { id: 5, image: 'images/foto5.jpg' },
        { id: 6, image: 'images/foto6.jpg' }
    ];

    // Duplicar y mezclar carta
    const gameCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    let flippedCards = [];
    let matchedPairs = 0;
    let canFlip = true;

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
        if (!canFlip) return;
        
        e.preventDefault();
        const selectedCard = e.currentTarget;
        
        if (selectedCard.classList.contains('flipped') || 
            selectedCard.classList.contains('matched') || 
            flippedCards.length >= 2) {
            return;
        }
        
        selectedCard.classList.add('flipped');
        selectedCard.style.backgroundImage = `url('${gameCards[selectedCard.dataset.index].image}')`;
        flippedCards.push(selectedCard);
        
        if (flippedCards.length === 2) {
            canFlip = false;
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.id === card2.dataset.id) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            card1.style.backgroundImage = `url('${gameCards[card1.dataset.index].image}')`;
            card2.style.backgroundImage = `url('${gameCards[card2.dataset.index].image}')`;
            
            if (matchedPairs === cards.length) {
                setTimeout(() => {
                    winModal.classList.remove('hidden');
                }, 800);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = 'url("images/back-card.png")';
                card2.style.backgroundImage = 'url("images/back-card.png")';
            }, 500);
        }
        
        flippedCards = [];
        canFlip = true;
    }

    // Cerrar o reiniciar el juego
    closeBtn.addEventListener('click', () => {
        winModal.classList.add('hidden');
    });

    replayBtn.addEventListener('click', () => {
        winModal.classList.add('hidden');
        setTimeout(() => {
            location.reload();
        }, 300);
    });

    // Precargar imágenes para mejor rendimiento
    function preloadImages() {
        const images = [];
        gameCards.forEach(card => {
            images.push(card.image);
        });
        images.push('images/back-card.png');
        images.push('images/foto-special.jpg');
        
        images.forEach(image => {
            new Image().src = image;
        });
    }
    
    preloadImages();
});
});
