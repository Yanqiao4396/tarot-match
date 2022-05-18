var deck = Array.from({ length: 22 }, (_, i) => i)
var userChoices = []
var uniqueDraws = []
var positions = ["1","2","3","4","5","6","7","8","9"]
// (image, position) pairs
var cardPstionPair = []
var tracker = 4
var chance = 8;
var time = 40
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
                chanceCheck()
            }
        )
    }
)
startBtn.addEventListener(
    "click", ()=>{
        setUp()
        elem = document.getElementById("Instruction")
        elem.setAttribute("hidden","")
        const countDown = setInterval (()=>{
            time --
            document.getElementById("time").innerText=`Time left: ${time}`
            if (tracker <= 1){
                victory()
                clearInterval(countDown)
            }
            if(time <= 0){
                defeated()
                clearInterval(countDown)
            } },1000)
            
    }
    
)
function setUp(){    
    positions = shuffle(positions);
    pairs()
    drawImag()
    
}
const chooseIndex = () => {
    let index = Math.floor(Math.random() * deck.length);
    deck.splice(index, 1);
    return index.toString();
  }
  
  // Draw; we agree that index 0-3 are pairs, 4 is single
  function pairs() {
    let i = 0;
    // Pairs
    while(i < 4) {
      uniqueDraws.push(chooseIndex());
      i++;
    }
    console.log(deck)
    uniqueDraws = uniqueDraws.concat(uniqueDraws);
    // Single
    uniqueDraws.push(chooseIndex());
    uniqueDraws = shuffle(uniqueDraws);
    console.log(uniqueDraws)
  }
// function setPair(targets){
//     // Shuffle positionId
//     pstionId = shuffle(pstionId)
//     for (let step = 0; step < 5; step ++)
//     {    
//         if(pstionId.length > 1){
//             cardPstionPair.push([targets[step],pstionId.pop()])
//             cardPstionPair.push([targets[step],pstionId.pop()])
//     }
//     else{
//         cardPstionPair.push([targets[step],pstionId.pop()])
//     };
//     console.log(cardPstionPair)
// }
// }
function drawImag(){
    for ( let i =0; i < uniqueDraws.length; i++){
        console.log(typeof(uniqueDraws[i]))
        let elem = document.getElementById(positions[i])
        let imag = document.createElement("img")
        imag.setAttribute("src",`image/${uniqueDraws[i]}.jpg`)
        imag.setAttribute("alt",`tarot`)
        imag.setAttribute("id",`${uniqueDraws[i]}`)
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
    else if(userChoices[0][0] == userChoices[1][0]&&
        userChoices[0][1] != userChoices[1][1]
        ){
        tracker --
    }
    userChoices = []
    chance --
    document.getElementById("chance").innerText = `Chance left: ${chance}`
}

function chanceCheck(){
 if(chance < 1){
defeated()
 }
}

function defeated(){
    gameBtn.forEach(
        elem =>{
            elem.setAttribute("disabled","true")
        }
    )
    document.getElementById("defeated").removeAttribute("hidden")
}

function victory(){
    gameBtn.forEach(
        elem =>{
            elem.setAttribute("disabled","true")
        }
    )
    document.getElementById("victory").removeAttribute("hidden")
}


