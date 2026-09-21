// ==========================================
// 1️⃣ التنقل بين الأقسام
// ==========================================
function showSection(sectionId, element) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
        activeSection.classList.add('active');
    }
    if (element) {
        element.classList.add('active');
    }

    if (sectionId === 'arabic') {
        initArabicAlphabet();
    } else if (sectionId === 'puzzle') {
        initPuzzle();
    } else if (sectionId === 'events') {
        setTimeout(initCanvas, 50);
    } else if (sectionId === 'math') {
        generateMathQuiz();
        generateMultiplicationTable();
    }
}

// ==========================================
// 2️⃣ كود الحروف العربية 🔤
// ==========================================
const alphabetData = [
    { letter: 'أ', word: 'أ : أسد 🦁' }, { letter: 'ب', word: 'ب : بطة 🦆' },
    { letter: 'ت', word: 'ت : تفاحة 🍎' }, { letter: 'ث', word: 'ث : ثعلب 🦊' },
    { letter: 'ج', word: 'ج : جمل 🐪' }, { letter: 'ح', word: 'ح : حصان 🐎' },
    { letter: 'خ', word: 'خ : خروف 🐑' }, { letter: 'د', word: 'د : دب 🧸' },
    { letter: 'ذ', word: 'ذ : ذئب 🐺' }, { letter: 'ر', word: 'ر : رمان 🍎' },
    { letter: 'ز', word: 'ز : زرافة 🦒' }, { letter: 'س', word: 'س : سمكة 🐟' },
    { letter: 'ش', word: 'ش : شمس ☀️' }, { letter: 'ص', word: 'ص : صقر 🦅' },
    { letter: 'ض', word: 'ض : ضفدع 🐸' }, { letter: 'ط', word: 'ط : طائرة ✈️' },
    { letter: 'ظ', word: 'ظ : ظرف ✉️' }, { letter: 'ع', word: 'ع : عين 👁️' },
    { letter: 'غ', word: 'غ : غزال 🦌' }, { letter: 'ف', word: 'ف : فيل 🐘' },
    { letter: 'ق', word: 'ق : قلم ✏️' }, { letter: 'ك', word: 'ك : كتاب 📖' },
    { letter: 'ل', word: 'ل : ليمون 🍋' }, { letter: 'م', word: 'م : موز 🍌' },
    { letter: 'ن', word: 'ن : نجمة 🌟' }, { letter: 'هـ', word: 'هـ : هلال 🌙' },
    { letter: 'و', word: 'و : وردة 🌹' }, { letter: 'ي', word: 'ي : يد ✋' }
];

function initArabicAlphabet() {
    const container = document.getElementById('alphabetContainer');
    if (!container || container.innerHTML !== "") return;

    alphabetData.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.innerText = item.letter;
        btn.onclick = () => {
            document.getElementById('selectedLetter').innerText = item.letter;
            document.getElementById('letterWord').innerText = item.word;
        };
        container.appendChild(btn);
    });
}

// ==========================================
// 3️⃣ كود لعبة توصيل الأرقام 🔢
// ==========================================
let selectedNumber = null;
let selectedShape = null;

function selectMatch(type, value, element) {
    if (element.classList.contains('matched')) return;

    if (type === 'num') {
        document.querySelectorAll('#numbersColumn .match-item').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        selectedNumber = { val: value, elem: element };
    } else {
        document.querySelectorAll('#shapesColumn .match-item').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        selectedShape = { val: value, elem: element };
    }

    if (selectedNumber && selectedShape) {
        if (selectedNumber.val === selectedShape.val) {
            selectedNumber.elem.classList.remove('selected');
            selectedShape.elem.classList.remove('selected');
            selectedNumber.elem.classList.add('matched');
            selectedShape.elem.classList.add('matched');
            selectedNumber = null;
            selectedShape = null;
            checkMatchingWin();
        } else {
            setTimeout(() => {
                if (selectedNumber) selectedNumber.elem.classList.remove('selected');
                if (selectedShape) selectedShape.elem.classList.remove('selected');
                selectedNumber = null;
                selectedShape = null;
                alert('❌ إجابة غير صحيحة، حاول مرة أخرى!');
            }, 300);
        }
    }
}

function checkMatchingWin() {
    const totalMatched = document.querySelectorAll('.match-item.matched').length;
    if (totalMatched === 8) {
        setTimeout(() => alert('🎉 أحسنت يا بطل! لقد وصلت جميع الأرقام بالكامل 🏆'), 200);
    }
}

function resetMatchingGame() {
    document.querySelectorAll('.match-item').forEach(el => {
        el.classList.remove('selected', 'matched');
    });
    selectedNumber = null;
    selectedShape = null;
}

// ==========================================
// 4️⃣ كود لعبة البزل (Puzzle)
// ==========================================
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, ""];
let currentPuzzleImage = 'puzzle1.jpg';

function changePuzzleImage(newImage) {
    currentPuzzleImage = newImage;
    initPuzzle();
}

