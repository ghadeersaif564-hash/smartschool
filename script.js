/* ==========================================
   التنسيقات العامة للموقع
   ========================================== */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0f4f8;
    margin: 0;
    padding: 0;
    direction: rtl;
}

.container {
    max-width: 1100px;
    margin: 20px auto;
    padding: 0 15px;
}

/* ==========================================
   تنسيق الهيدر والأزرار
   ========================================== */
header {
    background: linear-gradient(135deg, #ff6f61, #de1a53);
    color: white;
    text-align: center;
    padding: 20px 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.school-name {
    margin: 0 0 15px 0;
    font-size: 2rem;
}

.main-nav {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
}

.nav-btn {
    background-color: rgba(255, 255, 255, 0.2);
    border: 2px solid white;
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.nav-btn:hover, .nav-btn.active {
    background-color: white;
    color: #de1a53;
}

.section-title {
    text-align: center;
    color: #333;
    margin-bottom: 25px;
}

/* ==========================================
   🎯 الحل الرئيسي: ترتيب القصص أفقياً (Flexbox)
   ========================================== */
.grid {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    align-items: stretch !important;
    gap: 25px !important;
    width: 100% !important;
    box-sizing: border-box !important;
}

/* 🎴 تنسيق كرت القصة */
.card {
    background: #ffffff !important;
    border-radius: 18px !important;
    padding: 25px 20px !important;
    text-align: center !important;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08) !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
    
    /* جعل كل كرت بعرض 280 بكسل حتى تتصف بجانب بعضها */
    width: 280px !important;
    max-width: 100% !important;
    
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    align-items: center !important;
    border: 2px solid #eef2f5 !important;
    box-sizing: border-box !important;
}

.card:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
    border-color: #ff6f61 !important;
}

.card-icon {
    font-size: 3.5rem;
    margin-bottom: 15px;
}

.card h3 {
    color: #2c3e50;
    margin: 10px 0;
    font-size: 1.3rem;
}

.card p {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
}

/* 🔘 زر القراءة والتحميل */
.btn {
    display: inline-block;
    background-color: #ffc107;
    color: #333;
    padding: 10px 22px;
    text-decoration: none;
    border-radius: 25px;
    font-weight: bold;
    transition: background 0.3s ease;
    border: none;
    cursor: pointer;
}

.btn:hover {
    background-color: #e0a800;
}
