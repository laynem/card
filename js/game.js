function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function range(start, end, step = 1) {
    const arr = [];
    for (let i = start; i < end; i += step) {
        arr.push(i);
    }
    return arr;
}

function setHP(hp) {
    if(hp > 20) {
        hp = 20;
    }
    $("#hp").text(hp);
    $("#hp").attr("data-hp", hp);
    myLife = hp;

    if(hp <= 0 && gameStart) {
        vex.dialog.alert('GAME OVER!');
    }
}

function setCardsRemaining() {
    $("#cardsRemaining").text(myDeck.length);
}

function setFlee() {
    if(myFlee) { $("#flee").text("Can't Flee"); } else { $("#flee").text("Can Flee"); }
}

function setPotion() {
    if(myPotion) { $("#myPotion").text("Can't Potion"); } else { $("#myPotion").text("Can Potion"); }
}

function setMyDungeons() {
    $("#dungeonCleared").text(myDungeons);
}

function setMyMinions() {
    $("#minionsKilled").text(myMinions);
}

function setMyDamage() {
    $("#damage").text(myDamage);
}

function setMyMaxMinions() {
    $("#maxMinion").text(myMaxMinions);
}   

function setMyDungeon() {
    $("#dungeonCards").text(JSON.stringify(myDungeon));
}

function startGame() {
    shuffleMyDeck();
    setHP(myLife);
    setCardsRemaining();
    setFlee();
    setMyDungeons();
    setMyMinions();
    dealCard(myDeck.shift(0));
    dealCard(myDeck.shift(0));
    dealCard(myDeck.shift(0));
    dealCard(myDeck.shift(0));
}

function shuffleMyDeck() {
    const numbers = range(1, cardDeck.cards.length);
    myDeck = shuffleArray(numbers);
}

function convertRank(rank) {
    switch(rank) {
        case "j":
            return 11;
        case "q":
            return 12;
        case "k":
            return 13;
        case "a":
            return 14;
        default:
            return rank;
    }
}

function removeCard(id) {
    let blank = blankCard();
    $("div[data-id="+id+"]").replaceWith(blank);
    // Check to see if the dungeon is empty 
    if(myDungeon.length == 1) {
        console.log("Load new dungeon");
        newDungeon();
    }
}

function discardCard(id) {
}

