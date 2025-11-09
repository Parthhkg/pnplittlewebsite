const unlockBtn = document.getElementById("unlock-btn");
const passwordInput = document.getElementById("password");
const lockScreen = document.getElementById("lock-screen");
const storyScene = document.getElementById("story-scene");
const errorMsg = document.getElementById("error");
const bgMusic = document.getElementById("bg-music");

const correctPassword = "31072025";

//

// Add skip button for unlock screen right away
createSkipButton(() => {
  // Hide lock screen
  lockScreen.style.display = "none";

  // Show story scene
  storyScene.style.display = "block";
  storyScene.classList.add("fade-in");

  // Play background music if available
  if (bgMusic) {
      bgMusic.volume = 0.4;
      bgMusic.currentTime = 0;
      bgMusic.play().catch(() => console.log("Autoplay blocked"));
  }

  // Start Scene 1 immediately
  startSceneOne();

  // Optional: add skip for Scene 1
  createSkipButton(() => startGameOne());
});

//

unlockBtn.addEventListener("click", () => {
    if (passwordInput.value === correctPassword) {

        // Play music immediately (direct user interaction)
        if(bgMusic){
            bgMusic.volume = 0.4;
            bgMusic.currentTime = 0;
            bgMusic.play().catch(() => console.log("Autoplay blocked"));
        } else {
            console.log("bgMusic element not found!");
        }

        // Fade out lock screen
        lockScreen.classList.add("fade-out");

        setTimeout(() => {
            lockScreen.style.display = "none";
            storyScene.style.display = "block";
            storyScene.classList.add("fade-in");

            startSceneOne(); // start first scene
            createSkipButton(() => startGameOne()); // 💥 adds skip
        }, 1000);

    } else {
        errorMsg.textContent = "That’s not our day... try again 💔";
    }
});

// Scene 1 typewriter animation
function startSceneOne() {
    const lineEl = document.getElementById("line");
    const nextBtn = document.getElementById("next-btn");

    const lines = [
        "Hey Baby ❤️❤️ ",
        "As you can see, this is me..",
        "The guy who's sort of crazy for you.. 🙄",
        "And this glowing thing below me?",
        "That's my will — the part of me that'll never give up on you. :)",
        "It wanted to say something today... 😁",

        "Ik how bad it must've felt when u (AND I) realised that I hadn't saved your no.",
        "I figured u must've gotten that feeling of being taken for granted.",
        "Especially after u had done so many cute things for us two",
        "A scrapbook and a cute Insta account just for the two of us and just so much more love :)",
        "Tbh, I didn't really have a good way to show u how much I really did appreciate you at that time",
        "Instead of just talking it out, I wanted to do something just for you.",
        "I wanted to speak through my actions",
        "And so, here is what I tried to make for us :)"
    ];

    let currentLine = 0;

    function typeLine(text, callback) {
        lineEl.textContent = "";
        let i = 0;
        const interval = setInterval(() => {
            lineEl.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                nextBtn.style.display = "inline-block";
                nextBtn.onclick = callback;
            }
        }, 50);
    }

    function nextLine() {
        nextBtn.style.display = "none";
        currentLine++;
        if (currentLine < lines.length) {
            typeLine(lines[currentLine], nextLine);
        } else {
            lineEl.textContent = "Let's begin...";
            nextBtn.textContent = "I'm Ready!!";
            nextBtn.style.display = "inline-block";
            nextBtn.onclick = () => startGameOne();
        }
    }

    typeLine(lines[currentLine], nextLine);
  createSkipButton(() => startGameOne()); // 💥 adds skip
}


