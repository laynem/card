/**** DEBUGGER ****/
function setDebug() {
    $("#debug").text(debug);
    if(debug) {
        $("div#debugger").css("visibility", "visible");
    }
}
function debugMessage(message) {
    if(debug) {
        $("div#debugger ul").prepend("<li>"+message+"</li>")
    }
}

function toggleDebug() {
    const toggleOff = "<span class=\"material-symbols-sharp toggle-off\" onclick=\"toggleDebug();\">toggle_off</span>";
    const toggleOn = "<span class=\"material-symbols-sharp toggle-on\" onclick=\"toggleDebug()\">toggle_on</span>";
    if($("div#tools ul li span.toggle-off").length == 1) {
        $("div#tools ul li span.toggle-off").replaceWith(toggleOn);
        $("div#debugger").css("visibility", "visible");
    } else { 
        $("div#tools ul li span.toggle-on").replaceWith(toggleOff);
        $("div#debugger").css("visibility", "hidden");
    }
}

/**** SHUFFLE CARDS ****/
function shuffleArray(array) {
    debugMessage("=== SHUFFLE ARRAY START ===");
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    debugMessage("Data:" + array);
    debugMessage("=== SHUFFLE ARRAY END ===");
    return array;
}

function range(start, end, step = 1) {
    debugMessage("=== RANGE ===");
    const arr = [];
    debugMessage("Arr: " + arr);
    debugMessage("Start: " + start);
    debugMessage("End: " + end);
    debugMessage("Step: " + step);
    for (let i = start; i < end; i += step) {
        arr.push(i);
    }
    debugMessage("=== RANGE END ===");
    return arr;
}

function dealCard(id) {
    debugMessage("=== DEAL CARD ===");
        let _id = id;
    debugMessage("MINION ID: "+_id);
        let _card = cardDeck["cards"][_id];
    debugMessage("MINION CARD: "+_card);
    debugMessage("Deck: " + deck);  
        $("div#table ul#dungeon").append(createCard(_card, _id));
    debugMessage("=== DEAL CARD END ===");
}

function loadDungeon() {
    debugMessage("=== LOAD DUNGEON ===");
    debugMessage("myDungeon: " + myDungeon);
        // Load new ids into dungeon
        for(var i = myDungeon.length; i < 4; i++) {
            myDungeon.push(myDeck.shift(0));
        }
    debugMessage("myDungeon: " + myDungeon);
        // Deal out each card from myDungeon array
        myDungeon.forEach(id => {
            dealCard(id);
    debugMessage("card: " + id);
        });
        // Set Potion to false 
        myPotion = false;
    debugMessage("myPotion: " + myPotion);
    debugMessage("=== LOAD DUNGEON END ===");
}

/**** GAME START ****/
function startGame() {
    debugMessage("=== START GAME ===");
        notification("Welcome to Scoundrel, a rogue-like solo card game.");
        hideFireworks();
        defaultValues();
        shuffleMyDeck();
        clearTable();
        loadDungeon();
        updateUI();

        gameStart = true;
    debugMessage("=== START GAME END ===");
}

function updateUI() {
    debugMessage("=== UPDATE UI ===");
        setCardsRemaining();
        setFlee();
        setHP();
        setMyDamage();
        setMyDungeons();
        setMyKilledMinions();
        setMyMaxMinions();
        setPotion();
        
        setDebug();
    debugMessage("=== UPDATE UI END ===");
}

function defaultValues() {
    debugMessage("=== DEFAULT VALUES ===");
        gameStart = false;
        myDeck = [];
        myDiscard = [];
        myEquipment = [];
        myDungeon = [];
        myLife = 20;
        myFlee = false;
        myDamage = 0;
        myDungeons = 0;
        myKilledMinions = 0;
        myMaxMinions = 99;
        myPotion = false;
        debug = true;
    debugMessage("=== DEFAULT VALUES END ===");
}

function shuffleMyDeck() {
    debugMessage("=== SHUFFLE CARDS ===");
    debugMessage("Max Cards: " + cardDeck.cards.length);
        const numbers = range(1, cardDeck.cards.length);
    debugMessage("numbers: " + numbers);
        myDeck = shuffleArray(numbers);
    debugMessage("myDeck: " + myDeck);
    debugMessage("=== SHUFFLE CARDS END ===");
}

