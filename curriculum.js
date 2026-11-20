/* CodeKids Academy — curriculum data (shared by the web app and future iOS/Android apps).
   Standards: CSTA K-12 Computer Science Standards (2017), csteachers.org — codes with short paraphrased descriptions.
   Milestone ids are permanent: progress is stored against them. Never reuse or renumber an id. */

const LEVELS = {
  1: { name:'Explorer', e:'🧭', desc:'Try it with help — first contact with the idea' },
  2: { name:'Builder',  e:'🔧', desc:'Do it independently — build and debug on their own' },
  3: { name:'Creator',  e:'🚀', desc:'Make something original, test it with others, explain it' },
};

const STANDARD_LEVELS = { '1A':'K–2 (ages 5–7)', '1B':'Grades 3–5 (ages 8–11)', '2':'Grades 6–8 (ages 11–14)', '3A':'Grades 9–10 (ages 14–16)', '3B':'Grades 11–12 (ages 16–18)' };
const STANDARDS = {
  "1A-CS-01": "Choose and use the right app or tool for a task",
  "1A-AP-08": "Create and follow step-by-step algorithms for everyday tasks",
  "1A-AP-10": "Build programs with sequences and simple loops",
  "1A-AP-11": "Break a problem into a precise sequence of steps",
  "1A-AP-12": "Plan a program's events, goal and expected result",
  "1A-AP-14": "Find and fix bugs in sequences and simple loops",
  "1A-AP-15": "Explain the steps and choices made while building",
  "1B-AP-09": "Create programs that use variables to store and change data",
  "1B-AP-10": "Create programs with sequences, events, loops and conditionals",
  "1B-AP-11": "Break problems into smaller sub-problems",
  "1B-AP-12": "Remix existing programs to make something new",
  "1B-AP-13": "Plan iteratively, including other people's perspectives",
  "1B-AP-14": "Respect ownership and credit others when remixing",
  "1B-AP-15": "Test and debug a program so it works as intended",
  "2-AP-10": "Use flowcharts or pseudocode to plan complex algorithms",
  "2-AP-11": "Use clearly named variables of different data types",
  "2-AP-12": "Combine control structures, incl. nested loops and compound conditions",
  "2-AP-13": "Decompose problems to design, build and review programs",
  "2-AP-14": "Write procedures (functions) with parameters for reuse",
  "2-AP-15": "Use feedback from users to improve a solution",
  "2-AP-16": "Use existing code, media and libraries with attribution",
  "2-AP-17": "Test programs systematically with a range of test cases",
  "2-AP-19": "Document programs so they are easy to follow and debug",
  "2-DA-08": "Collect data with tools and transform it to be more useful",
  "2-IC-21": "Discuss bias and accessibility in technology design",
  "3A-AP-13": "Build prototypes that use algorithms, based on personal interests",
  "3A-AP-14": "Use lists to generalise solutions",
  "3A-AP-16": "Iteratively build event-driven artifacts for a real purpose",
  "3A-AP-17": "Decompose problems using procedures, modules or objects",
  "3A-AP-18": "Build artifacts that combine data and procedures",
  "3A-AP-21": "Evaluate and improve usability and accessibility",
  "3A-AP-23": "Document design decisions for complex programs",
  "3A-DA-10": "Weigh trade-offs in how and where data is stored",
  "3A-IC-25": "Test and refine artifacts to reduce bias",
  "3A-NI-06": "Recommend security measures for real scenarios",
  "3B-AP-08": "Describe how AI drives software and physical systems",
  "3B-AP-09": "Implement an AI algorithm to solve a problem",
  "3B-AP-16": "Reuse code through libraries and APIs",
  "3B-AP-17": "Build for real audiences using a software life-cycle",
  "3B-AP-18": "Explain security issues that can compromise programs",
  "3B-AP-20": "Use version control, IDEs and collaborative practices",
  "3B-AP-21": "Write test cases to verify a program meets its design",
  "3B-AP-23": "Evaluate a program through code review",
  "3B-DA-05": "Use data analysis tools to find patterns in complex data",
  "3B-DA-07": "Evaluate how well models and simulations support hypotheses"
};

