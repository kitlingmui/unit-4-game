// // Set Varaiables
const characterList = [
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
    },    
]

var enemiesList = [];
var character;
var defender;
var yattack = 0;
var eattack = 0;
var ytotal = 0;

// Reset Game
function reset(){
    character = '';
    defender = '';
    enemiesList.length = 0;

    // for (let i = 0; i < enemiesList.length; i++) {
    //     enemiesList.pop()
    // }

    //Character List
    $('#clist').html('')
    for (let i = 0; i < characterList.length; i++) {
    $('#clist').append(`
        <div class="icon-c" data-icon="${i}">  
            <li>${characterList[i].name}</li>
                <img class="characterimg" src="./assets/images/${characterList[i].picid}c.jpg" alt="${characterList[i].picid}c">
            <li>${characterList[i].hp}</li>
        </div>`)
    }
    //Reset Your Character Section
    $('#yourchar').html('<div></div>')
    
    //Reset Enemies Section
    $('#enemies').html('<div></div>')

    //Reset Defender Section
    $('#defender').html('<div></div>')

    //Reset Result Section
    $("#result").text('')
}

// Update display
function updateDisplay(){
    //Character List
    $("#clist").text('')

    //display your character
    if (character.length !== 0){
    $("#yourchar").html(`
        <div class="icon-y" data-icon="c">  
            <li>${character.name}</li>
                <img class="characterimg" src="./assets/images/${character.picid}c.jpg" alt="${character.picid}c">
            <li>${character.hp}</li>
        </div>`)
    }

    //display your enemies
    $("#enemies").text('')
    for (let i = 0; i < enemiesList.length; i++) {
        $("#enemies").append(`
            <div class="icon-e" data-icon="${i}">  
                <li>${enemiesList[i].name}</li>
                    <img class="characterimg" src="./assets/images/${enemiesList[i].picid}c.jpg" alt="${enemiesList[i].picid}c">
                <li>${enemiesList[i].hp}</li>
            </div>`)
    } 

    //display your defender
    if (defender.length !== 0) {
    $("#defender").html(`
        <div class="icon-d" data-icon="d">  
            <li>${defender.name}</li>
                <img class="characterimg" src="./assets/images/${defender.picid}c.jpg" alt="${defender.picid}c">
            <li>${defender.hp}</li>
        </div>`)
    $("#result").text('')
    }

}

// When click on Attack button
function attack(){
    if (defender.length === 0 ) {
        $("#result").html(`<p>No enemy here.</p>`)
    }
    else {
        if (yattack === 0 ){
            yattack = Math.floor(Math.random() * 25) + 1
            console.log(yattack)
        }
        if (eattack === 0 ){
            eattack = Math.floor(Math.random() * 25) + 1
            console.log(eattack)
        }
    
        $("#result").html(`<p>You attacked ${defender.name} for ${yattack} damage.</p>
                             <p>${defender.name} attacked you back for ${eattack} damage.</p>
        `)
        character.hp = character.hp - eattack
        defender.hp = defender.hp - yattack

        // check status
        if (character.hp <= 0){
            alert('game over')
            $("#result").html(`<p>You been defeated... GAME OVER!!!</p>`)
        }
        if (defender.hp <= 0){
            alert('win')
            $("#result").html(`<p>You have defated ${defender.name}, you can choose to fight another enemy</p>`)
        }
        updateDisplay();
    }
}
        

// Main Program Logic
reset()

// When click on character list icon
$(".icon-c").on("click", function(){
    
    if (character.length === 0 ) {
    // set your character
    character = characterList[$(this).attr("data-icon")]

    // set your enemies
    for (let i = 0; i < characterList.length; i++) {
        if ( characterList[i].picid !== character.picid ){
            enemiesList.push(characterList[i])
        }
    } 
    defender = enemiesList[0]
    updateDisplay();
    }
})


// To be fixed when on click enemies icon, now is hard code
// // When on enemies list icon
// $(".icon-e").on("click", function(){
//     console.log($(this))
//     // console.log($(this).attr("data-icone"))
//     // if (defender.length === 0 ) {
//     // // set your character
//     // defender = enemiesList[$(this).attr("data-icon")]
//     // console.log(defender)
//     // updateDisplay();
//     // alert("you select enemies")
//     // console.log($(this).attr("data-icon"))
//     // defender = enemiesList[$(this).attr("data-icon")]
//     // updateDisplay();   
// })
    


