// Set Variable
var characterList = [];
var enemiesList = [];
var character = '';
var defender = '';
var yattack = 0;
var eattack = 0;
var processStatus = 'standby';
var killedname = ''
var yattackCount = 0;
var gameover = false;
var gamestatus = '';


// Reset Game
function reset(){
    enemiesList.length = 0;
    characterList.length = 0;
    character = '';
    defender = '';
    yattack = 0;
    eattack = 0;
    processStatus = 'standby';
    killedname = ''
    yattackCount = 0;
    gameover = false;
    gamestatus = '';

    characterList = [
        {
            picid: 1,
            name: "Obi-Wan Kenobi",
            hp: 120
        },       
        {
            picid: 2,
            name: "Luke Skywalker",
            hp: 100
        },  
        {
            picid: 3,
            name: "Darth Sidious",
            hp: 150
        },       
        {
            picid: 4,
            name: "Darth Maul",
            hp: 180
        }  
    ]
    $("#clist").text('')
    for (let i = 0; i < characterList.length; i++) {
    $('#clist').append(`
        <div class="icon-c" data-iconc="${i}">  
            <li>${characterList[i].name}</li>
                <img class="characterimg" src="./assets/images/${characterList[i].picid}c.jpg" alt="${characterList[i].picid}c">
            <li>${characterList[i].hp}</li>
        </div>`)
    }
    $('#yourchar').text('')
    $('#enemies').text('')
    $('#defender').text('')
    $("#result").text('')
    $("#restart").text('')
}


// Update display
function updateDisplay(){
    //Display Character List or your character   
    if (character.length !== 0) { 
        $("#clist").text('')   
        $("#yourchar").html(`
            <div class="icon-y" data-icony="c">  
                <li>${character.name}</li>
                    <img class="characterimg" src="./assets/images/${character.picid}c.jpg" alt="${character.picid}c">
                <li>${character.hp}</li>
            </div>`)
    }
   
    //display your enemies
    if (enemiesList.length > 0){
        $('#enemies').text('')
        for (let i = 0; i < enemiesList.length; i++) {
            $("#enemies").append(`
                <div class="icon-e" data-icone="${i}">  
                    <li>${enemiesList[i].name}</li>
                        <img class="characterimg" src="./assets/images/${enemiesList[i].picid}c.jpg" alt="${enemiesList[i].picid}c">
                    <li>${enemiesList[i].hp}</li>
                </div>`)
        } 
    }
    else{
        $('#enemies').text('')
    }

    //display your defender
    if (defender.length !== 0) {
            $("#defender").html(`
                <div class="icon-d" data-icond="d">  
                    <li>${defender.name}</li>
                        <img class="characterimg" src="./assets/images/${defender.picid}c.jpg" alt="${defender.picid}c">
                    <li>${defender.hp}</li>
                </div>`
            )
            $("#result").text('')
    }
    else {
        $('#defender').text('')
    }
    

    // check status and update display
    if ( (yattack !== 0) && (eattack !== 0) && (processStatus === 'attack') ) {      
        $("#result").html(`<p>You attacked ${defender.name} for ${(yattack*yattackCount)} damage.</p>
                           <p>${defender.name} attacked you back for ${eattack} damage.</p>`)
    }

    if (processStatus === 'completed'){
        $("#result").html(`<p>You have defated ${killedname}, you can choose to fight another enemy</p>`)
        processStatus = 'standby';
    }

    if (gameover){
        if (gamestatus === 'lose'){
            $("#result").html(`<p id="pRed">You been defeated... GAME OVER!!!</p>`)
        }
        else if (gamestatus === 'win'){
            $("#result").html(`<p id="pOrange">You Won !!! You may restart a new game.</p>`)
        }
        
        $("#restart").html(`<button onclick="reset()">Restart</button>`)      
    }
}

// When click on Attack button
function attack(){    
    if (!gameover){
        if (defender.length === 0) {
            $("#result").html(`<p id="pRed">No enemy here.</p>`)
        }
        else {
            if (processStatus === 'standby'){
                killedname = '';
                processStatus = 'attack'
                yattack = Math.floor(Math.random() * 25) + 1
                console.log('Your random attack: ' + yattack)
                eattack = Math.floor(Math.random() * 25) + 1
                console.log('Defender random attack: ' + eattack)            
            }

            yattackCount++;
            console.log('Your attack count: ' + yattackCount)
            character.hp = character.hp - eattack
            defender.hp = defender.hp - (yattack*yattackCount)      
        }
        
        if (character.hp <= 0) {
            gameover = true
            gamestatus = 'lose'
            processStatus = 'standby'
        }  
        else if ( (enemiesList.length > 0) && (defender.hp <= 0) ){
            processStatus = 'completed'
            killedname = defender.name
            defender = ''
        }
        else if ( (enemiesList.length <= 0) && (defender.hp <= 0) ){
            gameover = true
            gamestatus = 'win'
            processStatus = 'standby'
            killedname = defender.name
            defender = ''
        }
        updateDisplay()
    }
}

// Main Program Logic
reset()

// When click on character list icon, set selection as character
$(document).on("click", ".icon-c", function(){  
    if (character.length === 0 ) {
        // set your character
        character = characterList[$(this).attr("data-iconc")];
        console.log('Your character: ' + character.name)

        // set your enemies
        for (let i = 0; i < characterList.length; i++) {
            if ( characterList[i].picid !== character.picid ){
                enemiesList.push(characterList[i])
            }
        }
    }
    updateDisplay() 
})

// When click on Enemies list icon, set selection as defender
$(document).on('click', ".icon-e", function () {
    if (defender.length === 0 ) {
        // set your defender
        defender = enemiesList[$(this).attr("data-icone")];
        console.log('Your defender: ' + defender.name)

        // update your enemies
        for(let i = enemiesList.length-1; i >= 0; i--){  
            if(enemiesList[i] == defender){             
                enemiesList.splice(i,1);                
            }
        }
        //console.log(enemiesList)
    }
    updateDisplay();
 })

