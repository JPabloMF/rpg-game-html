const cube = document.getElementById('cube');

let x = 0;

document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 87:
        
      break;
    case 83:

      break;
    case 65:
      x -= 10;
      cube.style.transform = `translateX(${x}px)`;
      break;
    case 68:
      x += 10;
      cube.style.transform = `translateX(${x}px)`;
      break;
    default:
      break;
  }
});