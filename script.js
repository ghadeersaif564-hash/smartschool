function showSection(sectionId, element) {
    // إخفاء كافة الأقسام
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // إزالة اللون النشط من كافة الأزرار
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // إظهار القسم المختار وتفعيل زره
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    if (element) {
        element.classList.add('active');
    }
}
// ==========================================
// 🎨 كود لوحة التلوين والممحاة التفاعلية
// ==========================================
const canvas = document.getElementById('paintCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let painting = false;
    let currentColor = '#ff0000';
    let isEraser = false;

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
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.lineWidth = document.getElementById('brushSize').value;
        ctx.lineCap = 'round';

        if (isEraser) {
            ctx.strokeStyle = '#ffffff'; // إرجاع اللون للأبيض لعمل الممحاة
        } else {
            ctx.strokeStyle = document.getElementById('colorPicker').value;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // أحداث الماوس واللمس للهواتف
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
