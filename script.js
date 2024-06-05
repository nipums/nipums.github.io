let score = localStorage.getItem("score1");

function customizeNavbar() {
  document.getElementById('score').textContent = 'Кликов: ' + localStorage.getItem("score1");
}

window.onload = customizeNavbar;

document.getElementById('clickButton').addEventListener('click', function() {
  score++;
  document.getElementById('score').textContent = 'Кликов: ' + score;
  localStorage.setItem("score1", score);
});