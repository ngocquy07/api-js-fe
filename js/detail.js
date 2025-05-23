function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const mangaId = getQueryParam('id');
const detailContainer = document.getElementById('detail-container');
const chapterContent = document.getElementById('chapter-content');

if (!mangaId) {
  detailContainer.innerHTML = "<p style='color:red;'>Không tìm thấy truyện!</p>";
} else {
  fetch(`http://localhost:8000/manga/${mangaId}`)
    .then(res => res.json())
    .then(manga => {
      let imgSrc = manga.image;
      if (!imgSrc.startsWith('http')) {
        imgSrc = `http://localhost:8000/${imgSrc.replace(/\\/g, '/')}`;
      }
detailContainer.innerHTML = `
  <div class="detail-card">
    <img src="${imgSrc}" alt="${manga.title}">
    <div class="detail-info">
      <h2>${manga.title}</h2>
      <p><b>Tác giả:</b> ${manga.author}</p>
      <p><b>Thể loại:</b> ${manga.category}</p>
      <p><b>Chi tiết:</b> ${manga.description}</p>
    </div>
  </div>
`;
      // Hiển thị danh sách chương
      const chapterList = document.getElementById('chapter-list');
      manga.chapters.forEach((chapter, idx) => {
        const btn = document.createElement('button');
        btn.textContent = `Chương ${idx + 1}`;
        btn.style.marginRight = "8px";
        btn.onclick = () => showChapterContent(manga, idx);
        chapterList.appendChild(btn);
      });
    });
}

function showChapterContent(manga, chapterIndex) {
  chapterContent.innerHTML = `
    <div style="background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(251,191,36,0.07);padding:24px 30px;margin:32px auto 0 auto;max-width:600px;">
      <h2 style="color:#fb2424;">${manga.title} - Chương ${chapterIndex + 1}</h2>
      <p>${manga.chapters[chapterIndex]}</p>
      <button onclick="window.scrollTo(0,0);chapterContent.innerHTML='';">Quay lại</button>
    </div>
  `;
}