// ==========================================
// 1️⃣ متغيرات ومتطلبات لعبة البزل (Puzzle)
// ==========================================
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, ""];
let currentPuzzleImage = 'puzzle1.jpg'; // الصورة الافتراضية الأولى

// التنقل بين أقسام الموقع (الكتب، البزل، المرسم)
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

// تغيير صورة البزل عند ضغط الطفل على الأزرار
function changePuzzleImage(newImage) {
    currentPuzzleImage = newImage;
    initPuzzle();
}

// رسم ورصف قطع البزل بالصورة المختارة
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

            // إظهار جزء من الصورة المحددة
            tileDiv.style.backgroundImage = `url('${currentPuzzleImage}')`;
            tileDiv.style.backgroundSize = '300px 300px';
            tileDiv.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            
            tileDiv.onclick = () => moveTile(index);
        }
        board.appendChild(tileDiv);
    });
}

// حركة قطعة البزل عند الضغط عليها
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

// خلط البزل لبدء اللعبة
function initPuzzle() {
    tiles = [1, 2, 3, 4, 5, 6, 7, 8, ""].sort(() => Math.random() - 0.5);
    renderPuzzle();
}

// رسالة الفوز عند إكمال البزل
function checkWin() {
    if (tiles.join(',') === "1,2,3,4,5,6,7,8,") {
        setTimeout(() => alert("🎉 كفوو! أحسنت، لقد حللت البزل بنجاح! 🏆"), 200);
    }
}


// ==========================================
// 2️⃣ كود مرسم الأطفال والتلوين (Canvas)
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
            ctx.strokeStyle = '#ffffff'; // الممحاة ترسم باللون الأبيض
        } else {
            ctx.strokeStyle = colorPicker;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // دعم الماوس واللمس للهواتف والأيباد
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
// 3️⃣ تشغيل كل الألعاب والوظائف تلقائياً
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initPuzzle();
    initCanvas();
});
