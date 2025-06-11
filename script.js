// Game State
let currentScene = 0;
let gameData = {
    playerName: "Binkle",
    choices: {},
    flags: {}
};

// Story Data
const scenes = [
    {
        id: 0,
        background: "manor",
        character: null,
        speaker: "???",
        text: "You stand before the weird, not entirely present Moonhaven Manor. The crumbly house looms against the stormy yellow sky, its windows dark and mad and hungry. You've been hired, as is tradition, to investigate the disappearance of the mansion's owner, Krunky Barmwood.",
        choices: [
            { text: "Knock on the front door", next: 1 },
            { text: "Look for another way in", next: 2 }
        ]
    },
    {
        id: 1,
        background: "manor",
        character: null,
        speaker: "???",
        text: "You knock firmly on the heavy wooden door. After a moment, you hear footsteps approaching from within. The door creaks open to reveal an elderly butler with kind but worried eyes.",
        auto: true,
        next: 3
    },
    {
        id: 2,
        background: "manor",
        character: null,
        speaker: "???",
        text: "You decide to explore the perimeter of the manor. Walking around the side, you discover a small window that's been left slightly ajar. Through it, you can see into what appears to be a library.",
        choices: [
            { text: "Climb through the window", next: 10 },
            { text: "Go back to the front door", next: 1 }
        ]
    },
    {
        id: 3,
        background: "manor",
        character: "butler",
        speaker: "Butler",
        text: "Good evening. I am Mutters, the resident butler of this winsome estate." He pauses. "You must be the investigator we've been expecting. Please, come in. The family is quite worried about Miss Krunky's disappearance.",
        auto: true,
        next: 4
    },
    {
        id: 4,
        background: "foyer",
        character: "butler",
        speaker: "Butler",
        text: "Miss Krunky was last seen three days ago in her study. She had been acting quite strange lately, always muttering about 'the family secret' and spending hours in the old library.",
        choices: [
            { text: "Ask about the family secret", next: 5 },
            { text: "Request to see her study", next: 6 },
            { text: "Ask to visit the library", next: 7 }
        ]
    },
    {
        id: 5,
        background: "foyer",
        character: "butler",
        speaker: "Butler",
        text: "I'm afraid I don't know much about it. Miss Krunky's family has owned this manor for over 200 years. There have always been... rumors. Strange occurrences. But Miss Krunky seemed to have discovered something specific recently.",
        auto: true,
        next: 8
    },
    {
        id: 6,
        background: "study",
        character: null,
        speaker: "???",
        text: "Henderson leads you to Krunky's study. The room is in disarray - books scattered on the floor, papers strewn across the desk, and a large painting on the wall has been moved, revealing a hidden safe behind it.",
        choices: [
            { text: "Examine the scattered papers", next: 11 },
            { text: "Investigate the hidden safe", next: 12 },
            { text: "Ask Henderson about the mess", next: 13 }
        ]
    },
    {
        id: 7,
        background: "library",
        character: null,
        speaker: "???",
        text: "The library is vast and filled with ancient tomes. One bookshelf appears to have been disturbed recently, with several books pulled out and left on a nearby reading table. Among them, you notice a leather-bound journal.",
        choices: [
            { text: "Read the journal", next: 14 },
            { text: "Examine the disturbed bookshelf", next: 15 },
            { text: "Look for more clues", next: 16 }
        ]
    },
    {
        id: 8,
        background: "foyer",
        character: "butler",
        speaker: "Butler",
        text: "Would you like me to show you to her study or the library? Both rooms might hold clues to her whereabouts.",
        choices: [
            { text: "Go to the study", next: 6 },
            { text: "Visit the library", next: 7 }
        ]
    },
    {
        id: 10,
        background: "library",
        character: null,
        speaker: "???",
        text: "You carefully climb through the window into the library. The room is dimly lit by moonlight streaming through tall windows. You notice the same disturbed bookshelf and journal that you would have found if you had entered normally.",
        auto: true,
        next: 7
    },
    {
        id: 11,
        background: "study",
        character: null,
        speaker: "???",
        text: "Among the scattered papers, you find Krunky's handwritten notes. They mention 'the midnight ritual' and 'the key beneath the portrait of great-grandfather Barmwood.' There's also a sketch of what appears to be a hidden chamber.",
        auto: true,
        next: 17
    },
    {
        id: 12,
        background: "study",
        character: null,
        speaker: "???",
        text: "The safe is open and empty. Whatever was inside has been taken. You notice scratch marks around the lock - it was opened recently, and perhaps hastily.",
        auto: true,
        next: 17
    },
    {
        id: 13,
        background: "study",
        character: "butler",
        speaker: "Butler",
        text: "I found the room like this the morning after Miss Krunky disappeared. Nothing seemed to be stolen, but she was clearly searching for something urgently.",
        auto: true,
        next: 17
    },
    {
        id: 14,
        background: "library",
        character: null,
        speaker: "???",
        text: "The journal contains Krunky's recent entries. The final entry reads: 'I've found it at last! The truth about the Barmwood curse. Tonight, I descend into the hidden chamber to break the cycle once and for all.'",
        auto: true,
        next: 18
    },
    {
        id: 15,
        background: "library",
        character: null,
        speaker: "???",
        text: "Behind the moved books, you discover a hidden lever. When pulled, it reveals a secret passage that leads downward into darkness. A cool breeze emanates from within.",
        auto: true,
        next: 18
    },
    {
        id: 16,
        background: "library",
        character: null,
        speaker: "???",
        text: "Searching the library more thoroughly, you find Krunky's green-tinted reading glasses on the floor near the bookshelf, and footprints leading toward the back wall.",
        auto: true,
        next: 18
    },
    {
        id: 17,
        background: "study",
        character: null,
        speaker: "???",
        text: "You've gathered important clues from the study. It's clear that Krunky discovered something significant about her family's history. Perhaps the library holds more answers.",
        choices: [
            { text: "Head to the library", next: 7 },
            { text: "Search the rest of the manor", next: 19 }
        ]
    },
    {
        id: 18,
        background: "library",
        character: null,
        speaker: "???",
        text: "All evidence points to Krunky having discovered a hidden chamber beneath the manor. The secret passage behind the bookshelf seems to be your next destination.",
        choices: [
            { text: "Enter the secret passage", next: 20 },
            { text: "Get Henderson's help first", next: 21 },
            { text: "Look for more equipment", next: 22 }
        ]
    },
    {
        id: 19,
        background: "manor",
        character: null,
        speaker: "???",
        text: "You search the other rooms but find nothing as significant as what you discovered in the study. Your investigation leads you back to the library, where the real answers seem to lie.",
        auto: true,
        next: 7
    },
    {
        id: 20,
        background: "chamber",
        character: null,
        speaker: "???",
        text: "You descend the narrow stone steps into an ancient chamber. Candles flicker mysteriously, as if lit recently. In the center of the room, you see Krunky kneeling before an ornate altar, very much alive but seemingly in a trance.",
        auto: true,
        next: 23
    },
    {
        id: 21,
        background: "library",
        character: "butler",
        speaker: "Butler",
        text: "I had no idea this passage existed! The Barmwood family has kept many secrets over the years. Please, be careful down there. I'll wait here in case you need assistance.",
        auto: true,
        next: 20
    },
    {
        id: 22,
        background: "library",
        character: null,
        speaker: "???",
        text: "You find a flashlight in a nearby drawer, though the passage seems to have its own mysterious illumination. You're as prepared as you can be.",
        auto: true,
        next: 20
    },
    {
        id: 23,
        background: "chamber",
        character: "Krunky",
        speaker: "Krunky",
        text: "You... you came. I knew someone would eventually follow the clues. I've been trapped here for three days, bound by an ancient ritual. The Barmwood curse is real, and I've been trying to break it.",
        choices: [
            { text: "How can I help you?", next: 24 },
            { text: "What is the Barmwood curse?", next: 25 },
            { text: "Let's get you out of here", next: 26 }
        ]
    },
    {
        id: 24,
        background: "chamber",
        character: "Krunky",
        speaker: "Krunky",
        text: "The ritual requires two people to complete - one to break the binding, another to seal the curse forever. But beware, failure means we'll both be trapped here.",
        auto: true,
        next: 27
    },
    {
        id: 25,
        background: "chamber",
        character: "Krunky",
        speaker: "Krunky",
        text: "For generations, the firstborn of each Barmwood generation has been drawn to this chamber on their 40th birthday, compelled by an ancient curse. Most never return. I'm determined to be the last.",
        auto: true,
        next: 27
    },
    {
        id: 26,
        background: "chamber",
        character: "Krunky",
        speaker: "Krunky",
        text: "I wish it were that simple. The curse binds me here until it's properly broken. But together, we might be able to end this once and for all.",
        auto: true,
        next: 27
    },
    {
        id: 27,
        background: "chamber",
        character: "Krunky",
        speaker: "Krunky",
        text: "There are two ancient stones on the altar. We must each touch one simultaneously while speaking the words carved into the wall. Are you ready to risk everything to break this curse?",
        choices: [
            { text: "Yes, let's break the curse together", next: 28 },
            { text: "This is too dangerous, let's find another way", next: 29 }
        ]
    },
    {
        id: 28,
        background: "chamber",
        character: null,
        speaker: "???",
        text: "You and Krunky touch the stones together and speak the ancient words. The chamber fills with blinding light, and you feel a tremendous weight lifting. When your vision clears, you're both standing free. The curse is broken, and the Barmwood family is finally at peace.",
        auto: true,
        next: 30
    },
    {
        id: 29,
        background: "chamber",
        character: "Krunky",
        speaker: "Krunky",
        text: "Perhaps you're right. But I fear I may be trapped here forever. However, knowing that someone else knows the truth brings me some comfort. Please, tell my story to the world.",
        auto: true,
        next: 31
    },
    {
        id: 30,
        background: "manor",
        character: "Krunky",
        speaker: "???",
        text: "You and Krunky emerge from the chamber as heroes. The investigation is complete, the mystery solved, and an ancient curse has been broken. The Barmwood family can finally live in peace. THE END - Good Ending",
        choices: [
            { text: "Play Again", next: 0 }
        ]
    },
    {
        id: 31,
        background: "manor",
        character: null,
        speaker: "???",
        text: "You leave the chamber, unable to save Krunky but carrying the weight of her story. The investigation is complete, but at a great cost. Some mysteries are better left unsolved. THE END - Bittersweet Ending",
        choices: [
            { text: "Play Again", next: 0 }
        ]
    }
];

