//Player
const playerHand = [];
let playerScore = 0;


// Crea un mazo nuevo
const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
const data = await response.json();
const deckID = data.deck_id;

console.log("Deck ID obtenido:", deckID);

async function drawCard() {
    const drawButton = document.getElementById("drawButton");
    drawButton.innerHTML = "Pedir carta";

    try {

        // Saca una carta
        const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
        const drawData = await drawResponse.json();
        const card = drawData.cards[0];

        // Imprimir cartas
        const cardResult = document.getElementById("cardResult");

        playerHand.push(`${card.image}`);
        if (!Number(card['value'])) {
            playerScore = playerScore + 10;

        } else {
            playerScore = playerScore + Number(card['value']);
        }
        console.log(playerScore);
        console.log(card);


        const imageTags = playerHand.map(img => `<img src="${img}">`);

        cardResult.innerHTML = imageTags.join('');

    //  GAME OVER
        if (playerScore>21) {
            alert(
                "Perdiste"
            )					
            const drawButton = document.getElementById("drawButton");
            drawButton.innerHTML = "Jugar de nuevo";
            cardResult.innerHTML = "";
            
            await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/return`);
            playerScore = 0;

            for (let index = 0; index <= playerHand.length+2; index++) {
                playerHand.pop();
                
            }
        }

    } catch (error) {
        console.error("Hubo un error:", error);
        document.getElementById("cardResult").innerText =
            "Error al sacar la carta.";
    }
}

async function finish(){
    alert(
        "Tu resultado es: "+playerScore
    )					
    const drawButton = document.getElementById("drawButton");
    drawButton.innerHTML = "Jugar de nuevo";
    cardResult.innerHTML = "";
    
    await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/return`);
    playerScore = 0;

    for (let index = 0; index <= playerHand.length+2; index++) {
        playerHand.pop();
        
    }
}
// Llamadas
document.getElementById("drawButton").addEventListener("click", drawCard);
document.getElementById("finishGame").addEventListener("click", finish);