/* ── DATA: STAGES ─────────────────────────────────────────────── */
const STAGES = [
  { id:0, emoji:'🌱', name:'Unplugged Logic', age:'5–6', color:'#7c6fff',
    desc:'Build sequencing, loops and conditions through play — no screen needed.',
    resources:[
      { e:'📗', n:'Hello Ruby', u:'https://www.helloruby.com', s:'Adventure stories that teach coding concepts beautifully.' },
      { e:'🐢', n:'Robot Turtles Board Game', u:'https://www.thinkfun.com', s:'Youngest programmers\' game. Ages 4+.' },
      { e:'🤖', n:'Botley the Coding Robot', u:'https://learningresources.com/botley', s:'Screen-free programmable robot. Ages 5+.' },
      { e:'🐭', n:'Code & Go Robot Mouse', u:'https://learningresources.com', s:'Physical robot navigates a maze — sequences & debugging.' },
    ],
    activities:[
      'Robot Game — give exact instructions; parent acts as robot',
      'Floor Grid Maze — use tape + direction cards',
      'PB&J Algorithm — program a parent to make a sandwich',
      'Algorithm Art — write instructions to draw a picture',
    ],
    milestones:[
      { id:"m0-0", lvl:1, t:"Played the Robot Game: gave a grown-up 5+ exact steps to reach a target", std:["1A-AP-08"] },
      { id:"m0-5", lvl:1, t:"Can explain what a \"sequence\" is and why the order of steps matters", std:["1A-AP-15"] },
      { id:"m0-1", lvl:2, t:"Built a floor-grid maze with tape and solved it using arrow cards", std:["1A-AP-10", "1A-AP-11"] },
      { id:"m0-2", lvl:2, t:"Found and fixed a bug in an arrow-card program (their own or someone else's)", std:["1A-AP-14"] },
      { id:"m0-4", lvl:3, t:"Used a \"repeat\" card to make a program shorter, and explained why it works", std:["1A-AP-10", "1A-AP-15"] },
      { id:"m0-3", lvl:3, t:"Wrote a full algorithm (e.g. making a sandwich) that a grown-up followed exactly", std:["1A-AP-08", "1A-AP-12"] },
    ],
    projects:[
      {
        "id": "p0-1",
        "lvl": 1,
        "e": "🤖",
        "title": "Robot Chef",
        "mins": "15–20 min",
        "tool": "Unplugged — paper & a snack",
        "brief": "Your child programs a grown-up \"robot\" to make a simple snack. The robot does EXACTLY what it's told — no more, no less.",
        "steps": [
          "Pick a simple snack (e.g. crackers with cheese) and lay out the items.",
          "Your child says or draws each step on a sticky note.",
          "The robot follows each note literally (\"pick up knife\" — but which hand?).",
          "When something goes wrong, stop: that's a bug! Your child rewrites that step.",
          "Run the whole program again from the start."
        ],
        "done": [
          "The robot finishes the snack using only the written steps",
          "Your child can point to one bug they fixed and say why it happened"
        ],
        "stretch": "Swap roles: your child is the robot and must follow YOUR (deliberately buggy) program.",
        "std": [
          "1A-AP-08",
          "1A-AP-14"
        ]
      },
      {
        "id": "p0-2",
        "lvl": 2,
        "e": "🗺️",
        "title": "Floor Maze Adventure",
        "mins": "30 min",
        "tool": "Unplugged — masking tape, paper arrows",
        "brief": "Make a 4×4 grid on the floor. A toy must reach the treasure using arrow cards, avoiding obstacles.",
        "steps": [
          "Tape a 4×4 grid and mark START and TREASURE.",
          "Add 2–3 obstacles (books, cushions).",
          "Your child lays out arrow cards (↑ ← → ) before moving the toy.",
          "Run the program: move the toy one card at a time.",
          "If it bumps an obstacle, debug and run again."
        ],
        "done": [
          "3 different mazes solved with the first full run",
          "Your child plans ALL cards before moving the toy"
        ],
        "stretch": "Introduce a \"repeat 3×\" card and solve a maze with the fewest cards.",
        "std": [
          "1A-AP-10",
          "1A-AP-11"
        ]
      },
      {
        "id": "p0-3",
        "lvl": 3,
        "e": "🏴‍☠️",
        "title": "Treasure Hunt Code",
        "mins": "45 min",
        "tool": "Unplugged — paper, crayons",
        "brief": "Your child designs a treasure hunt around the home, written as a coded program, for someone else to follow.",
        "steps": [
          "Hide a small treasure.",
          "Plan the route on paper: draw the start, the treasure and the path.",
          "Write the code with arrows, step counts and at least one repeat (e.g. \"repeat 3: step forward\").",
          "Give the code to a family member to run — no hints allowed!",
          "Ask the player what was confusing and improve the code."
        ],
        "done": [
          "Someone else finds the treasure using only the code",
          "The code uses at least one repeat",
          "Your child explains their plan and one change they made"
        ],
        "stretch": "Add an IF rule: \"if you see a door, turn left\".",
        "std": [
          "1A-AP-12",
          "1A-AP-15"
        ]
      }
    ],
  },
  { id:1, emoji:'🎮', name:'Block Coding', age:'6–7', color:'#00d4aa',
    desc:'Drag-and-drop visual programming. No typing needed. Concepts snap together like LEGO.',
    resources:[
      { e:'🐱', n:'ScratchJr (iPad/Android)', u:'https://scratchjr.org', s:'Official MIT app for ages 5–7. Perfect first coding tool. FREE.' },
      { e:'💡', n:'Lightbot', u:'https://lightbot.com', s:'Guide a robot with command blocks. Sequences, loops & procedures.' },
      { e:'❄️', n:'Code.org — Frozen (Anna & Elsa)', u:'https://code.org/hourofcode/frozen', s:'Draw snowflakes with loops. No account needed. FREE.' },
      { e:'🎵', n:'Code.org — Dance Party', u:'https://hourofcode.com/dance', s:'Code characters to dance to music. Kids love it! FREE.' },
    ],
    activities:[
      'Code.org Course A — full pre-reader curriculum',
      'ScratchJr — animate a character with 3+ actions',
      'Lightbot — complete levels 1 through 5',
      'Make an animated birthday card',
    ],
    milestones:[
      { id:"m1-0", lvl:1, t:"Opened ScratchJr (or similar) on their own and made a character move", std:["1A-CS-01", "1A-AP-10"] },
      { id:"m1-5", lvl:1, t:"Can explain what a loop does in their own words", std:["1A-AP-15"] },
      { id:"m1-3", lvl:2, t:"Solved 5+ Lightbot or Code.org puzzles, including one that needs a loop", std:["1A-AP-10", "1A-AP-14"] },
      { id:"m1-1", lvl:2, t:"Completed Code.org Course A (or the first 8 lessons of Course B)", std:["1A-AP-10", "1A-AP-11"] },
      { id:"m1-2", lvl:3, t:"Made a scene where 2 characters each do 3+ actions, started by different triggers", std:["1A-AP-10", "1A-AP-12"] },
      { id:"m1-4", lvl:3, t:"Planned on paper, built, then presented an animated card and explained how it works", std:["1A-AP-12", "1A-AP-15"] },
    ],
    projects:[
      {
        "id": "p1-1",
        "lvl": 1,
        "e": "🐱",
        "title": "Hello, Cat!",
        "mins": "20 min",
        "tool": "ScratchJr",
        "brief": "Make a character walk across the screen, jump and say hello when the green flag is tapped.",
        "steps": [
          "Open ScratchJr and start a new project.",
          "Drag a green-flag block to start.",
          "Add move-right blocks, a hop block and a speech bubble saying \"Hello!\".",
          "Tap the green flag to test.",
          "Change the background to a place your child likes."
        ],
        "done": [
          "The program starts with the green flag",
          "It uses at least 3 different blocks in a sequence"
        ],
        "stretch": "Add a second character that answers back.",
        "std": [
          "1A-AP-10",
          "1A-CS-01"
        ]
      },
      {
        "id": "p1-2",
        "lvl": 2,
        "e": "❄️",
        "title": "Snowflake Loops",
        "mins": "30 min",
        "tool": "Code.org Artist or Frozen tutorial",
        "brief": "Draw shapes and snowflakes with code — then discover how a loop makes it much shorter.",
        "steps": [
          "Open the Code.org Frozen / Artist tutorial.",
          "Draw a square using four separate move + turn blocks.",
          "Now draw the same square using a repeat block.",
          "Put the square inside another repeat (turning a little each time) to make a snowflake.",
          "If the shape looks wrong, count the turns and debug."
        ],
        "done": [
          "A snowflake drawn using a repeat block",
          "Your child explains why the repeat version is shorter"
        ],
        "stretch": "Make a snowflake with a different number of arms by changing two numbers.",
        "std": [
          "1A-AP-10",
          "1A-AP-14"
        ]
      },
      {
        "id": "p1-3",
        "lvl": 3,
        "e": "🎂",
        "title": "Animated Birthday Card",
        "mins": "45–60 min",
        "tool": "ScratchJr",
        "brief": "Plan, build and present an animated card for a real person's birthday (or another celebration).",
        "steps": [
          "Draw a 3-box plan on paper: what happens first, next, and at the end.",
          "Build scene 1 with 2 characters and a greeting.",
          "Add a tap trigger so something surprising happens when you touch a character.",
          "Record your child's voice singing or saying a message.",
          "Present the card to the person and explain how it works."
        ],
        "done": [
          "Plays from start to finish without help",
          "Uses 2+ characters and 2 different triggers",
          "Your child explains their plan and one bug they fixed"
        ],
        "stretch": "Add a second page (scene) that plays automatically.",
        "std": [
          "1A-AP-12",
          "1A-AP-15",
          "1A-AP-10"
        ]
      }
    ],
  },
  { id:2, emoji:'🐱', name:'Visual Programming', age:'7–9', color:'#48dbfb',
    desc:'Graduate to full Scratch. Build real games, animations and stories with variables and functions.',
    resources:[
      { e:'🐱', n:'Scratch 3.0', u:'https://scratch.mit.edu', s:'World\'s most popular kids programming language. 100M+ projects. FREE.' },
      { e:'🧱', n:'LEGO Boost', u:'https://lego.com/boost', s:'Build LEGO and code it with Scratch-like blocks. Ages 7+.' },
      { e:'💎', n:'micro:bit', u:'https://microbit.org', s:'$15 programmable circuit board. Thousands of beginner projects.' },
      { e:'📺', n:'Griffpatch on YouTube', u:'https://youtube.com/@griffpatch', s:'World\'s most popular Scratch creator. Amazing tutorials. FREE.' },
    ],
    activities:[
      'Scratch — build a game with score counter & lives',
      'Code.org Course B or C',
      'LEGO Boost or micro:bit hardware project',
      'Create an interactive story with choices',
    ],
    milestones:[
      { id:"m2-1", lvl:1, t:"Completed Code.org Course C or D", std:["1B-AP-10"] },
      { id:"m2-3", lvl:1, t:"Used a variable (score, lives or timer) in a Scratch project", std:["1B-AP-09"] },
      { id:"m2-0", lvl:2, t:"Built a complete Scratch game with a score and a win/lose condition", std:["1B-AP-09", "1B-AP-10"] },
      { id:"m2-4", lvl:2, t:"Remixed a Scratch project, added a new feature and credited the original creator", std:["1B-AP-12", "1B-AP-14"] },
      { id:"m2-2", lvl:3, t:"Created an interactive story with 2+ choices that change the ending", std:["1B-AP-10", "1B-AP-11"] },
      { id:"m2-5", lvl:3, t:"Had 2 people play-test a project, then fixed 2 things based on their feedback", std:["1B-AP-13", "1B-AP-15"] },
    ],
    projects:[
      {
        "id": "p2-1",
        "lvl": 1,
        "e": "🍎",
        "title": "Catch the Apple",
        "mins": "45 min",
        "tool": "Scratch",
        "brief": "Apples fall from the sky; move the bowl with arrow keys to catch them. Each catch adds a point.",
        "steps": [
          "Add a bowl sprite that moves left and right with arrow keys.",
          "Add an apple that starts at a random x position at the top and falls.",
          "Create a variable called score; set it to 0 when the flag is clicked.",
          "If apple touches bowl: change score by 1 and send the apple back to the top.",
          "Test it, and fix anything that feels unfair."
        ],
        "done": [
          "Score goes up only when an apple is caught",
          "Apple restarts at a random position each time"
        ],
        "stretch": "Add a 30-second timer and a \"Game over\" message.",
        "std": [
          "1B-AP-09",
          "1B-AP-10"
        ]
      },
      {
        "id": "p2-2",
        "lvl": 2,
        "e": "📖",
        "title": "Choose-Your-Path Story",
        "mins": "60 min",
        "tool": "Scratch",
        "brief": "An interactive story where the reader's choices change what happens next.",
        "steps": [
          "Sketch the story map: a start, 2 choices, and at least 2 different endings.",
          "Create the opening scene and characters.",
          "Use ask-and-wait (or clickable buttons) for each choice.",
          "Use if/else and broadcast messages to switch scenes.",
          "Play every possible path to make sure none of them break."
        ],
        "done": [
          "At least 2 choices and 2 different endings",
          "Every path has been tested"
        ],
        "stretch": "Keep track of the reader's choices with a variable and show it at the end.",
        "std": [
          "1B-AP-10",
          "1B-AP-11"
        ]
      },
      {
        "id": "p2-3",
        "lvl": 3,
        "e": "🕹️",
        "title": "Arcade Game + Play Test",
        "mins": "2–3 sessions",
        "tool": "Scratch",
        "brief": "Design an original arcade game with lives, levels and a win/lose screen, then improve it with real player feedback.",
        "steps": [
          "Write a one-paragraph game idea and draw the main screen.",
          "Build the player, enemies and a lives variable.",
          "Add a second level that is harder (faster or more enemies).",
          "Add win and game-over screens. Credit any remixed art or sounds in the Notes.",
          "Ask 2 people to play. Write down what they said, fix 2 things, and keep a change log."
        ],
        "done": [
          "Has lives, 2 levels, and win + lose screens",
          "2 play-testers' feedback written down and 2 fixes made",
          "All borrowed assets are credited"
        ],
        "stretch": "Share it on Scratch (with a parent-approved account) and reply to one comment.",
        "std": [
          "1B-AP-13",
          "1B-AP-15",
          "1B-AP-14"
        ]
      }
    ],
  },
  { id:3, emoji:'🐍', name:'First Real Code', age:'9–11', color:'#ffd166',
    desc:'Transition from blocks to typing real Python code. Swift Playgrounds for Apple fans.',
    resources:[
      { e:'🐢', n:'Trinket.io Turtle Python', u:'https://trinket.io/turtle', s:'Draw with Python turtle in the browser instantly. FREE.' },
      { e:'📗', n:'Python for Kids (book)', u:'https://nostarch.com/pythonforkids', s:'Best-selling intro book by Jason Briggs. Ages 9–12.' },
      { e:'📱', n:'Swift Playgrounds (iPad)', u:'https://apple.com/swift/playgrounds', s:'Apple\'s own learn-to-code app. Gorgeous, game-like, zero setup. FREE.' },
      { e:'🔧', n:'CheckiO — Python Puzzles', u:'https://py.checkio.org', s:'Python puzzle island. Solve challenges to advance on a map. FREE.' },
    ],
    activities:[
      'Trinket.io — first Python turtle drawings',
      'Swift Playgrounds — Learn to Code 1 & 2',
      'CodingBat — 10 Python exercises',
      'Build a trivia quiz with 5+ questions',
    ],
    milestones:[
      { id:"m3-0", lvl:1, t:"Wrote and ran a first Python program that uses print() and input()", std:["1B-AP-09"] },
      { id:"m3-2", lvl:1, t:"Drew Turtle art with a for-loop and 3+ different shapes", std:["1B-AP-10"] },
      { id:"m3-1", lvl:2, t:"Built a number-guessing game using random, a while-loop and if/elif", std:["2-AP-12"] },
      { id:"m3-3", lvl:2, t:"Solved 10 small Python exercises and fixed errors by reading the error message", std:["1B-AP-15", "2-AP-17"] },
      { id:"m3-5", lvl:3, t:"Wrote a function with parameters and reused it (e.g. draw_star(size, colour))", std:["2-AP-14"] },
      { id:"m3-4", lvl:3, t:"Built a quiz with 5+ questions stored in a list, a final score, and family testers", std:["2-AP-11", "3A-AP-14", "2-AP-15"] },
    ],
    projects:[
      {
        "id": "p3-1",
        "lvl": 1,
        "e": "🐢",
        "title": "Turtle Art Gallery",
        "mins": "45 min",
        "tool": "Python Turtle (Trinket.io)",
        "brief": "Use Python's turtle to draw a gallery of shapes and patterns with loops.",
        "steps": [
          "Open trinket.io/turtle and run the starter code.",
          "Draw a square with a for-loop: for i in range(4).",
          "Draw a triangle and a hexagon — what number changes?",
          "Use colours and pen sizes to decorate.",
          "Combine 3+ shapes into one picture."
        ],
        "done": [
          "Uses a for-loop instead of repeating lines",
          "Picture contains 3+ different shapes"
        ],
        "stretch": "Draw a spiral by changing the distance inside the loop.",
        "std": [
          "1B-AP-10"
        ]
      },
      {
        "id": "p3-2",
        "lvl": 2,
        "e": "🎲",
        "title": "Guess My Number",
        "mins": "60 min",
        "tool": "Python (Thonny or Trinket)",
        "brief": "The computer picks a secret number from 1–100 and gives \"too high / too low\" hints until you guess it.",
        "steps": [
          "Import random and pick a secret number.",
          "Use a while-loop that keeps asking for a guess.",
          "Use if / elif / else to print higher, lower or correct.",
          "Count the guesses and print the total at the end.",
          "Test with these cases: guess 1, guess 100, guess the right number first time, type a word instead of a number."
        ],
        "done": [
          "Game works for all the listed test cases",
          "Guess counter is correct"
        ],
        "stretch": "Add difficulty levels (1–10, 1–100, 1–1000) and a best-score record.",
        "std": [
          "2-AP-12",
          "2-AP-17"
        ]
      },
      {
        "id": "p3-3",
        "lvl": 3,
        "e": "🧠",
        "title": "Quiz Master",
        "mins": "2 sessions",
        "tool": "Python",
        "brief": "A quiz on a topic your child loves, with questions stored in a list and a reusable ask_question function.",
        "steps": [
          "Choose a topic and write 5+ questions and answers.",
          "Store them in a list (e.g. a list of [question, answer] pairs).",
          "Write a function ask_question(question, answer) that returns True or False.",
          "Loop over the list, keep a score and print a final message.",
          "Have 2 family members take the quiz; improve one thing they found confusing."
        ],
        "done": [
          "Questions live in a list, not separate variables",
          "Uses a function with parameters",
          "Final score is shown and 2 people have tested it"
        ],
        "stretch": "Shuffle the questions and ignore upper/lower case in answers.",
        "std": [
          "2-AP-11",
          "2-AP-14",
          "3A-AP-14",
          "2-AP-15"
        ]
      }
    ],
  },
  { id:4, emoji:'🌐', name:'Web & Apps', age:'11–13', color:'#ff9f43',
    desc:'HTML, CSS, JavaScript. Build websites and apps that run in any browser.',
    ageNote:'GitHub requires users to be 13 or older. Under-13s can publish with Netlify Drop (no account needed) or under a parent\'s GitHub account with the parent present.',
    resources:[
      { e:'🏕️', n:'freeCodeCamp — Web Design', u:'https://freecodecamp.org/learn/2022/responsive-web-design', s:'300 hours of HTML & CSS. 5 certification projects. FREE.' },
      { e:'🎓', n:'The Odin Project', u:'https://theodinproject.com', s:'Top-rated full-stack curriculum. HTML → CSS → JS → Node. FREE.' },
      { e:'📝', n:'VS Code', u:'https://code.visualstudio.com', s:'Most popular code editor in the world. FREE.' },
      { e:'🐙', n:'GitHub Pages', u:'https://pages.github.com', s:'Host any HTML website for free. Perfect for first live portfolio. FREE.' },
    ],
    activities:[
      'Build a personal webpage with HTML & CSS',
      'Add JavaScript interactivity',
      'freeCodeCamp Responsive Web Design',
      'Publish first site live on GitHub Pages',
    ],
    milestones:[
      { id:"m4-0", lvl:1, t:"Built a personal web page with HTML & CSS (headings, image with alt text, links)", std:["2-AP-16"] },
      { id:"m4-5", lvl:1, t:"Saved work with Git and pushed it to GitHub (13+, or on a parent's account)", std:["3B-AP-20"] },
      { id:"m4-1", lvl:2, t:"Added JavaScript that reacts to clicks or typing (events) and changes the page", std:["2-AP-12", "3A-AP-16"] },
      { id:"m4-2", lvl:2, t:"Finished 3 freeCodeCamp Responsive Web Design projects", std:["2-AP-13", "2-AP-17"] },
      { id:"m4-4", lvl:3, t:"Built a JavaScript game or app with functions, tested with 5+ written test cases", std:["2-AP-14", "2-AP-17"] },
      { id:"m4-3", lvl:3, t:"Published a site live, checked it on a phone and fixed 2 accessibility issues", std:["3A-AP-21", "2-IC-21"] },
    ],
    projects:[
      {
        "id": "p4-1",
        "lvl": 1,
        "e": "🏠",
        "title": "All About Me Page",
        "mins": "60 min",
        "tool": "HTML & CSS (VS Code or CodePen)",
        "brief": "A one-page website about your child's interests — without sharing private details.",
        "steps": [
          "Create index.html with a heading, an intro paragraph and a list of favourite things.",
          "Add an image with alt text describing it.",
          "Add 2 links to sites they like.",
          "Create style.css: choose fonts, colours and spacing.",
          "Check it in the browser and fix anything that looks off."
        ],
        "done": [
          "Valid page with headings, a list, an image with alt text and links",
          "No personal info (full name, school, address)"
        ],
        "stretch": "Make it look good on a phone using a media query.",
        "std": [
          "2-AP-16",
          "2-IC-21"
        ]
      },
      {
        "id": "p4-2",
        "lvl": 2,
        "e": "🧮",
        "title": "Tip & Split Calculator",
        "mins": "60–90 min",
        "tool": "HTML, CSS, JavaScript",
        "brief": "A calculator that splits a restaurant bill and tip between friends, updating as you type.",
        "steps": [
          "Build inputs for bill amount, tip % and number of people.",
          "Write a function calculate(bill, tipPercent, people).",
          "Listen for input events and show the result instantly.",
          "Handle bad input: empty boxes, 0 people, negative numbers.",
          "Write 5 test cases in a table (input → expected result) and check each one."
        ],
        "done": [
          "Updates as you type",
          "All 5 written test cases pass",
          "Never shows NaN or Infinity"
        ],
        "stretch": "Add a dark mode toggle that remembers the choice with localStorage.",
        "std": [
          "2-AP-12",
          "2-AP-14",
          "2-AP-17"
        ]
      },
      {
        "id": "p4-3",
        "lvl": 3,
        "e": "🚀",
        "title": "Publish a Mini Web App",
        "mins": "2–3 sessions",
        "tool": "HTML/CSS/JS + Netlify Drop or GitHub Pages",
        "brief": "Build and publish a small web app (memory game, to-do list or habit tracker) that real people can use on a phone.",
        "steps": [
          "Write a short plan: who is it for and what are the 3 main features?",
          "Build it in small steps, testing after each feature.",
          "Save data with localStorage so it survives a refresh.",
          "Publish it (Netlify Drop, or GitHub Pages if 13+/parent account).",
          "Test on a phone, run an accessibility check (contrast, labels, keyboard) and fix 2 issues. Write a README."
        ],
        "done": [
          "Live URL that works on a phone",
          "Data survives a refresh",
          "2 accessibility fixes made and a README written"
        ],
        "stretch": "Ask 3 users for feedback and ship a version 2.",
        "std": [
          "3A-AP-16",
          "3A-AP-21",
          "2-AP-19"
        ]
      }
    ],
  },
  { id:5, emoji:'⚙️', name:'APIs & Automation', age:'13–15', color:'#ff6b9d',
    desc:'Connect services with APIs, automate real tasks, build back-end servers.',
    ageNote:'Most automation services (Zapier, Make, n8n Cloud), chat platforms (Discord, Telegram) and cloud hosts have minimum ages of 13–18. A parent should create and own these accounts and any API keys.',
    resources:[
      { e:'📗', n:'Automate the Boring Stuff', u:'https://automatetheboringstuff.com', s:'The best Python automation book. Fully free online. FREE.' },
      { e:'⚡', n:'n8n — Workflow Automation', u:'https://n8n.io', s:'Open-source visual workflow automation. Self-hostable. FREE.' },
      { e:'🚀', n:'Flask — Python Web Framework', u:'https://flask.palletsprojects.com', s:'Build REST APIs and web servers with Python. Lightweight.' },
      { e:'▲', n:'Vercel Deployment', u:'https://vercel.com', s:'Deploy web apps in seconds. Free tier. Perfect for first backends.' },
    ],
    activities:[
      'Connect to a public API and display data',
      'Build a Python automation script',
      'Create a Flask REST API',
      'Build a Zapier or n8n workflow',
    ],
    milestones:[
      { id:"m5-0", lvl:1, t:"Fetched live data from a public API (e.g. weather) and displayed it", std:["3B-AP-16", "2-DA-08"] },
      { id:"m5-3", lvl:1, t:"Built a 3+ step no-code automation and drew its trigger → actions flow", std:["2-AP-10"] },
      { id:"m5-1", lvl:2, t:"Wrote a Python script that automates a real chore (files, reminders, reports)", std:["3A-AP-13", "3A-AP-17"] },
      { id:"m5-4", lvl:2, t:"Stored data in a database (SQLite) and performed create/read/update/delete", std:["3A-DA-10", "3A-AP-18"] },
      { id:"m5-2", lvl:3, t:"Built a small web API (Flask or Node) with 2+ routes and a README", std:["3A-AP-18", "3A-AP-23"] },
      { id:"m5-5", lvl:3, t:"Deployed a full-stack project online with secrets kept out of the code", std:["3B-AP-18", "3A-NI-06"] },
    ],
    projects:[
      {
        "id": "p5-1",
        "lvl": 1,
        "e": "⛅",
        "title": "Weather Board",
        "mins": "60 min",
        "tool": "JavaScript or Python + Open-Meteo API (no key needed)",
        "brief": "A dashboard that shows today's weather for your town using live data from a free public API.",
        "steps": [
          "Find your town's latitude and longitude.",
          "Call the Open-Meteo forecast API and print the raw JSON.",
          "Pick out temperature, wind and rain chance.",
          "Display them nicely (web page or terminal), with an emoji for the weather.",
          "Handle errors: what happens with no internet?"
        ],
        "done": [
          "Shows live data that changes day to day",
          "Shows a friendly message when the request fails"
        ],
        "stretch": "Add a 5-day chart and a \"bring an umbrella?\" rule.",
        "std": [
          "3B-AP-16",
          "2-DA-08"
        ]
      },
      {
        "id": "p5-2",
        "lvl": 2,
        "e": "🧹",
        "title": "Chore Bot",
        "mins": "60–90 min",
        "tool": "Python",
        "brief": "A script that tidies a messy folder (e.g. Downloads) by sorting files into sub-folders by type.",
        "steps": [
          "Make a test folder with copies of sample files — never start on real files.",
          "List files with pathlib and group them by extension.",
          "Add a --dry-run mode that only PRINTS what would move.",
          "When the dry run looks right, move the files for real.",
          "Log what moved to a text file, and test with an empty folder and duplicate names."
        ],
        "done": [
          "Dry-run mode works",
          "Handles empty folders and duplicate file names",
          "Creates a log of every move"
        ],
        "stretch": "Schedule it to run weekly (Task Scheduler / cron / a no-code automation).",
        "std": [
          "3A-AP-13",
          "3A-AP-17",
          "2-AP-17"
        ]
      },
      {
        "id": "p5-3",
        "lvl": 3,
        "e": "📚",
        "title": "Homework Tracker API",
        "mins": "3–4 sessions",
        "tool": "Python Flask (or Node Express) + SQLite",
        "brief": "A small web service that stores homework tasks and lets a simple web page add, list and complete them.",
        "steps": [
          "Design the data: what fields does a task need? Draw the table.",
          "Create the SQLite database and Flask app.",
          "Build routes: GET /tasks, POST /tasks, PATCH /tasks/<id>, DELETE /tasks/<id>.",
          "Build a simple web page that uses the API.",
          "Deploy it, keep secrets in environment variables, and write a README with setup steps."
        ],
        "done": [
          "All 4 routes work and are documented",
          "No passwords or keys in the code",
          "Live demo link + README"
        ],
        "stretch": "Add accounts so each family member sees only their own tasks.",
        "std": [
          "3A-AP-18",
          "3A-DA-10",
          "3B-AP-18",
          "3A-AP-23"
        ]
      }
    ],
  },
  { id:6, emoji:'🤖', name:'AI & Professional', age:'15–18+', color:'#ff6b6b',
    desc:'Machine learning, AI agents, LLMs and professional engineering practices. The summit.',
    ageNote:'AI model APIs usually require users to be 18+ (some allow 13–17 with parental permission). Keep API keys in a parent\'s account with a spending limit set, and never paste keys into public code.',
    resources:[
      { e:'🎓', n:'fast.ai — Practical Deep Learning', u:'https://fast.ai', s:'Top-down practical ML. Build real models from day 1. FREE.' },
      { e:'🦜', n:'LangChain Docs', u:'https://docs.langchain.com', s:'Build AI agents, chains, RAG systems. The leading AI framework. FREE.' },
      { e:'🎓', n:'DeepLearning.AI Short Courses', u:'https://learn.deeplearning.ai', s:'30+ short AI courses from the world\'s best instructors. FREE.' },
      { e:'🤗', n:'Hugging Face — NLP Course', u:'https://huggingface.co/learn', s:'Learn transformers, LLMs and fine-tuning. FREE.' },
    ],
    activities:[
      'fast.ai or Andrew Ng ML course',
      'Build an AI chatbot with an LLM API (parent-owned key)',
      'Create a LangChain agent',
      'Enter a Kaggle competition',
    ],
    milestones:[
      { id:"m6-0", lvl:1, t:"Explained how an AI model learns from data, and one way it can be biased", std:["3B-AP-08", "3A-IC-25"] },
      { id:"m6-2", lvl:1, t:"Trained a first machine-learning model (Teachable Machine, fast.ai or Kaggle Learn)", std:["3B-AP-09", "3B-DA-05"] },
      { id:"m6-1", lvl:2, t:"Built an app that calls an LLM API, with a parent-owned key and spending limit", std:["3B-AP-16", "3B-AP-18"] },
      { id:"m6-3", lvl:2, t:"Completed a data project or Kaggle competition with a written analysis", std:["3B-DA-05", "3B-DA-07"] },
      { id:"m6-4", lvl:3, t:"Contributed to an open-source project (issue, docs fix or pull request)", std:["3B-AP-20", "3B-AP-23"] },
      { id:"m6-5", lvl:3, t:"Shipped a capstone with real users, tests and a README, and published a write-up or video", std:["3B-AP-17", "3B-AP-21"] },
    ],
    projects:[
      {
        "id": "p6-1",
        "lvl": 1,
        "e": "👀",
        "title": "Teach a Computer to See",
        "mins": "45–60 min",
        "tool": "Google Teachable Machine (no code)",
        "brief": "Train an image classifier (e.g. rock-paper-scissors hand signs) and investigate when it gets things wrong.",
        "steps": [
          "Pick 3 classes and record 50+ examples of each with the webcam.",
          "Train the model and test it live.",
          "Test under different lighting, backgrounds and with a different person.",
          "Write down where it fails and why that might happen (biased training data).",
          "Retrain with more varied examples and compare."
        ],
        "done": [
          "Working model for 3 classes",
          "Written notes on 2 failure cases and how retraining changed results"
        ],
        "stretch": "Export the model and use it in a small web page or Scratch extension.",
        "std": [
          "3B-AP-08",
          "3B-AP-09",
          "3A-IC-25"
        ]
      },
      {
        "id": "p6-2",
        "lvl": 2,
        "e": "🤖",
        "title": "Study Buddy Chatbot",
        "mins": "2–3 sessions",
        "tool": "Python or JavaScript + an LLM API (parent-owned key)",
        "brief": "A chatbot that quizzes you on a school subject, with safety rules and a spending limit.",
        "steps": [
          "A parent creates the API account, sets a monthly spending limit and creates a key.",
          "Store the key in an environment variable — never in the code or on GitHub.",
          "Write a system prompt: the bot quizzes on one subject and stays polite and on-topic.",
          "Build a simple chat loop or web page.",
          "Test with 10 tricky prompts (off-topic, rude, asking for answers only) and improve the prompt."
        ],
        "done": [
          "Key is never visible in code or screenshots",
          "Bot stays on-topic in 8/10 tricky tests",
          "Spending limit set"
        ],
        "stretch": "Add a \"quiz mode\" that scores answers and tracks weak topics.",
        "std": [
          "3B-AP-16",
          "3B-AP-18"
        ]
      },
      {
        "id": "p6-3",
        "lvl": 3,
        "e": "🏁",
        "title": "Capstone: Ship It",
        "mins": "4–8 weeks",
        "tool": "Any stack + Git",
        "brief": "Solve a real problem for real users — the portfolio piece for internships, applications and competitions.",
        "steps": [
          "Interview 3 potential users about a problem they have.",
          "Write a one-page spec: users, features, what \"done\" means.",
          "Build in weekly milestones with Git, opening an issue for each feature.",
          "Write automated tests for the core logic and ask someone to review the code.",
          "Launch to users, collect feedback, ship v1.1, and publish a write-up or demo video."
        ],
        "done": [
          "At least 3 real users",
          "Tests + README + public repo (or private with a demo video)",
          "Published write-up or video explaining decisions"
        ],
        "stretch": "Submit it to a competition (e.g. Congressional App Challenge, a hackathon or a science fair).",
        "std": [
          "3B-AP-17",
          "3B-AP-20",
          "3B-AP-21",
          "3B-AP-23"
        ]
      }
    ],
  },
];