// Background variations
const backgrounds = {
    manor: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"><rect width=\"1200\" height=\"800\" fill=\"%23001122\"/><rect x=\"300\" y=\"200\" width=\"600\" height=\"400\" fill=\"%23112233\" stroke=\"%23334455\" stroke-width=\"3\"/><rect x=\"450\" y=\"300\" width=\"100\" height=\"150\" fill=\"%23223344\"/><rect x=\"650\" y=\"320\" width=\"80\" height=\"120\" fill=\"%23445566\"/></svg>')",
    foyer: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"><rect width=\"1200\" height=\"800\" fill=\"%232a1810\"/><rect x=\"100\" y=\"600\" width=\"1000\" height=\"200\" fill=\"%238B4513\"/><rect x=\"500\" y=\"100\" width=\"200\" height=\"500\" fill=\"%23654321\"/></svg>')",
    study: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"><rect width=\"1200\" height=\"800\" fill=\"%231a0f0a\"/><rect x=\"50\" y=\"100\" width=\"150\" height=\"600\" fill=\"%238B4513\"/><rect x=\"250\" y=\"200\" width=\"200\" height=\"150\" fill=\"%23654321\"/></svg>')",
    library: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"><rect width=\"1200\" height=\"800\" fill=\"%230f0a05\"/><rect x=\"50\" y=\"50\" width=\"100\" height=\"700\" fill=\"%238B4513\"/><rect x=\"200\" y=\"50\" width=\"100\" height=\"700\" fill=\"%238B4513\"/><rect x=\"350\" y=\"50\" width=\"100\" height=\"700\" fill=\"%238B4513\"/></svg>')",
    chamber: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"><rect width=\"1200\" height=\"800\" fill=\"%23000000\"/><circle cx=\"600\" cy=\"400\" r=\"50\" fill=\"%23444444\"/><rect x=\"580\" y=\"350\" width=\"40\" height=\"100\" fill=\"%23333333\"/></svg>')"
};

