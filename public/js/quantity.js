function increment(id) {
  const input = document.getElementById(id);
  input.value = parseInt(input.value) + 1;
}

function decrement(id) {
  const input = document.getElementById(id);
  if (parseInt(input.value) > 0) {
    input.value = parseInt(input.value) - 1;
  }
}