/**** NOTIFICATIONS ****/
function notification(message) {
    debugMessage("=== NOTIFICATION ===");
    debugMessage("Message: " + message);
        $("#notification").removeClass().addClass("animate__animated animate__fadeOutUp");
        setTimeout(function() {
            $("#notification").removeClass().text(message).addClass("animate__animated animate__fadeInUp");
        }, 200);
    debugMessage("=== NOTIFICATION END ===");
}

/**** SET VARIABLES ****/
function setHP() {
    debugMessage("=== SET HP ===");
    // Write hp to game
    $("#hp").text(myLife);
    debugMessage("Data: " + myLife);
    debugMessage("=== SET HP ===");
}

function setCardsRemaining() {
    debugMessage("=== SET CARDS REMAINING IN DECK ===");
    // Cards remaining in my deck
    $("#cardsRemaining").text(myDeck.length);
    debugMessage("Data: " + myDeck.length);
    debugMessage("=== SET CARDS REMAINING IN DECK END ===");
}

function setFlee() {
    debugMessage("=== SET FLEE STATUS ===");
    // You can cannot flee from back to back dungeons
    if(myFlee) { $("#flee").text("NO"); } else { $("#flee").text("YES"); }
    debugMessage("Data: " + myFlee);
    debugMessage("=== SET FLEE STATUS END ===");
}

function setPotion() {
    debugMessage("=== SET POTION STATUS ===");
    // You can only use one potion in each dungeon, any other potion used is discarded
    if(myPotion) { $("#myPotion").text("NO"); } else { $("#myPotion").text("YES"); }
    debugMessage("Data: " + myPotion);
    debugMessage("=== SET POTION STATUS END ===");
}

function setMyDungeons() {
    debugMessage("=== SET DUNGEONS RUN ===");
    // Dungeons cleared
    $("#dungeonCleared").text(myDungeons);
    debugMessage("Data: " + myDungeons);
    debugMessage("=== SET DUNGEONS RUN END ===");
}

function setMyKilledMinions() {
    debugMessage("=== SET KILLED MINIONS ===");
    // Minions killed
    $("#minionsKilled").text(myKilledMinions);
    debugMessage("Data: " + myKilledMinions);
    debugMessage("=== SET KILLED MINIONS END ===");
}

function setMyDamage() {
    debugMessage("=== SET DAMAGE ===");
    // Current Weapon Damage
    $("#damage").text(myDamage);
    debugMessage("Data: " + myDamage);
    debugMessage("=== SET DAMAGE END ===");
}

function setMyMaxMinions() {
    debugMessage("=== SET MAX MINION DAMAGE ===");
    // The max minion rank 
    $("#maxMinion").text(myMaxMinions);
    debugMessage("Data: " + myMaxMinions);
    debugMessage("=== SET MAX MINION DAMAGE END ===");
}   

function setMyDungeon() {
    debugMessage("=== SET DUNGEON CARDS ===");
        // Current cards in the dungeon
        $("#dungeonCards").text(JSON.stringify(myDungeon));
    debugMessage("Data: " + JSON.stringify(myDungeon));
    debugMessage("=== SET DUNGEON CARDS END ===");
}

/**** GLOBAL ACTIONS ****/
function convertRank(rank) {
    switch(rank) {
        case "Jack":
            return 11;
        case "Queen":
            return 12;
        case "King":
            return 13;
        case "Ace":
            return 14;
        default:
            return rank;
    }
}

function winCondition() {
    vex.closeAll();
    gameStart = false;
    $("div#fireworkContainer").removeClass("hidden");
    vex.dialog.confirm({
        message: 'YOU WON!',
        escapeButtonCloses: false,
        overlayClosesOnClick: false,
        buttons: [
            {
                type: "button",
                text: "Start Over",
                class: "vex-dialog-button-primary",
                click: function () {
                    startGame();
                    vex.close(this);
                }
            },
            {
                type: "button",
                text: "Cancel",
                class: "vex-dialog-button-primary",
                click: function () {
                    vex.close(this);
                }
            }
        ],
        callback: function (value) { }
    })
}

