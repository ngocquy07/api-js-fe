document.getElementById('login-btn').onclick = function() {
  window.location = 'login.html';
};

// Chỉ GET danh sách truyện, không cần token
function loadMangaList() {
  fetch('http://localhost:8000/manga')
    .then(res => res.json())
    .then(data => {
      const mangaList = document.getElementById('manga-list');
      mangaList.innerHTML = '';
      data.forEach(manga => {
        let imgSrc = manga.image;
        if (!imgSrc.startsWith('http')) {
          imgSrc = `http://localhost:8000/${imgSrc.replace(/\\/g, '/')}`;
        }
        const div = document.createElement('div');
       div.className = 'manga-item';
  div.innerHTML = `
        <img src="${imgSrc}" alt="${manga.title}" />
        <h2>${manga.title}</h2>
        <p><b>Tác giả:</b> ${manga.author}</p>
        <p><b>Thể loại:</b> ${manga.category}</p>
        <p class="detail"><b>Chi tiết:</b> ${manga.description}</p>
        <button onclick="window.location='detail.html?id=${manga.id}'">Xem chi tiết</button>
`;
        mangaList.appendChild(div);
      });
    });
}

window.showChapters = function(mangaId) {
  fetch(`http://localhost:8000/manga/${mangaId}`)
    .then(res => res.json())
    .then(manga => {
      const chapterContent = document.getElementById('chapter-content');
      chapterContent.innerHTML = `<h2>${manga.title}</h2>`;
      manga.chapters.forEach((chapter, idx) => {
        const btn = document.createElement('button');
        btn.textContent = `Chương ${idx + 1}`;
        btn.onclick = () => showChapterContent(manga, idx);
        chapterContent.appendChild(btn);
      });
    });
};

window.showChapterContent = function(manga, chapterIndex) {
  const chapterContent = document.getElementById('chapter-content');
  chapterContent.innerHTML = `
    <h2>${manga.title} - Chương ${chapterIndex + 1}</h2>
    <p>${manga.chapters[chapterIndex]}</p>
    <button onclick="showChapters(${manga.id})">Quay lại</button>
  `;
};

loadMangaList();