// Game Functions
function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('dialogue-box').style.display = 'block';
    currentScene = 0;
    displayScene(scenes[currentScene]);
}

function displayScene(scene) {
    // Update background
    if (scene.background && backgrounds[scene.background]) {
        document.getElementById('background').style.background = backgrounds[scene.background];
        document.getElementById('background').style.backgroundSize = 'cover';
        document.getElementById('background').style.backgroundPosition = 'center';
    }
    
    // Update character (placeholder for now)
    const characterImg = document.getElementById('character');
    if (scene.character) {
        characterImg.style.display = 'block';
        // For now, we'll just show different colored rectangles as placeholders
        characterImg.style.display = 'none'; // Hide until we add actual character images
    } else {
        characterImg.style.display = 'none';
    }
    
    // Update dialogue
    document.getElementById('speaker-name').textContent = scene.speaker;
    document.getElementById('dialogue-text').textContent = scene.text;
    
    // Handle choices or auto-advance
    const choicesContainer = document.getElementById('choices-container');
    const continueButton = document.getElementById('continue-button');
    
    if (scene.choices && scene.choices.length > 0) {
        // Show choices
        choicesContainer.style.display = 'block';
        continueButton.style.display = 'none';
        
        const choicesDiv = document.getElementById('choices');
        choicesDiv.innerHTML = '';
        
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.onclick = () => makeChoice(choice.next);
            choicesDiv.appendChild(button);
        });
    } else if (scene.auto) {
        // Auto-advance scene
        choicesContainer.style.display = 'none';
        continueButton.style.display = 'block';
        continueButton.onclick = () => {
            currentScene = scene.next;
            displayScene(scenes[currentScene]);
        };
    } else {
        // Manual advance
        choicesContainer.style.display = 'none';
        continueButton.style.display = 'block';
    }
}

function makeChoice(nextSceneId) {
    currentScene = nextSceneId;
    if (nextSceneId === 0) {
        // Restart game
        document.getElementById('title-screen').style.display = 'flex';
        document.getElementById('dialogue-box').style.display = 'none';
        return;
    }
    displayScene(scenes[currentScene]);
}

function nextDialogue() {
    // This function is called when continue button is clicked
    // In scenes with auto: true, the onclick is already set
    // For regular scenes, we can add logic here if needed
}

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    // Game starts with title screen visible
    document.getElementById('dialogue-box').style.display = 'none';
});