function removeCard(id) {
    let blank = blankCard();
    $("playing-card[card-id="+id+"]").replaceWith(blank);
    // Check to see if the dungeon is empty 
    if(myDungeon.length == 1) {
        // Clear dungeon cards out
        $("div#table ul#dungeon playing-card:not(#deck)").each(function() {
            $(this).remove();
        });
        loadDungeon();
    }
}

function hideFireworks() {
    if(!$("div#fireworkContainer").hasClass("hidden")) {
        $("div#fireworkContainer").addClass("hidden");
    }
}

function showFireworks() {
    $("div#fireworkContainer").removeClass("hidden");
}


/**** CARD ACTIONS ****/
function cardAction(id, e) {
    let card = cardDeck["cards"][id];
    switch(card.suit) {
        case "Diamonds": // Equipment
            equipCard(id);
            break;
        case "Hearts":
            potionCard(id);
            break;
        case "Spades":
            minionCard(id);
            break;
        case "Clubs":
            minionCard(id);
            break;
        default:
            break;
    }       
}

/**** CARD ACTION TYPES ****/
function equipCard(id) { // Placing equipment card in dungeon into hand
    debugMessage("=== EQUIPMENT CARD IN DUNGEON ===");
        const _id = id;
    debugMessage("_id: "+_id);
        const _card = cardDeck["cards"][_id];
    debugMessage("_card: "+_card);
        const existing_id = $("div#table ul#hand playing-card#equipment").attr("card-id");
    debugMessage("existing_id: "+existing_id);
        const existing_card = cardDeck["cards"][existing_id];
    debugMessage("existing_card: "+existing_card);
        let minion_id, minion_card;
    debugMessage("minion_id: "+minion_id);
    debugMessage("minion_card: "+minion_card);
        // Set your new damage
        const _rank = convertRank(_card.rank);
    debugMessage("Card Rank: "+_rank);
        myDamage = _rank;
    debugMessage("myDamage: "+myDamage);
        // Remove card From Dungeon
        myDungeon = myDungeon.filter(item => item !== Number(_id));
    debugMessage("remove card id: "+_id);
    debugMessage("myDungeon: "+myDungeon);
        removeCard(_id);
        if(existing_id) { // If you already have an equipment card
            // discard card
            discardCard(existing_card, existing_id);
            // Remove equipment id from myEquipment
            myEquipment = myEquipment.filter(item => item !== Number(existing_id));
    debugMessage("myEquipment: "+myEquipment);
            // Remove all minion cards
            $("div#table ul#hand playing-card#minion").each(function() { 
                minion_id = $(this).attr("card-id");
    debugMessage("minion_id: "+minion_id);
                minion_card = cardDeck["cards"][minion_id];
    debugMessage("minion_card: "+minion_card);
                discardCard(minion_card, minion_id)
                $(this).remove();
            });
        }
        // Move equipement to hand
        $("div#table ul#hand playing-card#equipment").replaceWith(createEquipmentCard(_card, _id));
        // Add card id to myEquipment
        myEquipment.push(Number(_id));
    debugMessage("myEquipment: "+myEquipment);
        
        // Reset Max Minion
        myMaxMinions = 99;
    debugMessage("myMaxMinions: "+myMaxMinions);
        updateUI();
    debugMessage("=== EQUIPMENT CARD IN DUNGEON END ===");
}

function potionCard(id) {
    debugMessage("=== USE POTION CARD ===");
    const _id = id;
    debugMessage("_id: " + _id);
    const _card = cardDeck["cards"][id];
    debugMessage("_card: " + _card);
    var message;
    debugMessage("message: " + message);
    debugMessage("myPotion: " + myPotion);
    if(!myPotion) { // Can use potion
        debugMessage("=== POTION USE ACCEPTED ===");
        let heal = _card.rank; // max possible heal
        debugMessage("heal: " + heal);
        // Heal
        calculateHealth(heal, 0);
        // Remove Item From Dungeon
        myDungeon = myDungeon.filter(item => item !== Number(_id));
        removeCard(_id);
        // Set potion status
        myPotion = true;
    } else { // Cant use potion
        debugMessage("=== POTION USE FAILED ===");
        message = "You are unable to use any more health potions in this dungeon.";
        notification(message);
    }
    // Remove Item From Dungeon
    myDungeon = myDungeon.filter(item => item !== Number(_id));
    removeCard(_id);
    // Move card to discard
    discardCard(_card, _id);
    updateUI();
    debugMessage("=== USE POTION CARD END ===");
}

