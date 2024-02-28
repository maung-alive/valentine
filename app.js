var button = null;
const openBtn = document.querySelector(".heart");
const innerContent = document.querySelector(".inner-container");

const mainContent = `
  <h1 class="question-text">
    Will you be my valentine?
    <span class="line"></span>
  </h1>
  <span class="clicked"></span>
  <div class="btn-container">
    <button class="pushable" id="positive" onClick="sayYes()">
      Yes
   </button>
    <button class="pushable" id="negative" onClick="sayNo()">
      No
    </button>
  </div>
`

const sayYesContent = `
  <img src="./gifs/hasher.gif" class="hasher-gif" />
  <img src="./gifs/kiss.gif" class="kiss-gif" />
  <img src="./gifs/flykiss.gif" class="flykiss-gif" />
  <img src="./gifs/pichu.gif" class="pichu-gif" />
  <img src="./gifs/kissup.gif" class="kissup-gif" />
  <img src="./gifs/loving.gif" class="loving-gif" />
  <img src="./gifs/hug.gif" class="hug-gif" />
  <div class="loveyou-text">
    Yayy!!!!<br />
    I love you tooooooo <span class="name">Hannah</span>!<br />
    I Love you more than all my ex!!! <br />
    Truth!!! 😭
  </div>
`

const noWords = [
  "No is No",
  "Are you sure about that?",
  "I said No is No",
  "No is always no",
  "Why don't you think for me?",
  "Why?? I am cute 🥺🥺",
  "I love you 😭😭",
  "I gonna cry 🙁",
  "I will die, Don't!! 😭😭😭",
  "Yap. I dead!",
  "You should care me :(",
  "Believe me I love you more than 3000 (What stupid iron suite guy said)",
  "I love you in every time I breath ToT"
]

var noWordIndex = 0;

const sayNo = () => {
  document.querySelector('.clicked').innerHTML = noWords[noWordIndex];
  if(noWordIndex == noWords.length){
    noWordIndex = 0;
  }
  noWordIndex += 1;
}

const sayYes = () => {
  innerContent.innerHTML = sayYesContent;
}

openBtn.addEventListener('click', () => {
  let dataOpen = openBtn.getAttribute('data-open');
  if(dataOpen == 'false'){
    openBtn.style.backgroundColor = '#ffc5e6';
    openBtn.style.color = '#ff2644'
    openBtn.style.top = '0%';
    innerContent.style.height = '50vh';
    innerContent.style.padding ='50px';
    innerContent.style.boxShadow = '0 0 5px 4px rgba(84, 69, 69, 0.3)';
    setTimeout(() => {
      innerContent.innerHTML += mainContent;
      button = document.querySelector("#negative");
    }, 450)
    openBtn.setAttribute('data-open', 'true')
  }
})

// Add an event listener to the document or any specific element
document.addEventListener('mousemove', mouse_position);

// Define the mouse_position function
function mouse_position(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const buttonOffset = getOffset(button);
  const buttonX = buttonOffset.left + (button.offsetWidth /2);
  const buttonY = buttonOffset.top ;

  
  const distance = calculateDistance(mouseX, mouseY, buttonX, buttonY);

  if (distance < 100) {
    const displacementFactor = (100 - distance) * 0.1;
    
    const perspectiveFactor = calculatePerspectiveFactor(buttonX, buttonY);
    button.style.transform = `translate(${-(mouseX - buttonX) * displacementFactor * perspectiveFactor}px, ${-(mouseY - buttonY) * displacementFactor * perspectiveFactor}px)`;
    button.style.perspective = `${9 - (10 - 4) * perspectiveFactor + 0.3}cm`;
    button.style.transformStyle = 'preserve-3d';
    button.style.transform += ` rotateX(${-25 * perspectiveFactor}deg) rotateY(${10 * perspectiveFactor}deg) rotateZ(${-5 * perspectiveFactor}deg)`;
  } else {
    button.style.transform = 'none';
    button.style.perspective = 'none';
    button.style.transformStyle = 'flat';
  }
}


function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function calculateDistance(X, Y, x, y) {
  const dist = Math.sqrt((X - x) ** 2 + (Y - y) ** 2);
  return Math.ceil(dist);
}

function calculatePerspectiveFactor(x, y) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Calculate the distance of the button from the center of the screen
    const distanceFromCenter = Math.sqrt((x - screenWidth / 2) ** 2 + (y - screenHeight / 2) ** 2);
    
    // Calculate the perspective factor based on the distance from the center
    const perspectiveFactor = 1 - distanceFromCenter / (Math.sqrt(screenWidth ** 2 + screenHeight ** 2) / 2);
    
    return perspectiveFactor;
  }