function minionCard(id) {
    let card = cardDeck["cards"][id];
    let cardRank = convertRank(card.rankName);
    // Check max minion rank
    if(myMaxMinions > cardRank) {
        // Check equipment
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
                            myDungeon = myDungeon.filter(item => item !== Number(id));
                            removeCard(id);
                            // Add minion card to hand
                            $("ul#hand.table").append(createMinionCard(card, id));
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
                            myDungeon = myDungeon.filter(item => item !== Number(id));
                            removeCard(id);
                            // Move card to discard
                            $("ul#hand.table li#discard").replaceWith(discardCard(card, id));
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
                message: 'This minion is too strong for you. What do you want to fight this minion with your hand?',
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
                            myDungeon = myDungeon.filter(item => item !== Number(id));
                            removeCard(id);
                            // Move card to discard
                            $("ul#hand.table li#discard").replaceWith(discardCard(card, id));
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
                        calculateHandDamage(cardRank);
                        // Remove minion card from dungeon
                        myDungeon = myDungeon.filter(item => item !== Number(id));
                        removeCard(id);
                        // Move card to discard
                        $("ul#hand.table li#discard").replaceWith(discardCard(card, id));
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
}

function equipCard(id) {
    let card = cardDeck["cards"][id];
    // Set your new damage
    let cardRank = convertRank(card.rankName);
    myDamage = cardRank;
    setMyDamage();
    // Remove Item From Dungeon
    myDungeon = myDungeon.filter(item => item !== Number(id));
    removeCard(id);
    // Move Equipment To Discard if Already Equipped
    newEquipCard();
    console.log("Equipment: "+ id);
    // Move equipement to hand
    $("ul#hand.table li#equipment").replaceWith(createEquipmentCard(card, id));
    // Move equipment to equipment array
    myEquipment.push(id); 
}

function potionCard(id) {
    let card = cardDeck["cards"][id];
    let heal = card.rankName;
    let hp = $("#hp").attr("data-hp");
    // Heal
    if(!myPotion) { // You only can use one potion per dungeon
        setHP(Number(hp) + Number(heal));
    } 
    // Remove Item From Dungeon
    myDungeon = myDungeon.filter(item => item !== Number(id));
    removeCard(id);
    // Move card to discard
    $("ul#hand.table li#discard").replaceWith(discardCard(card, id));
    myPotion = true;
    setPotion();
}

function newEquipCard() {
    console.log("newEquipCard");
    var cardid;
    
    cardid = $("ul#hand.table li#equipment div").attr("data-id");
    if(cardid) {
        myDiscard.push(Number(cardid));
        myEquipment = myEquipment.filter(item => item !== Number(cardid));
        console.log(myEquipment);
        console.log("Equip: "+cardid);
    }

    $("ul#hand.table li#minion div").each(function() {
        cardid = $(this).attr("data-id");
        myDiscard.push(cardid);
        $(this).parent().remove();
        console.log("Minion: "+cardid);
    });

    // Reset Max Minion
    myMaxMinions = 99;
}

function calculateWeaponDamage(minionDamage) {
    var damage = 0;
    if(minionDamage > myDamage) {
        damage = minionDamage - myDamage;
    }
    var hp = Number(myLife) - Number(damage);
    setHP(hp);
}

function calculateHandDamage(minionDamage) {
    var hp = Number(myLife) - Number(minionDamage);
    setHP(hp);
}

function blankCard() {
    return "<li id=\"blank\"><div class=\"card back shadowless plain\">*</div></li>";  
}

function unusedCard(id) {
    let card = cardDeck["cards"][id];
    return "<li><div data-id=\""+id+"\" class=\"card shadowless rank-"+card.rankName+" "+card.suitName+"\"><span class=\"rank\">"+card.rankDisp+"</span><span class=\"suit\">"+card.suitImage+"</span></div></li>";
}

function createCard(card, id) {
    return "<li><div onclick=\"cardAction("+id+")\" data-id=\""+id+"\" class=\"card shadowless rank-"+card.rankName+" "+card.suitName+"\"><span class=\"rank\">"+card.rankDisp+"</span><span class=\"suit\">"+card.suitImage+"</span></div></li>";
}

function createEquipmentCard(card, id) {
    return "<li id=\"equipment\"><div onclick=\"cardAction("+id+")\" data-id=\""+id+"\" class=\"card shadowless rank-"+card.rankName+" "+card.suitName+"\"><span class=\"rank\">"+card.rankDisp+"</span><span class=\"suit\">"+card.suitImage+"</span></div></li>";
}

function discardEquipmentCard(card, id) {
    return "<li id=\"discard\"><div data-id=\""+id+"\" class=\"card shadowless rank-"+card.rankName+" "+card.suitName+"\"><span class=\"rank\">"+card.rankDisp+"</span><span class=\"suit\">"+card.suitImage+"</span></div></li>";
}

function createMinionCard(card, id) {
    return "<li id=\"minion\"><div data-id=\""+id+"\" class=\"card shadowless rank-"+card.rankName+" "+card.suitName+"\"><span class=\"rank\">"+card.rankDisp+"</span><span class=\"suit\">"+card.suitImage+"</span></div></li>";
}

function discardCard(card, id) {
    return "<li id=\"discard\"><div data-id=\""+id+"\" class=\"card shadowless rank-"+card.rankName+" "+card.suitName+"\"><span class=\"rank\">"+card.rankDisp+"</span><span class=\"suit\">"+card.suitImage+"</span></div></li>";
}

function cardAction(id, e) {
    let card = cardDeck["cards"][id];
    switch(card.suitName) {
        case "diams":
            equipCard(id);
            break;
        case "hearts":
            potionCard(id);
            break;
        case "spades":
            minionCard(id);
            break;
        case "clubs":
            minionCard(id);
            break;
        default:
            break;
    }       
}

function getRandomCard() {
    let obj_keys = Object.keys(cardDeck["cards"]);
    let ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];

    return {"card":cardDeck["cards"][ran_key], "id":ran_key};
}

function dealCard(id) {
    let deck = {"card":cardDeck["cards"][id], "id":id};
    $("ul#dungeon.table").append(createCard(deck.card, deck.id));
}

function newDungeon() {
    var i = 0;
    // Clear dungeon cards out
    $("ul#dungeon.table li").each(function() {
        if(i > 0) {
            $(this).remove();
        }
        ++i;
    })
    // Load new ids into dungeon
    for(var i = 0; i < 3; i++) {
        myDungeon.push(myDeck.shift(0));
    }
    console.log(myDungeon);
    // Deal out each card from myDungeon array
    myDungeon.forEach(element => {
        console.log("card id: "+element);
        dealCard(element);
    });
    myPotion = false;
    setPotion();
    setMyDungeon();
    setCardsRemaining();
    
}

function startDungeon() {
    // Load new ids into dungeon
    for(var i = 0; i < 4; i++) {
        myDungeon.push(myDeck.shift(0));
    }
    console.log(myDungeon);
    // Deal out each card from myDungeon array
    myDungeon.forEach(element => {
        console.log("card id: "+element);
        dealCard(element);
    });
    myPotion = false;
    setPotion();
    setMyDungeon();
    setCardsRemaining();
}