// ==========================================
// 1️⃣ التنقل بين الأقسام
// ==========================================
function showSection(sectionId, element) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => sec.style.display = 'none');

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
    if (element) {
        element.classList.add('active');
    }

    if (sectionId === 'arabic') {
        initArabicAlphabet();
    } else if (sectionId === 'math') {
        generateMathQuiz();
        generateMultiplicationTable();
    } else if (sectionId === 'puzzle') {
        initPuzzle();
    } else if (sectionId === 'events') {
        setTimeout(initCanvas, 50);
    }
}

// ==========================================
// 2️⃣ الحروف العربية
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
    if (!container) return;
    container.innerHTML = "";

    alphabetData.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.innerText = item.letter;
        btn.onclick = function() {
            document.getElementById('selectedLetter').innerText = item.letter;
            document.getElementById('letterWord').innerText = item.word;
        };
        container.appendChild(btn);
    });
}

// ==========================================
// 3️⃣ البزل وتغيير الصور
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
        tileDiv.style.borderRadius = '6px';
        tileDiv.style.cursor = tile !== "" ? 'pointer' : 'default';
        tileDiv.style.userSelect = 'none';

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
        setTimeout(() => alert("🎉 أحسنت! لقد نجحت في تركيب الصورة! 🏆"), 200);
    }
}

// ==========================================
// 4️⃣ جدول الضرب والإختبار
// ==========================================
let currentNum1 = 0, currentNum2 = 0, score = 0;

function generateMathQuiz() {
    currentNum1 = Math.floor(Math.random() * 9) + 2;
    currentNum2 = Math.floor(Math.random() * 9) + 1;
    document.getElementById('quizQuestion').innerText = `كم يساوي ${currentNum1} × ${currentNum2} ؟`;
    document.getElementById('quizAnswer').value = '';
}

function checkMathAnswer() {
    const inputVal = parseInt(document.getElementById('quizAnswer').value);
    const feedback = document.getElementById('quizFeedback');
    const correctVal = currentNum1 * currentNum2;

    if (inputVal === correctVal) {
        feedback.style.color = '#4CAF50';
        feedback.innerText = '🎉 إجابة صحيحة! بطل 🌟';
        score += 10;
        document.getElementById('scoreDisplay').innerText = score;
        setTimeout(() => {
            feedback.innerText = '';
            generateMathQuiz();
        }, 1200);
    } else {
        feedback.style.color = '#f44336';
        feedback.innerText = `❌ إجابة خاطئة! الناتج الصحيح هو ${correctVal}`;
    }
}

function generateMultiplicationTable() {
    const table = document.getElementById('multiplicationTable');
    if (!table || table.innerHTML.trim() !== "") return;

    let html = '<tr style="background: #2196F3; color: white;"><th>×</th>';
    for (let i = 1; i <= 10; i++) html += `<th style="padding: 5px;">${i}</th>`;
    html += '</tr>';

    for (let i = 1; i <= 10; i++) {
        html += `<tr><th style="background: #2196F3; color: white; padding: 5px;">${i}</th>`;
        for (let j = 1; j <= 10; j++) {
            const bg = (i * j) % 2 === 0 ? '#f9f9f9' : '#ffffff';
            html += `<td style="padding: 5px; border: 1px solid #ddd; background: ${bg};">${i * j}</td>`;
        }
        html += '</tr>';
    }
    table.innerHTML = html;
}

// ==========================================
// 5️⃣ أدوات المرسم والتلوين
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

// البدء عند التحميل
document.addEventListener("DOMContentLoaded", () => {
    initArabicAlphabet();
    initPuzzle();
});
