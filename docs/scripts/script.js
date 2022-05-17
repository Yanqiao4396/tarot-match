var randomCards = []
var userChoices = []
var pstionId = ["1","2","3","4","5","6","7","8","9"]
// (image, position) pairs
var cardPstionPair = []
var chance = 8;
var startBtn = document.getElementById("startBtn");
var gameBtn = document.querySelectorAll(".gameButton")

gameBtn.forEach(
    elem =>{
        elem.addEventListener(
            "click",(evt)=>{
                let source = evt.target.id;
                activateButton(source)
                console.log(userChoices)
                setTimeout(()=>{
                    if(userChoices.length==2){
                        compare()
                    }
                },500)

            }
        )
    }
)
startBtn.addEventListener(
    "click", ()=>{
        setUp()
        playTurn()
        elem = document.getElementById("Instruction")
        elem.setAttribute("hidden","")
    }
)
function setUp(){    
    for(let step = 0; step < 5; step ++ ){
        let chosenIndex = Math.floor(Math.random()*22)
        while (randomCards.includes(chosenIndex.toString())){
            chosenIndex = Math.floor(Math.random()*22)
        }
        randomCards.push(chosenIndex.toString())
    }
    console.log(randomCards)
    setPair(randomCards)
    drawImag(cardPstionPair)
    
}
function setPair(targets){
    // Shuffle positionId
    pstionId = shuffle(pstionId)
    for (let step = 0; step < 5; step ++)
    {    
        if(pstionId.length > 1){
            cardPstionPair.push([targets[step],pstionId.pop()])
            cardPstionPair.push([targets[step],pstionId.pop()])
    }
    else{
        cardPstionPair.push([targets[step],pstionId.pop()])
    };
    console.log(cardPstionPair)
}
}
function drawImag(Pairs){
    for (let step = 0; step < 9; step ++){
        let elem = document.getElementById(Pairs[step][1])
        let imag = document.createElement("img")
        imag.setAttribute("src",`image/${Pairs[step][0]}.jpg`)
        imag.setAttribute("alt",`image/${Pairs[step][0]}.jpg`)
        imag.setAttribute("id",`${Pairs[step][0]}`)
        imag.setAttribute("style","position:relative ;height: 20vh; width: 15vh; left:-1vh;")
        // imag.setAttribute("hidden","true")
        elem.append(imag)
    }

}

function activateButton(buttonId){
    let elem = document.getElementById(buttonId)
    let imag = elem.getElementsByTagName("img")
    imag[0].removeAttribute("hidden")
    let imagId = imag[0].id
    userChoices.push([imagId,buttonId])
}

function playTurn(){

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function compare (){
    if (userChoices[0][0] != userChoices[1][0]){
        let elemOne = document.getElementById(userChoices[0][1])
        let elemTwo = document.getElementById(userChoices[1][1])
        let imagOne = elemOne.getElementsByTagName("img")
        let imagTwo = elemTwo.getElementsByTagName("img")
        imagOne[0].setAttribute("hidden","true")
        imagTwo[0].setAttribute("hidden","true")

    }
    userChoices = []
    chance --
}
