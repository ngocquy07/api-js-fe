document.getElementById('login-form').onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  fetch('http://localhost:8000/login', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      window.location = 'index.html';
    } else {
      document.getElementById('login-error').innerText = 'Sai tài khoản hoặc mật khẩu!';
    }
  });
};