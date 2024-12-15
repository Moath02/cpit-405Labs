
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return value;
    }
    return null;
  }
  
  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  

  let likes = parseInt(getCookie('likes')) || 0;
  let dislikes = parseInt(getCookie('dislikes')) || 0;
  const comment = getCookie('comment');
  
  document.getElementById('like-count').textContent = likes;
  document.getElementById('dislike-count').textContent = dislikes;
  
  if (comment) {
    const commentList = document.getElementById('comment-list');
    const li = document.createElement('li');
    li.textContent = comment;
    commentList.appendChild(li);
  }
  
  function handleLike() {
    if (getCookie('voted')) {
      alert('You have already voted!');
      return;
    }
    likes++;
    document.getElementById('like-count').textContent = likes;
    setCookie('likes', likes, 7);
    setCookie('voted', true, 7);
  }
  
  function handleDislike() {
    if (getCookie('voted')) {
      alert('You have already voted!');
      return;
    }
    dislikes++;
    document.getElementById('dislike-count').textContent = dislikes;
    setCookie('dislikes', dislikes, 7);
    setCookie('voted', true, 7);
  }
  
  function submitComment() {
    if (getCookie('commented')) {
      alert('You have already commented!');
      return;
    }
    const commentInput = document.getElementById('comment-input').value.trim();
    if (!commentInput) {
      alert('Please enter a comment!');
      return;
    }
    setCookie('comment', commentInput, 7);
    setCookie('commented', true, 7);
    const commentList = document.getElementById('comment-list');
    const li = document.createElement('li');
    li.textContent = commentInput;
    commentList.appendChild(li);
    document.getElementById('comment-input').value = '';
  }
  
  function handleReset() {
    deleteCookie('likes');
    deleteCookie('dislikes');
    deleteCookie('voted');
    deleteCookie('comment');
    deleteCookie('commented');
    likes = 0;
    dislikes = 0;
    document.getElementById('like-count').textContent = likes;
    document.getElementById('dislike-count').textContent = dislikes;
    document.getElementById('comment-list').innerHTML = '';
    alert('Your votes and comments have been reset!');
  }
  