function renderPuzzle() {
    const board = document.getElementById('puzzle-board');
    if (!board) return;
    board.innerHTML = '';
    
    tiles.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.style.borderRadius = '8px';
        tileDiv.style.cursor = tile !== "" ? 'pointer' : 'default';
        tileDiv.style.userSelect = 'none';
        tileDiv.style.boxShadow = tile !== "" ? '0 2px 5px rgba(0,0,0,0.2)' : 'none';

        if (tile === "") {
            tileDiv.style.background = 'transparent';
        } else {
            const originalIndex = tile - 1;
            const row = Math.floor(originalIndex / 3);
            const col = originalIndex % 3;

            tileDiv.style.backgroundImage = `url('${currentPuzzleImage}')`;
            tileDiv.style.backgroundSize = '300px 300px';
            tileDiv.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            tileDiv.style.backgroundColor = '#ff6f61';
            
            tileDiv.onclick = () => moveTile(index);
        }
        board.appendChild(tileDiv);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf("");
    const validMoves = [index - 1, index + 1, index - 3, index + 3];

    if (validMoves.includes(emptyIndex)) {
        if ((index % 3 === 0 && emptyIndex === index - 1) || (index % 3 === 2 && emptyIndex === index + 1)) return;

        tiles[emptyIndex] = tiles[index];
        tiles[index] = "";
        renderPuzzle();
        checkWin();
    }
}

function initPuzzle() {
    tiles = [1, 2, 3, 4, 5, 6, 7, 8, ""].sort(() => Math.random() - 0.5);
    renderPuzzle();
}

function checkWin() {
    if (tiles.join(',') === "1,2,3,4,5,6,7,8,") {
        setTimeout(() => alert("🎉 كفوو! أحسنت، لقد حللت البزل بنجاح! 🏆"), 200);
    }
}

// ==========================================
// 5️⃣ كود جدول الضرب واختبار الذكاء
// ==========================================
let num1 = 0, num2 = 0, currentScore = 0;

function generateMathQuiz() {
    num1 = Math.floor(Math.random() * 9) + 2;
    num2 = Math.floor(Math.random() * 9) + 1;
    const quizElem = document.getElementById('quizQuestion');
    if (quizElem) {
        quizElem.innerText = `كم يساوي ${num1} × ${num2} ؟`;
    }
    const inputElem = document.getElementById('quizAnswer');
    if (inputElem) inputElem.value = '';
}

function checkMathAnswer() {
    const userAnswer = parseInt(document.getElementById('quizAnswer').value);
    const feedback = document.getElementById('quizFeedback');
    const correctAnswer = num1 * num2;

    if (userAnswer === correctAnswer) {
        feedback.style.color = '#4CAF50';
        feedback.innerText = '🎉 إجابة صحيحة! بطل الرياضيات 🌟';
        currentScore += 10;
        document.getElementById('scoreDisplay').innerText = currentScore;
        setTimeout(() => {
            feedback.innerText = '';
            generateMathQuiz();
        }, 1500);
    } else {
        feedback.style.color = '#f44336';
        feedback.innerText = `❌ إجابة خاطئة، حاول مرة أخرى! (الإجابة الصحيحة هي ${correctAnswer})`;
    }
}

function generateMultiplicationTable() {
    const table = document.getElementById('multiplicationTable');
    if (!table || table.innerHTML !== "") return;

    let html = '<tr style="background: #2196F3; color: white;"><th>×</th>';
    for (let i = 1; i <= 10; i++) html += `<th style="padding: 6px; border: 1px solid #ddd;">${i}</th>`;
    html += '</tr>';

    for (let i = 1; i <= 10; i++) {
        html += `<tr><th style="background: #2196F3; color: white; padding: 6px; border: 1px solid #ddd;">${i}</th>`;
        for (let j = 1; j <= 10; j++) {
            const bg = (i * j) % 2 === 0 ? '#f9f9f9' : '#ffffff';
            html += `<td style="padding: 6px; border: 1px solid #ddd; background: ${bg};">${i * j}</td>`;
        }
        html += '</tr>';
    }
    table.innerHTML = html;
}

// ==========================================
// 6️⃣ كود المرسم واللوحة
// ==========================================
let isEraser = false;
let canvasInitialized = false;

function initCanvas() {
    const canvas = document.getElementById('paintCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const brushSize = document.getElementById('brushSize') ? document.getElementById('brushSize').value : 10;
        const colorPicker = document.getElementById('colorPicker') ? document.getElementById('colorPicker').value : '#ff0000';

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';

        if (isEraser) {
            ctx.strokeStyle = '#ffffff';
        } else {
            ctx.strokeStyle = colorPicker;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    if (!canvasInitialized) {
        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);
        canvas.addEventListener('mousemove', draw);

        canvas.addEventListener('touchstart', startPosition);
        canvas.addEventListener('touchend', finishedPosition);
        canvas.addEventListener('touchmove', draw);
        canvasInitialized = true;
    }
}

function useEraser() { isEraser = true; }
function usePencil() { isEraser = false; }
function clearCanvas() {
    const canvas = document.getElementById('paintCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// التشغيل الأول
document.addEventListener("DOMContentLoaded", () => {
    initPuzzle();
});