function startGameOne() {
  // Replace the scene with the game layout
  storyScene.innerHTML = `
    <div id="game-one" style="position:relative; width:100vw; height:100vh; overflow:hidden; background: radial-gradient(circle at center, #1a2a3a, #0d1a26);">
      
      <!-- Instruction text -->
      <p id="instruction-text" style="
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        color:white;
        font-size:26px;
        text-align:center;
        font-weight:500;
        opacity:0.9;
      ">
        
      </p>

      <!-- Hit count -->
      <p id="hit-count" style="
        position:absolute;
        top:20px;
        left:50%;
        transform:translateX(-50%);
        font-size:20px;
        color:white;
        text-shadow:0 0 10px rgba(255,255,255,0.4);
      ">
        Hits: 0
      </p>

      <!-- Moving image -->
      <img src="assets/images/Parth.png" id="target" style="
        position:absolute;
        width:150px;
        border-radius:12px;
        cursor:pointer;
        transition:left 0.6s linear, top 0.6s linear;
        box-shadow:0 0 15px rgba(255,255,255,0.2);
      ">
    </div>
  `;

  // Add the floating will orb
  const orb = document.createElement("div");
  orb.id = "will-orb-game";
  orb.style.position = "absolute";
  orb.style.width = "40px";
  orb.style.height = "40px";
  orb.style.borderRadius = "50%";
  orb.style.background = "radial-gradient(circle, #fff 0%, #ff4f5a 80%)";
  orb.style.boxShadow = "0 0 25px rgba(255,79,90,0.6)";
  orb.style.left = "10%";
  orb.style.top = "10%";
  orb.style.animation = "float 4s ease-in-out infinite";
  storyScene.querySelector("#game-one").appendChild(orb);

  // Add orb dialogue container
  const orbDialogueContainer = document.createElement("div");
  orbDialogueContainer.id = "orb-dialogue-container";
  orbDialogueContainer.style.position = "absolute";
  orbDialogueContainer.style.left = "12%";
  orbDialogueContainer.style.top = "5%";
  orbDialogueContainer.style.width = "220px";
  orbDialogueContainer.style.display = "flex";
  orbDialogueContainer.style.flexDirection = "column";
  orbDialogueContainer.style.pointerEvents = "none";
  storyScene.querySelector("#game-one").appendChild(orbDialogueContainer);

  // Orb dialogue typing effect
  function typeOrbLine(text) {
    const lineEl = document.createElement("p");
    lineEl.textContent = "";
    lineEl.style.color = "white";
    lineEl.style.fontSize = "16px";
    lineEl.style.margin = "4px 0";
    lineEl.style.opacity = "1";
    orbDialogueContainer.appendChild(lineEl);

    let i = 0;
    const type = setInterval(() => {
      lineEl.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(type);
        // Fade older lines
        const allLines = orbDialogueContainer.querySelectorAll("p");
        allLines.forEach((p, idx) => {
          if (idx < allLines.length - 1) {
            p.style.transition = "all 1s ease";
            p.style.opacity = "0.5";
            p.style.transform = "translateY(8px)";
          }
        });
      }
    }, 40);
  }

  // Initial orb chatter
  const orbLines = [
    "What's this?!",
    "Why am I running away?!",
    "Maybe u should tap me...",
    "Try and click on me to make me stop :)"
  ];

  let orbIndex = 0;
  function showOrbLine() {
    if (orbIndex >= orbLines.length) return;
    typeOrbLine(orbLines[orbIndex]);
    orbIndex++;
    setTimeout(showOrbLine, 2000);
  }
  showOrbLine();

  // --- Game logic ---
  createSkipButton(() => startCaughtDialogue());

// Add the emoji below the orb
const emoji = document.createElement("div");
emoji.id = "target-emoji";
emoji.style.position = "absolute";
emoji.style.fontSize = "32px"; // size of emoji
emoji.style.left = "10%";       // same as orb
emoji.style.top = "15%";        // slightly below orb
emoji.style.pointerEvents = "none"; // doesn't block clicks
storyScene.querySelector("#game-one").appendChild(emoji);

// Example: two emotions
const emotions = ["😓", "😮"];// first and second emotion
let currentEmotion = 0;

// Function to switch emoji emotion
function switchEmoji() {
  emoji.textContent = emotions[currentEmotion];
  currentEmotion = (currentEmotion + 1) % emotions.length;
}

// Start with first emotion
switchEmoji();
  const target = document.getElementById("target");
  const hitCountDisplay = document.getElementById("hit-count");

  let hits = 0;
  let speed = 2;
  let moving = true;

  target.style.left = "50%";
  target.style.top = "50%";

  function moveTargetSmoothly() {
    if (!moving) return;
    const maxX = window.innerWidth - target.offsetWidth;
    const maxY = window.innerHeight - target.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.transition = `left ${speed}s linear, top ${speed}s linear`;
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    setTimeout(moveTargetSmoothly, speed * 1000);
  }

  moveTargetSmoothly();

  target.addEventListener("click", () => {
    hits++;
    hitCountDisplay.textContent = `Hits: ${hits}`;

    // Flash
    target.style.filter = "brightness(2)";
    setTimeout(() => (target.style.filter = "brightness(1)"), 150);

    // Slows down gradually
    speed += 0.3;

    // Orb special line at hit 3
    if (hits === 3) {
      typeOrbLine("Look! I'm slowing down!! 😲");
      switchEmoji();
    }

    // Stop + transition
    if (speed > 4.5) {
      moving = false;
      hitCountDisplay.textContent = "You caught Parth! ❤️";
      target.style.transform = "scale(1.2)";
      const instructionText = document.getElementById("instruction-text");
      instructionText.textContent = "He’s stopped... finally ❤️";

      setTimeout(() => {
        startCaughtDialogue();
      }, 2000);
    }
  });
}



