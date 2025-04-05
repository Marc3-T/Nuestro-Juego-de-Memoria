document.addEventListener('DOMContentLoaded', () => {
    // ===== CONFIGURACIÓN =====
    const cards = [
        { id: '1', image: 'images/foto1.jpg' }, // ¡Usa strings para IDs!
        { id: '2', image: 'images/foto2.jpg' },
        { id: '3', image: 'images/foto3.jpg' }
    ];

    // ===== ESTADO DEL JUEGO =====
    const gameCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    let flippedCards = [];
    let matchedPairs = 0;
    let lockBoard = false;

    // ===== ELEMENTOS DOM =====
    const memoryBoard = document.getElementById('memory-board');
    const winMessage = document.getElementById('win-message');
    const replayBtn = document.getElementById('replay-btn');

    // ===== INICIALIZAR TABLERO =====
    function initBoard() {
        memoryBoard.innerHTML = '';
        gameCards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.dataset.id = card.id;
            cardEl.dataset.index = index;
            
            // ¡Importante! Usar eventos pointer para compatibilidad iOS
            cardEl.addEventListener('pointerdown', flipCard);
            
            memoryBoard.appendChild(cardEl);
        });
    }

    // ===== VOLTEAR CARTA =====
    function flipCard(e) {
        if (lockBoard) return;
        
        const selectedCard = e.currentTarget;
        
        // Evitar voltear cartas ya emparejadas
        if (selectedCard.classList.contains('matched')) return;
        
        // Si ya está volteada, no hacer nada
        if (flippedCards.includes(selectedCard)) return;
        
        // Voltear
        selectedCard.classList.add('flipped');
        selectedCard.style.backgroundImage = `url('${gameCards[selectedCard.dataset.index].image}')`;
        flippedCards.push(selectedCard);
        
        // Verificar match
        if (flippedCards.length === 2) {
            lockBoard = true;
            setTimeout(checkForMatch, 800);
        }
    }

    // ===== VERIFICAR MATCH =====
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.id === card2.dataset.id;
        
        if (isMatch) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            // Diagnóstico en consola
            console.log(`Pares acertados: ${matchedPairs}/${cards.length}`);
            
            // Verificar victoria
            if (matchedPairs === cards.length) {
                setTimeout(() => {
                    winMessage.style.display = 'flex'; // ¡Clave para Safari!
                    console.log('¡Mensaje de victoria activado!');
                }, 500);
            }
        } else {
            // Volver a voltear
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = '';
                card2.style.backgroundImage = '';
            }, 500);
        }
        
        flippedCards = [];
        lockBoard = false;
    }

    // ===== REINICIAR =====
    replayBtn.addEventListener('click', () => {
        winMessage.style.display = 'none';
        matchedPairs = 0;
        initBoard();
    });

    // ===== INICIAR JUEGO =====
    initBoard();
});
