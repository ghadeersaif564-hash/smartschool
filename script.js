// ==========================================
// 1️⃣ التنقل بين الأقسام (الكتب، البزل، المرسم)
// ==========================================
function showSection(sectionId, element) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => sec.classList.remove('active'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    if (element) {
        element.classList.add('active');
    }
}

// ==========================================
// 2️⃣ كود تشغيل لعبة البزل التفاعلية 🧩
// ==========================================
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, ""];

function renderPuzzle() {
    const board = document.getElementById('puzzle-board');
    if (!board) return;
    board.innerHTML = '';
    
    tiles.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.style.display = 'flex';
        tileDiv.style.alignItems = 'center';
        tileDiv.style.justifyContent = 'center';
        tileDiv.style.fontSize = '1.8rem';
        tileDiv.style.fontWeight = 'bold';
        tileDiv.style.borderRadius = '8px';
        tileDiv.style.cursor = tile !== "" ? 'pointer' : 'default';
        tileDiv.style.userSelect = 'none';

        if (tile === "") {
            tileDiv.style.background = 'transparent';
        } else {
            tileDiv.style.background = '#ff6f61';
            tileDiv.style.color = '#fff';
            tileDiv.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            tileDiv.innerText = tile;
            tileDiv.onclick = () => moveTile(index);
        }
        board.appendChild(tileDiv);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf("");
    const validMoves = [
        index - 1, index + 1, // يسار ويمين
        index - 3, index + 3  // أعلى وأسفل
    ];

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
// 3️⃣ كود لوحة الرسم والمرسم التفاعلي 🎨
// ==========================================
let isEraser = false;

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
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

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

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', finishedPosition);
    canvas.addEventListener('touchmove', draw);
}

function useEraser() {
    isEraser = true;
}

function usePencil() {
    isEraser = false;
}

function clearCanvas() {
    const canvas = document.getElementById('paintCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// ==========================================
// 4️⃣ تشغيل كل الأكواب تلقائياً عند فتح الموقع
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initPuzzle();
    initCanvas();
});