function startCaughtDialogue() {
  const gameOne = document.getElementById("game-one");

  // Fade out the game visuals
  gameOne.classList.add("fade-out");

  setTimeout(() => {
    gameOne.innerHTML = `
      <div id="caught-scene" style="color:white; text-align:center; padding-top:20vh;">
        <img src="assets/images/Parth.png" style="width:180px; border-radius:12px; margin-bottom:20px;">
        <p id="dialogue-line" style="font-size:24px;"></p>
        <button id="next-dialogue" style="
          margin-top:20px;
          background:#ffb3c6;
          border:none;
          padding:10px 20px;
          border-radius:8px;
          cursor:pointer;
          font-size:18px;
          font-weight:500;
          color:#1a1a1a;
        ">Next ➜</button>
      </div>
    `;

    gameOne.classList.remove("fade-out");
    gameOne.classList.add("fade-in");

    createSkipButton(() => startPreGameTwoDialogue()); // 💥 adds skip

    const dialogueLine = document.getElementById("dialogue-line");
    const nextBtn = document.getElementById("next-dialogue");

    const lines = [
      "Ok... you caught me...",
      "Ik, u must be wondering... Why the hell was I running?!?!",
      "Well, it's because I wanted you to realise something..",
      "And it's that... Ik sometimes it may seem like I'm trying to run away or avoid you",
      "But, I want u to know that no matter how much it may seem that way",
      "I'll never leave ur screen",
      "And I'll always listen to you if u call for me"
    ];

    let i = 0;

    function showLine() {
      dialogueLine.textContent = "";
      let char = 0;
      const type = setInterval(() => {
        dialogueLine.textContent += lines[i][char];
        char++;
        if (char >= lines[i].length) {
          clearInterval(type);
          nextBtn.style.display = "inline-block";
        }
      }, 40);
    }

    nextBtn.onclick = () => {
      i++;
      nextBtn.style.display = "none";
      if (i < lines.length) showLine();
      else {
        dialogueLine.textContent = ":)";

        // ✅ Start Game 2 automatically after dialogue ends
        setTimeout(() => {
          startPreGameTwoDialogue()
        }, 1000);
      }
    };

    showLine();
  }, 1000);
}

function startPreGameTwoDialogue() {
  const storyScene = document.getElementById("story-scene");

  storyScene.innerHTML = `
    <div id="pregame2-dialogue" style="color:#2a1a1f; text-align:center; padding-top:20vh;">
    <img src="assets/images/Parth.png" style="width:180px; border-radius:12px; margin-bottom:20px;">
    <p id="dialogue-line2" style="font-size:24px;"></p>
    <button id="next-dialogue2" style="
      margin-top:20px;
      background:#ffb3c6;
      border:none;
      padding:10px 20px;
      border-radius:8px;
      cursor:pointer;
      font-size:18px;
      font-weight:500;
      color:#1a1a1a;
    ">Next ➜</button>
  </div>
  `;

  createSkipButton(() => startGameTwo()); // 💥 optional skip

  const dialogueLine = document.getElementById("dialogue-line2");
  const nextBtn = document.getElementById("next-dialogue2");

  const lines = [
    "Uk, I'm still pretty ashamed of myself...",
    "I wish I could've been better for you...",
    "I hope you don't mistake my genuine affection for you... :)"
  ];

  let i = 0;

  function typeLine() {
    dialogueLine.textContent = "";
    let char = 0;
    const type = setInterval(() => {
      dialogueLine.textContent += lines[i][char];
      char++;
      if (char >= lines[i].length) {
        clearInterval(type);
        nextBtn.style.display = "inline-block";
      }
    }, 40);
  }

  nextBtn.onclick = () => {
    i++;
    nextBtn.style.display = "none";
    if (i < lines.length) {
      typeLine();
    } else {
      // transition to game 2
      storyScene.classList.add("fade-out");
      setTimeout(() => {
        startGameTwo();
      }, 1000);
    }
  };

  typeLine();
}

