const quizData = [
  {
    question: "What does CPU stand for?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Programming Unit"],
    answer: "Central Processing Unit"
  },
  {
    question: "Which type of memory is non-volatile and used to store firmware?",
    options: ["RAM", "ROM", "Cache", "Register"],
    answer: "ROM"
  },
  {
    question: "Which register holds the address of the next instruction to be executed?",
    options: ["Program Counter", "Accumulator", "Instruction Register", "Stack Pointer"],
    answer: "Program Counter"
  },
  {
    question: "Which of the following is NOT an operating system?",
    options: ["Linux", "Windows", "Oracle", "macOS"],
    answer: "Oracle"
  },
  {
    question: "In which scheduling algorithm does the process with the shortest burst time execute first?",
    options: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"],
    answer: "SJF"
  },
  {
    question: "What is a critical section in an operating system?",
    options: ["Part of the CPU", "Section where the OS is stored", "Code segment where shared resources are accessed", "Part of RAM"],
    answer: "Code segment where shared resources are accessed"
  },
  {
    question: "Which data structure uses the FIFO principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue"
  },
  {
    question: "What is the worst-case time complexity of binary search?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    answer: "O(log n)"
  },
  {
    question: "Which of the following is a compiled language?",
    options: ["Python", "Java", "C", "JavaScript"],
    answer: "C"
  },
  {
    question: "What does the 'return 0;' statement signify in C/C++?",
    options: ["Loop terminator", "Program error", "End of main function", "Memory allocation"],
    answer: "End of main function"
  },
  {
    question: "Which device connects two different networks?",
    options: ["Switch", "Hub", "Router", "Repeater"],
    answer: "Router"
  },
  {
    question: "What does IP stand for?",
    options: ["Internet Protocol", "Internal Protocol", "Integrated Packet", "Internet Program"],
    answer: "Internet Protocol"
  },
  {
    question: "Which protocol is used to transfer web pages?",
    options: ["FTP", "HTTP", "SMTP", "DNS"],
    answer: "HTTP"
  },
  {
    question: "Which of the following is a relational database management system?",
    options: ["MongoDB", "MySQL", "Neo4j", "Redis"],
    answer: "MySQL"
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Question Language", "Structured Query Language", "System Query Language", "Simple Query Language"],
    answer: "Structured Query Language"
  },
  {
    question: "What is the main function of an ALU?",
    options: ["Store data", "Perform arithmetic and logic operations", "Control operations", "Transfer data"],
    answer: "Perform arithmetic and logic operations"
  },
  {
    question: "Which logic gate outputs 1 only when both inputs are 1?",
    options: ["OR", "XOR", "AND", "NOR"],
    answer: "AND"
  },
  {
    question: "Which of the following is a type of malware?",
    options: ["Firewall", "Trojan Horse", "Proxy Server", "VPN"],
    answer: "Trojan Horse"
  },
  {
    question: "Which software development model uses a linear sequential approach?",
    options: ["Agile", "Spiral", "Waterfall", "Prototype"],
    answer: "Waterfall"
  },
  {
    question: "Which company developed the first microprocessor?",
    options: ["AMD", "Intel", "IBM", "Microsoft"],
    answer: "Intel"
  }
];

let currentQuestion = 0;
let answers = [];

function startQuiz() {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    alert("Please enter your name!");
    return;
  }

  document.getElementById('loginContainer').classList.add('hidden');
  document.getElementById('quizContainer').classList.remove('hidden');
  document.getElementById('welcomeMsg').textContent = `Welcome, ${username}!`;

  answers = new Array(quizData.length).fill(null);
  showQuestion();
}

function showQuestion() {
  const q = quizData[currentQuestion];
  const quizBox = document.getElementById('quizBox');
  quizBox.innerHTML = `
    <div class="question">
      <p><b>${currentQuestion + 1}. ${q.question}</b></p>
      <div class="options">
        ${q.options.map(opt => `
          <label>
            <input type="radio" name="option" value="${opt}" ${answers[currentQuestion] === opt ? 'checked' : ''} />
            ${opt}
          </label>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('prevBtn').style.display = currentQuestion === 0 ? 'none' : 'inline-block';
  document.getElementById('nextBtn').style.display = currentQuestion === quizData.length - 1 ? 'none' : 'inline-block';
  document.getElementById('submitBtn').classList.toggle('hidden', currentQuestion !== quizData.length - 1);
}

function nextQuestion() {
  saveAnswer();
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  answers[currentQuestion] = selected ? selected.value : null;
}

function submitQuiz() {
  saveAnswer();
  let score = 0;
  quizData.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  document.getElementById('quizContainer').classList.add('hidden');
  document.getElementById('resultContainer').classList.remove('hidden');
  document.getElementById('resultText').textContent = `You scored ${score} out of ${quizData.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  answers = [];
  document.getElementById('resultContainer').classList.add('hidden');
  document.getElementById('loginContainer').classList.remove('hidden');
}

document.getElementById('modeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark');
  document.getElementById('modeLabel').textContent =
    document.body.classList.contains('dark') ? 'Dark Mode' : 'Light Mode';
});

function submitQuiz() {
  saveAnswer();
  let score = 0;
  quizData.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  let emoji = '';
  if (score >= 15) {
    emoji = '😄';
  } else if (score >= 10) {
    emoji = '😐';
  } else {
    emoji = '😢';
  }

  document.getElementById('quizContainer').classList.add('hidden');
  document.getElementById('resultContainer').classList.remove('hidden');
  document.getElementById('resultText').innerHTML = `You scored <b>${score}</b> out of <b>${quizData.length}</b> <br><span style="font-size: 3rem;">${emoji}</span>`;
}