function minionCard(id) {
    debugMessage("=== MINION CARD SELECTED ===");
    let _id = id;
    debugMessage("MINION ID: "+_id);
    let _card = cardDeck["cards"][_id];
    debugMessage("MINION CARD: "+_card);
    let cardRank = convertRank(_card.rank);
    debugMessage("MINION CARD RANK: "+cardRank);
    // Check max minion rank
    debugMessage("MAX MINION RANK: "+myMaxMinions);
    if(Number(myMaxMinions) > Number(cardRank)) {
        // Check equipment
        debugMessage("HAS EQUIP: "+myEquipment.length);
        if(myEquipment.length > 0) { // Has A Weapon
            // Has a weapon
            // Ask if user wants to defend with weapon or hand
            vex.dialog.confirm({
                message: 'What do you want to fight the minion?',
                escapeButtonCloses: false,
                overlayClosesOnClick: false,
                buttons: [
                    {
                        type: "button",
                        text: "Weapon",
                        class: "vex-dialog-button-primary",
                        click: function () {
                            calculateWeaponDamage(cardRank);
                            // Remove minion card from dungeon
                            myDungeon = myDungeon.filter(item => item !== Number(_id));
                            removeCard(_id);
                            // Add minion card to hand
                            $("div#table ul#hand").append(createMinionCard(_card, _id));
                            // Change MaxMinion rank only when fighting with weapon
                            myMaxMinions = cardRank;
                            setMyMaxMinions();
                            vex.close(this);
                        }
                    },
                    {
                        type: "button",
                        text: "Hand",
                        class: "vex-dialog-button-primary",
                        click: function () {
                            calculateHandDamage(cardRank);
                            // Remove minion card from dungeon
                            myDungeon = myDungeon.filter(item => item !== Number(_id));
                            removeCard(_id);
                            // Move card to discard
                            $("div#table ul#hand li#discard").replaceWith(discardCard(_card, _id));
                            vex.close(this);
                        }
                    },
                    {
                        type: "button",
                        text: "Cancel",
                        class: "vex-dialog-button-primary",
                        click: function () {
                            vex.close(this);
                        }
                    }
                ],
                callback: function (value) { }
            })
        } else {
            // No weapon
            // Ask if user wants to defend with weapon or hand
            vex.dialog.confirm({
                message: 'You have no weapon to defend with. What do you want to fight this minion with your hand?',
                escapeButtonCloses: false,
                overlayClosesOnClick: false,
                buttons: [
                    {
                        type: "button",
                        text: "Hand",
                        class: "vex-dialog-button-primary",
                        click: function () {
                            calculateHandDamage(cardRank);
                            // Remove minion card from dungeon
                            myDungeon = myDungeon.filter(item => item !== Number(_id));
                            removeCard(_id);
                            // Move card to discard
                            $("div#table ul#hand li#discard").replaceWith(discardCard(_card, _id));
                            vex.close(this);
                        }
                    },
                    {
                        type: "button",
                        text: "Cancel",
                        class: "vex-dialog-button-primary",
                        click: function () {
                            vex.close(this);
                        }
                    }
                ],
                callback: function (value) { }
            })
        }
    } else {
        // Ask if user wants to defend with weapon or hand
        vex.dialog.confirm({
            message: 'This minion is too strong for you. What do you want to fight this minion with your hand?',
            escapeButtonCloses: false,
            overlayClosesOnClick: false,
            buttons: [
                {
                    type: "button",
                    text: "Hand",
                    class: "vex-dialog-button-primary",
                    click: function () {
                        vex.close(this);
                        calculateHandDamage(cardRank);
                        // Remove minion card from dungeon
                        myDungeon = myDungeon.filter(item => item !== Number(_id));
                        removeCard(_id);
                        // Move card to discard
                        $("div#table ul#hand li#discard").replaceWith(discardCard(_card, _id));
                    }
                },
                {
                    type: "button",
                    text: "Cancel",
                    class: "vex-dialog-button-primary",
                    click: function () {
                        vex.close(this);
                    }
                }
            ],
            callback: function (value) { }
        })
    }
    debugMessage("=== MINION CARD SELECTED END ===");
}