function startGameTwo() {
  const storyScene = document.getElementById("story-scene");
  const gameTwo = document.getElementById("game-two");
  const parth = document.getElementById("drowning-parth");
  const loveBtn = document.getElementById("love-btn");
  const status = document.getElementById("love-status");

  createSkipButton(() => startFinalTask());  // 💥 adds skip

  storyScene.style.display = "none";
  gameTwo.style.display = "flex";

  let depth = 0; // how deep he is
  let isSaved = false;

  function sink() {
    if (!isSaved) {
      depth += 1;
      if (depth >= 100) {
        // He drowns
        parth.style.transform = "translateY(300px)";
        status.textContent = "He drowned in guilt 💔";
        loveBtn.disabled = true;
        clearInterval(sinkInterval);
      } else {
        parth.style.transform = `translateY(${depth * 3}px)`;
      }
    }
  }

  const sinkInterval = setInterval(sink, 200);

  loveBtn.addEventListener("click", () => {
    if (depth > 0) depth -= 4; // lift him up
    parth.style.transform = `translateY(${depth * 3}px)`;

    if (depth <= 0) {
      depth = 0;
      status.textContent = "You’re saving him ❤️ Keep going! \nHe's definitely gonna want a lot of it :D";
    }

    // If she keeps him afloat long enough
    if (!isSaved && depth < 20) {
      savedTime += 1;
      if (savedTime > 30) { // about 12 seconds of effort
        isSaved = true;
        clearInterval(sinkInterval);
        status.textContent = "You saved him ❤️";
        parth.style.transform = "translateY(-100px)";
        loveBtn.style.display = "none";

        setTimeout(() => {
          startPostSaveScene();
        }, 2000);
      }
    }
  });

  let savedTime = 0;
}

function startPostSaveScene() {
  const gameTwo = document.getElementById("game-two");
  const storyScene = document.getElementById("story-scene");

  // Fade out gameTwo
  gameTwo.classList.add("fade-out");

  setTimeout(() => {
    gameTwo.style.display = "none";

    // ✅ Make sure storyScene is visible and on top
    storyScene.style.display = "flex";
    storyScene.style.flexDirection = "column";
    storyScene.style.alignItems = "center";
    storyScene.style.justifyContent = "center";
    storyScene.style.zIndex = "10";
    storyScene.style.position = "relative";

    // ✅ Set contrasting color for readability
    storyScene.innerHTML = `
      <div class="scene-one fade-in" style="text-align:center; color:white; padding-top:20vh;">
        <img src="assets/images/Parth.png" alt="You" style="width:180px; border-radius:12px; margin-bottom:20px;">
        <p id="line" style="font-size:24px; color:white;">
          You didn’t let me drown...<br>
          Ig now there is just one last thing left to do :)
        </p>
        <button id="next-btn" style="
          margin-top:20px;
          background:#ff4f5a;
          border:none;
          padding:10px 20px;
          border-radius:8px;
          cursor:pointer;
          color:white;
          font-size:18px;
        ">Continue ❤️ </button>
      </div>
    `;

    // ✅ Attach click handler AFTER the content is in the DOM
    const nextBtn = document.getElementById("next-btn");
    nextBtn.addEventListener("click", () => {
      storyScene.style.display = "none";
      startFinalTask();
    });

  }, 1000); // Small fade delay, not too long
}

