const lists = document.querySelectorAll(".list");
const button = document.querySelector(".button");

let value;
let dragItem = null;

function addTask() {
  const btn = document.querySelector(".add_btn");
  const addBtn = document.querySelector(".add_item-btn");
  const cancelBtn = document.querySelector(".cancel_item-btn");
  const textarea = document.querySelector(".textarea");
  const form = document.querySelector(".form");

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    form.style.display = "block";
    btn.style.display = "none";
    addBtn.style.display = "none";

    textarea.addEventListener("input", (e) => {
      value = e.target.value;

      if (value) {
        addBtn.style.display = "block";
      } else {
        addBtn.style.display = "none";
      }
    });
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (textarea.value) {
      let responce = confirm("Вы точно хотите закрыть и удалить задание?");
      if (responce) {
        textarea.value = "";
        value = "";
        form.style.display = "none";
        btn.style.display = "block";
        addBtn.style.display = "none";

        return;
      }

      return;
    }

    textarea.value = "";
    value = "";
    form.style.display = "none";
    btn.style.display = "block";
    addBtn.style.display = "none";
  });

  addBtn.addEventListener("click", () => {
    const newItem = document.createElement("div");
    newItem.classList.add("list_item");
    newItem.draggable = true;
    newItem.textContent = value;
    lists[0].append(newItem);

    dragNDrop();

    textarea.value = "";
    value = "";
    form.style.display = "none";
    btn.style.display = "block";
    addBtn.style.display = "none";
  });
}

function addBoard() {
  const boards = document.querySelector(".boards");
  const board = document.createElement("div");
  board.classList.add("boards_item");
  board.innerHTML = `
    <span contenteditable="true" class="title">Введите название</span>
        <div class="list"></div>
    </div>
    `;

  board.addEventListener("contextmenu", (e) => {
    let responce = confirm("Вы точно хотите удалить доску?");
    e.preventDefault();

    if (responce) {
      board.remove();

      return;
    }

    return;
  });

  boards.append(board);

  changeTitle();
  dragNDrop();
}

function changeTitle() {
  const titles = document.querySelectorAll(".title");

  titles.forEach((title) => {
    title.addEventListener("click", (e) => (e.target.textContent = ""));
    title.addEventListener("blur", (e) => {
      if (e.target.textContent == "") {
        e.target.textContent = "Введите название";
      }
    });
  });
}

function dragNDrop() {
  const listItems = document.querySelectorAll(".list_item");
  const lists = document.querySelectorAll(".list");

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    item.addEventListener("dragstart", () => {
      dragItem = item;
      setTimeout(() => {
        item.style.display = "none";
      });
    });

    item.addEventListener("dragend", () => {
      setTimeout(() => {
        item.style.display = "block";
        dragItem = null;
      });
    });

    item.addEventListener("dblclick", () => {
      console.log(1);
      item.remove();
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener("dragover", (e) => e.preventDefault());

      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "rgba(0,0,0,.3)";
      });

      list.addEventListener("dragleave", function () {
        this.style.backgroundColor = "rgba(0,0,0,0)";
      });

      list.addEventListener("drop", function () {
        this.style.backgroundColor = "rgba(0,0,0,0)";
        this.append(dragItem);
      });
    }
  }
}

addTask();
changeTitle();
dragNDrop();

button.addEventListener("click", addBoard);
