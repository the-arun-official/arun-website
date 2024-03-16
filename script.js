// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');
const sendButton = document.querySelector('.send-button'); // Assuming there's a send button in your chatbox UI

textarea.addEventListener('input', function () {
    textarea.style.height = 'auto'; // Reset the height to auto to correctly calculate the new height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to fit the content
});

textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter key is pressed without Shift key
        e.preventDefault(); // Prevent default behavior (new line)
        chatboxForm.dispatchEvent(new Event('submit')); // Dispatch a submit event on the form
    }
});

// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
    chatboxMessage.classList.toggle('show');
});

// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function (e) {
    dropdownMenu.classList.toggle('show');
    e.stopPropagation(); // Prevent the click event from bubbling up and triggering the document click listener
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.chatbox-message-dropdown')) {
        dropdownMenu.classList.remove('show');
    }
});

// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isValid(textarea.value)) {
        writeMessage(textarea.value);
        setTimeout(autoReply, 1000);
    }
});

function writeMessage(messageText) {
    const today = new Date();
    const message = `
        <div class="chatbox-message-item sent">
            <span class="chatbox-message-item-text">${messageText.trim().replace(/\n/g, '<br>\n')}</span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    resetTextarea();
    scrollBottom();
}

function autoReply() {
    const today = new Date();
    const replyMessage = `
        <div class="chatbox-message-item received">
            <span class="chatbox-message-item-text">Kindly mail to csarun866@gmail.com for further queries❤️</span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', replyMessage);
    scrollBottom();
}

function addZero(num) {
    return num < 10 ? '0' + num : num;
}

function scrollBottom() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

function isValid(value) {
    return value.trim().length > 0;
}

function resetTextarea() {
    textarea.value = '';
    textarea.style.height = 'auto';
}


//navigation
  
  const navEl = document.getElementById("nav-mobile-menu");
  const nav = document.getElementsByTagName("nav");
  
  navEl.addEventListener("click", () => {
      nav[1].classList.toggle("active");
  });


 // ---------------------------------------------------float social media panel-----------------------------------------------

 const floating_btn = document.querySelector('.floating-btn');
 const close_btn = document.querySelector('.close-btn');
 const social_panel_container = document.querySelector('.social-panel-container');
 
 floating_btn.addEventListener('click', () => {
	 social_panel_container.classList.toggle('visible')
 });
 
 close_btn.addEventListener('click', () => {
	 social_panel_container.classList.remove('visible')
 });

//----------------------------------------mouse effect------------------------------------------------------------------------
let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
}

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;
  
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
      selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
      px = value => withUnit(value, "px"),
      ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
        diffY = b.y - a.y;
  
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
      removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createStar = position => {
  const star = document.createElement("span"),
        color = selectRandom(config.colors);
  
  star.className = "star fa-solid fa-sparkle";
  
  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);
  
  appendElement(star);

  removeElement(star, config.starAnimationDuration);
}

const createGlowPoint = position => {
  const glow = document.createElement("div");
  
  glow.className = "glow-point";
  
  glow.style.left = px(position.x);
  glow.style.top = px(position.y);
  
  appendElement(glow)
  
  removeElement(glow, config.glowDuration);
}

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);


const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
        quantity = determinePointQuantity(distance);
  
  const dx = (current.x - last.x) / quantity,
        dy = (current.y - last.y) / quantity;
  
  Array.from(Array(quantity)).forEach((_, index) => { 
    const x = last.x + dx * index, 
          y = last.y + dy * index;
    
    createGlowPoint({ x, y });
  });
}

const updateLastStar = position => {
  last.starTimestamp = new Date().getTime();

  last.starPosition = position;
}

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
  if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = e => {
  const mousePosition = { x: e.clientX, y: e.clientY }
  
  adjustLastMousePosition(mousePosition);
  
  const now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
        hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;
  
  if(hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);
    
    updateLastStar(mousePosition);
  }
  
  createGlow(last.mousePosition, mousePosition);
  
  updateLastMousePosition(mousePosition);
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);