/* ── DATA: RESOURCES ─────────────────────────────────────────── */
const RESOURCES = [
  { n:'Hello Ruby',url:'https://www.helloruby.com',e:'📗',desc:'Adventure stories teaching loops, conditions and decomposition for ages 5–7.',type:'book',cost:'paid',stages:[0]},
  { n:'Robot Turtles',url:'https://www.thinkfun.com',e:'🐢',desc:'The youngest programmer\'s board game. No screens needed. Ages 4+.',type:'game',cost:'paid',stages:[0,1]},
  { n:'Code & Go Robot Mouse',url:'https://learningresources.com',e:'🐭',desc:'Physical mouse navigates a maze — teaches sequences and debugging.',type:'hardware',cost:'paid',stages:[0,1]},
  { n:'ScratchJr',url:'https://scratchjr.org',e:'🐱',desc:'Official MIT drag-and-drop app for ages 5–7. No reading required. FREE.',type:'app',cost:'free',stages:[1]},
  { n:'Code.org — Course A',acct:'parent',url:'https://studio.code.org/courses/coursea-2025/units/1',e:'🤖',desc:'Full curriculum for pre-readers. Videos + activities. 100% free.',type:'course',cost:'free',stages:[1]},
  { n:'Code.org — Dance Party',url:'https://hourofcode.com/dance',e:'🎵',desc:'Code characters to dance to their favourite music. Huge hit with kids!',type:'activity',cost:'free',stages:[1,2]},
  { n:'Lightbot',url:'https://lightbot.com',e:'💡',desc:'Guide a robot with command blocks. Teaches sequences, loops and procedures.',type:'game',cost:'paid',stages:[1,2]},
  { n:'Scratch 3.0',acct:'parent',url:'https://scratch.mit.edu',e:'🐱',desc:'The world\'s most popular kids programming language. 100M+ projects online.',type:'platform',cost:'free',stages:[2,3]},
  { n:'Code.org — Course B/C/D',acct:'parent',url:'https://studio.code.org/courses/courseb-2025/units/1',e:'🎓',desc:'Complete self-paced curriculum for ages 6–10. Videos + exercises + projects.',type:'course',cost:'free',stages:[1,2]},
  { n:'Griffpatch on YouTube',url:'https://youtube.com/@griffpatch',e:'📺',desc:'World\'s most popular Scratch creator. Makes Minecraft in Scratch!',type:'video',cost:'free',stages:[2]},
  { n:'micro:bit',url:'https://microbit.org',e:'💎',desc:'$15 programmable circuit board with thousands of beginner projects.',type:'hardware',cost:'paid',stages:[2,3]},
  { n:'LEGO Boost',url:'https://lego.com/boost',e:'🧱',desc:'Build LEGO models and code them with Scratch-like blocks. Ages 7+.',type:'hardware',cost:'paid',stages:[2]},
  { n:'Makey Makey',url:'https://makeymakey.com',e:'🌈',desc:'Turn bananas into keyboards! Connects the real world to the computer.',type:'hardware',cost:'paid',stages:[2,3]},
  { n:'Trinket.io Turtle Python',url:'https://trinket.io/turtle',e:'🐢',desc:'Draw with Python turtle graphics instantly in the browser. No install needed.',type:'platform',cost:'free',stages:[3]},
  { n:'Python for Kids',url:'https://nostarch.com/pythonforkids',e:'📗',desc:'Best-selling intro book by Jason Briggs with games and fun examples.',type:'book',cost:'paid',stages:[3]},
  { n:'Swift Playgrounds',url:'https://apple.com/swift/playgrounds',e:'📱',desc:'Apple\'s own app for learning Swift. Gorgeous, game-like, zero setup.',type:'app',cost:'free',stages:[3,4]},
  { n:'Thonny IDE',url:'https://thonny.org',e:'🖥️',desc:'Best first Python IDE — shows how variables change in real time.',type:'tool',cost:'free',stages:[3]},
  { n:'CheckiO — Python Puzzles',url:'https://py.checkio.org',e:'🔧',desc:'Python puzzle island — solve coding challenges to advance on a map.',type:'game',cost:'free',stages:[3,4]},
  { n:'Automate the Boring Stuff',url:'https://automatetheboringstuff.com',e:'📗',desc:'The best Python automation book. Files, emails, PDFs, web scraping. FREE online.',type:'book',cost:'free',stages:[3,4,5]},
  { n:'freeCodeCamp — Web Design',acct:'parent',url:'https://freecodecamp.org',e:'🏕️',desc:'300 hours of HTML & CSS with 5 certification projects. 100% free.',type:'course',cost:'free',stages:[4]},
  { n:'The Odin Project',url:'https://theodinproject.com',e:'🎓',desc:'Top-rated full-stack curriculum: HTML → CSS → JavaScript → Node.js.',type:'course',cost:'free',stages:[4,5]},
  { n:'JavaScript.info',url:'https://javascript.info',e:'📘',desc:'The modern JavaScript tutorial. Best written resource on the web.',type:'book',cost:'free',stages:[4]},
  { n:'VS Code',url:'https://code.visualstudio.com',e:'📝',desc:'Most popular code editor in the world. Extensions for every language.',type:'tool',cost:'free',stages:[3,4,5,6]},
  { n:'GitHub Pages',acct:'13+',url:'https://pages.github.com',e:'🐙',desc:'Host any HTML website for free. Perfect for first live portfolios.',type:'platform',cost:'free',stages:[4,5]},
  { n:'n8n — Automation',acct:'parent',url:'https://n8n.io',e:'🔧',desc:'Open-source visual workflow automation. Self-hostable or cloud.',type:'platform',cost:'free',stages:[5]},
  { n:'Zapier',acct:'parent',url:'https://zapier.com',e:'⚡',desc:'No-code automation between 6,000+ apps. Great for learning trigger/action model.',type:'platform',cost:'mixed',stages:[5]},
  { n:'Make.com',acct:'parent',url:'https://make.com',e:'🔗',desc:'Visual drag-and-drop workflow builder. Free tier available.',type:'platform',cost:'mixed',stages:[5]},
  { n:'Flask',url:'https://flask.palletsprojects.com',e:'🚀',desc:'Build REST APIs and web servers with Python. Lightweight and beginner-friendly.',type:'framework',cost:'free',stages:[5]},
  { n:'fast.ai',url:'https://fast.ai',e:'🎓',desc:'Practical deep learning — build real AI models from day 1. Completely free.',type:'course',cost:'free',stages:[6]},
  { n:'DeepLearning.AI Courses',acct:'parent',url:'https://learn.deeplearning.ai',e:'🤖',desc:'30+ short AI courses on agents, RAG, LLMOps. From the world\'s best instructors.',type:'course',cost:'free',stages:[6]},
  { n:'LangChain',url:'https://docs.langchain.com',e:'🦜',desc:'Build AI agents, chains and RAG systems. The leading AI orchestration framework.',type:'framework',cost:'free',stages:[6]},
  { n:'Hugging Face Learn',acct:'parent',url:'https://huggingface.co/learn',e:'🤗',desc:'Learn transformers, LLMs and fine-tuning state-of-the-art models.',type:'course',cost:'free',stages:[6]},
  { n:'Kaggle Learn',acct:'parent',url:'https://kaggle.com/learn',e:'🏆',desc:'Bite-size ML courses and competitions. Build your portfolio with Kaggle notebooks.',type:'platform',cost:'free',stages:[6]},
  { n:'Replit',acct:'13+',url:'https://replit.com',e:'💻',desc:'Browser-based IDE. No install needed. Share projects with just a link.',type:'tool',cost:'mixed',stages:[3,4,5]},
  { n:'Google Colab',acct:'parent',url:'https://colab.research.google.com',e:'📓',desc:'Jupyter notebooks in the browser. Great prep for data science.',type:'tool',cost:'free',stages:[5,6]},
  { n:'Raspberry Pi Projects (Code Club)',url:'https://projects.raspberrypi.org',e:'🍓',desc:'Hundreds of free step-by-step Scratch, Python and web projects used by Code Clubs worldwide.',type:'course',cost:'free',stages:[2,3,4]},
  { n:'CodeCombat',url:'https://codecombat.com',e:'⚔️',desc:'Learn to type real Python or JavaScript by playing an adventure game. Intro levels free.',type:'game',cost:'mixed',acct:'parent',stages:[3,4]},
  { n:'Khan Academy Computing',url:'https://www.khanacademy.org/computing',e:'🎓',desc:'Free JavaScript drawing & animation, SQL and computer science courses.',type:'course',cost:'free',acct:'parent',stages:[4,5]},
  { n:'Open-Meteo API',url:'https://open-meteo.com',e:'⛅',desc:'Free weather API with no key or sign-up — perfect first API project.',type:'tool',cost:'free',stages:[5]},
  { n:'Teachable Machine',url:'https://teachablemachine.withgoogle.com',e:'👀',desc:'Train image, sound and pose AI models in the browser — no code needed.',type:'tool',cost:'free',stages:[5,6]},
  { n:'CS50 Python (Harvard)',url:'https://cs50.harvard.edu/python/',e:'🏛️',desc:'Harvard\'s free intro to programming with Python — lectures, problem sets and a final project.',type:'course',cost:'free',stages:[5,6]},
];
