document.addEventListener('DOMContentLoaded', () => {
    // Configuración del juego
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
    let canFlip = true; // Bloqueador para evitar voltear durante animaciones

    const memoryBoard = document.getElementById('memory-board');
    const winMessage = document.getElementById('win-message');
    const replayBtn = document.getElementById('replay-btn');

    // Crear tablero
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.index = index;
        
        // Eventos para touch y click
        cardElement.addEventListener('click', flipCard);
        cardElement.addEventListener('touchend', flipCard, { passive: true });
        
        memoryBoard.appendChild(cardElement);
    });

    function flipCard(e) {
        if (!canFlip) return;
        
        e.preventDefault();
        const selectedCard = e.currentTarget;
        
        // Evitar acciones si la carta ya está volteada
        if (selectedCard.classList.contains('flipped') || 
            selectedCard.classList.contains('matched')) return;
        
        // Voltear carta
        selectedCard.classList.add('flipped');
        selectedCard.style.backgroundImage = `url(${gameCards[selectedCard.dataset.index].image})`;
        flippedCards.push(selectedCard);
        
        // Verificar match cuando hay 2 cartas volteadas
        if (flippedCards.length === 2) {
            canFlip = false;
            setTimeout(checkForMatch, 600);
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.id === card2.dataset.id;
        
        if (isMatch) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            // Verificar victoria
            if (matchedPairs === cards.length) {
                setTimeout(showWinMessage, 500);
            }
        } else {
            // Volver a voltear las cartas si no hay match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = 'url(images/back-card.png)';
                card2.style.backgroundImage = 'url(images/back-card.png)';
            }, 500);
        }
        
        flippedCards = [];
        canFlip = true;
    }

    function showWinMessage() {
        winMessage.style.display = 'block';
        winMessage.classList.remove('hidden');
        
        // Efecto de confeti (opcional)
        if (window.confetti) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    // Reiniciar juego
    replayBtn.addEventListener('click', () => {
        location.reload();
    });

    // Cargar confeti (opcional)
    const confettiScript = document.createElement('script');
    confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js';
    document.head.appendChild(confettiScript);
});
