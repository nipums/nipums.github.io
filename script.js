let score = localStorage.getItem("score1");

window.addEventListener('load', function () {
  document.getElementById('score').textContent = 'Кликов: ' + localStorage.getItem("score1");
});

document.getElementById('clickButton').addEventListener('click', function() {
  score++;
  document.getElementById('score').textContent = 'Кликов: ' + score;
  localStorage.setItem("score1", score);
});