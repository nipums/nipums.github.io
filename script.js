let score = localStorage.getItem("score1");

function customizeNavbar() {
  if (localStorage.getItem("score1") != null)
  {
    document.getElementById('score').textContent = 'Кликов: ' + localStorage.getItem("score1");
  }

  else
  {
    document.getElementById('score').textContent = 'Кликов: ' + 0;
  }
}

window.onload = customizeNavbar;

document.getElementById('clickButton').addEventListener('click', function() {
  score++;
  document.getElementById('score').textContent = 'Кликов: ' + score;
  localStorage.setItem("score1", score);
});