/**** CALCULATE DAMAGE ****/
function calculateHealth(change, type) {
    if(type == 0) { 
        // You Healed
        var previousLife = Number(myLife);
        myLife = Number(myLife) + Number(change);
        if(myLife > 20) { 
            myLife = 20; // Cannot exceed 20
        }
        var heal = myLife - previousLife;
        var message = "You have been healed for "+heal+" HP.";
        notification(message);
    } else {
        // You took damage
        myLife = Number(myLife) - Number(change);
        var message = "You took "+change+" damage.";
        notification(message);
    }
    // Update HP Number
    setHP(); 
    // Check to see if you died
    if(Number(myLife) <= 0) {
        vex.closeAll();
        vex.dialog.alert('GAME OVER!');
        exit;
    }
}

function calculateWeaponDamage(minionDamage) {
    debugMessage("=== CALC WEAPON DAMAGE ===");
        var damage = 0;
    debugMessage("Damage: " + damage);
    debugMessage("minionDamage: " + minionDamage);
        if(minionDamage > myDamage) {
            damage = minionDamage - myDamage;
    debugMessage("Damage: " + damage);
        }
        if(damage < 0) {
            damage = 0;
    debugMessage("Set Damage Zero: " + damage);
        }
        calculateHealth(damage, 1);
    debugMessage("=== CALC WEAPON DAMAGE END ===");
}

function calculateHandDamage(minionDamage) {
    calculateHealth(minionDamage, 1);
}

/**** CARD TYPES ****/
function createCard(card, id) {
    return "<playing-card onclick=\"cardAction("+id+", this)\" card-id=\""+id+"\" rank=\""+card.rank+"\" suit=\""+card.suit+"\"></playing-card>";
}

function blankCard() {
    return "<playing-card rank=\"0\" backcolor=\"white\" backtext=\" \"></playing-card>"; 
}

function discardCard(card, id) {
    // standard discard card
    let playingCard = "<playing-card id=\"discard\" card-id=\""+id+"\" rank=\""+card.rank+"\" suit=\""+card.suit+"\"></playing-card>";
    // add card to discard pile
    $("div#table ul#hand playing-card#discard").replaceWith(playingCard);
    // add id to myDiscard
    myDiscard.push(Number(id));
}

function createEquipmentCard(card, id) {
    return "<playing-card id=\"equipment\" card-id=\""+id+"\" rank=\""+card.rank+"\" suit=\""+card.suit+"\"></playing-card>";
}

function createMinionCard(card, id) {
    return "<playing-card id=\"minion\" card-id=\""+id+"\" rank=\""+card.rank+"\" suit=\""+card.suit+"\"></playing-card>";
}


function getRandomCard() {
    let obj_keys = Object.keys(cardDeck["cards"]);
    let ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];

    return {"card":cardDeck["cards"][ran_key], "id":ran_key};
}


function clearTable() {
        // Cards
    debugMessage("=== CLEAR TABLE ===");
        const cardDiscard = "<playing-card id=\"discard\" rank=\"0\" backcolor=\"white\" backtext=\" \"></playing-card>";
    debugMessage("cardDiscard: "+cardDiscard);
        const cardEquipment = "<playing-card id=\"equipment\" rank=\"0\" backcolor=\"white\" backtext=\" \"></playing-card>";
    debugMessage("cardEquipment: "+cardEquipment);
        // Clear Table
        $("div#table ul#dungeon playing-card:not(#deck)").each(function() {
            $(this).remove();
        });
        $("div#table ul#hand playing-card#minion").each(function() {
            $(this).remove();
        })
        $("div#table ul#hand playing-card#discard").replaceWith(cardDiscard);
        $("div#table ul#hand playing-card#equipment").replaceWith(cardEquipment);
    debugMessage("=== CLEAR TABLE END ===");
}

function resetGame() { 
    clearGame();
}