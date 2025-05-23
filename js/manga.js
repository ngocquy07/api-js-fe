const form = document.getElementById('add-manga-form');
const imageFile = document.getElementById('image-file');
const mangaList = document.getElementById('manga-list');

function getToken() {
  return localStorage.getItem('token');
}

function loadMangaList() {
  mangaList.innerHTML = '';
  fetch('http://localhost:8000/manga', {
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
    .then(res => {
      if (res.status === 401) {
        window.location = 'login.html';
        return [];
      }
      return res.json();
    })
    .then(data => {
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
  <button class="delete-btn" data-id="${manga.id}">Xóa</button>
`;
        mangaList.appendChild(div);
      });

      // Gán sự kiện xóa cho các nút xóa
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = function() {
          const id = this.getAttribute('data-id');
          if (confirm('Bạn có chắc muốn xóa truyện này?')) {
            fetch(`http://localhost:8000/manga/${id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': 'Bearer ' + getToken()
              }
            })
            .then(() => loadMangaList());
          }
        };
      });
    });
}

form.onsubmit = function(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('title', document.getElementById('title').value);
  formData.append('author', document.getElementById('author').value);
  formData.append('category', document.getElementById('category').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('image', imageFile.files[0]);
  fetch('http://localhost:8000/manga', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    body: formData
  })
  .then(res => res.json())
  .then(() => {
    form.reset();
    loadMangaList();
  });
};

// Gọi khi trang vừa load
loadMangaList();