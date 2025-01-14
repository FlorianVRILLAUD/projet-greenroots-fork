const select = document.querySelector("#variety-tree");
const trees = document.querySelectorAll('.tree');

select.addEventListener("change", (event) => {
    const target = document.querySelectorAll(`.${event.target.value}`)
  
    trees.forEach(tree => {
      tree.classList.add('hide');
      
      if (event.target.value == "all-varieties") {
          tree.classList.remove('hide');
      }
    });

  
    for (let i = 0; i < target.length; i++) {
      target[i].classList.remove('hide');
      
    }
  })