function startFinalTask() {
  // 1. Hide all other containers
  document.getElementById("lock-screen").style.display = "none";
  document.getElementById("story-scene").style.display = "none";
  document.getElementById("game-one").style.display = "none";
  document.getElementById("game-two").style.display = "none";

  // 2. Show the final task container
  const finalTask = document.getElementById("final-task");
  finalTask.style.display = "block";

  // 3. Add skip button if you want
  createSkipButton(() => alert("End of Demo 💫")); // optional

  // 4. Attach button event
  const renameBtn = document.getElementById("rename-btn");
  const contactNumber = document.getElementById("contact-number");
  const msg = document.getElementById("nickname-msg");

  renameBtn.onclick = () => {
    const nickname = prompt("Enter your nickname:");
    if (nickname && nickname.trim() !== "") {
      contactNumber.textContent = nickname;
      msg.textContent = `Your number is now saved as "${nickname}"! 💖`;

      // Show Finish button once nickname is saved
      showFinishButton();
    } else {
      msg.textContent = "You didn't give a nickname 😅";
    }
  };
  setInterval(() => {
    const timeEl = document.getElementById("time");
    if (timeEl) {
      const now = new Date();
      const hrs = now.getHours().toString().padStart(2, "0");
      const mins = now.getMinutes().toString().padStart(2, "0");
      timeEl.textContent = `${hrs}:${mins}`;
    }
  }, 1000);
  // ✅ Adds a finish button once user saves nickname
function showFinishButton() {
  if (document.getElementById("finish-btn")) return; // prevent duplicates

  const finalTask = document.getElementById("final-task");
  const finishBtn = document.createElement("button");
  finishBtn.id = "finish-btn";
  finishBtn.textContent = "Finally 💫";
  finishBtn.style.marginTop = "30px";
  finishBtn.style.padding = "10px 20px";
  finishBtn.style.fontSize = "18px";
  finishBtn.style.border = "none";
  finishBtn.style.borderRadius = "10px";
  finishBtn.style.background = "#ff4f5a";
  finishBtn.style.color = "white";
  finishBtn.style.cursor = "pointer";
  finishBtn.style.transition = "background 0.3s ease";

  finishBtn.onmouseenter = () => finishBtn.style.background = "#ff6b75";
  finishBtn.onmouseleave = () => finishBtn.style.background = "#ff4f5a";

  finishBtn.onclick = showCompletionDialogue;

  finalTask.appendChild(finishBtn);
}

// ✅ Final completion popup
function showCompletionDialogue() {
  const finalTask = document.getElementById("final-task");
  finalTask.innerHTML = `
  <div style="color:#333; text-align:center; padding-top:20vh; max-width:600px; margin:0 auto; line-height:1.6; font-family:'Poppins', sans-serif;">
    <h2 style="font-size:32px; margin-bottom:20px; color:#5a1f2d;">My Love.. 💖</h2>
    <p style="font-size:20px; margin-top:15px; color:#3d1f2a; text-shadow:0 0 5px rgba(255,255,255,0.2);">
      You’ve officially saved your name in my heart (and my phone) 💌<br><br>
      Thank you for being part of my life...<br>
      I've also created a private site dedicated just for the two of us :)
    </p>
    <button id="redirect-btn" style="
      margin-top:30px;
      background:#ff4f5a;
      color:white;
      border:none;
      border-radius:10px;
      padding:14px 28px;
      font-size:18px;
      cursor:pointer;
      font-weight:600;
      box-shadow:0 4px 15px rgba(255,79,90,0.4);
      transition:0.3s;
    " onmouseover="this.style.background='#ff6b75'" onmouseout="this.style.background='#ff4f5a'">
      Go to our little love site ➜
    </button>

    <!-- Side-by-side images with heart emoji at the bottom -->
    <div style="display:flex; justify-content:center; align-items:center; gap:20px; position:absolute; bottom:20px; left:50%; transform:translateX(-50%);">
      <img src="assets/images/Piku.png" alt="Her" style="width:120px; border-radius:12px; box-shadow:0 0 15px rgba(0,0,0,0.3);">
      <span style="font-size:50px;">💓</span>
      <img src="assets/images/Parth.png" alt="You" style="width:120px; border-radius:12px; box-shadow:0 0 15px rgba(0,0,0,0.3);">
    </div>

  </div>
`;

  const redirectBtn = document.getElementById("redirect-btn");
  redirectBtn.onclick = () => {
    // 🌐 Change this link to your next site
    window.location.href = "https://your-next-project-link.com";
  };
}
}


/*
// 🚀 DEV SHORTCUT: Skip directly to Game 2
window.addEventListener("load", () => {
  // Hide everything else first
  const lockScreen = document.getElementById("lock-screen");
  const storyScene = document.getElementById("story-scene");
  if (lockScreen) lockScreen.style.display = "none";
  if (storyScene) storyScene.style.display = "none";

  // Then start Game 2 cleanly
  startGameTwo();
});
*/

function createSkipButton(nextFn) {
  const skipBtn = document.createElement("button");
  skipBtn.textContent = "⏭ Skip";
  skipBtn.style.position = "fixed";
  skipBtn.style.bottom = "20px";
  skipBtn.style.right = "20px";
  skipBtn.style.background = "rgba(255,255,255,0.1)";
  skipBtn.style.border = "1px solid rgba(255,255,255,0.3)";
  skipBtn.style.color = "white";
  skipBtn.style.padding = "8px 14px";
  skipBtn.style.borderRadius = "8px";
  skipBtn.style.cursor = "pointer";
  skipBtn.style.zIndex = "9999";
  skipBtn.style.backdropFilter = "blur(5px)";
  skipBtn.style.transition = "all 0.3s ease";

  skipBtn.onmouseenter = () => skipBtn.style.background = "rgba(255,255,255,0.2)";
  skipBtn.onmouseleave = () => skipBtn.style.background = "rgba(255,255,255,0.1)";

  skipBtn.onclick = () => {
    skipBtn.remove();
    nextFn(); // directly jump to the next scene
  };

  document.body.appendChild(skipBtn);
}