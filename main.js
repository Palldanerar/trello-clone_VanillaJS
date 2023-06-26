const lists = document.querySelectorAll(".list")
let value

function addTask() {
    const btn = document.querySelector(".add_btn")
    const addBtn = document.querySelector(".add_item-btn")
    const cancelBtn = document.querySelector(".cancel_item-btn")
    const textarea = document.querySelector(".textarea")
    const form = document.querySelector(".form")


    btn.addEventListener("click" , (e) => {
        e.preventDefault()

        form.style.display = "block"
        btn.style.display = "none"
        addBtn.style.display = "none"

        textarea.addEventListener("input", (e) => {
            value = e.target.value

            if (value) {
                addBtn.style.display = "block"
            } else {
                addBtn.style.display = "none"
            }
        })

    })

    cancelBtn.addEventListener("click" , (e) => {
        e.preventDefault()

        if (textarea.value) {
            let responce = confirm("Вы точно хотите закрыть и удалить задание?")
            if (responce) {
                textarea.value = ""
                value = ""
                form.style.display = "none"
                btn.style.display = "block"
                addBtn.style.display = "none"

                return
            }

            return
        }

        textarea.value = ""
        value = ""
        form.style.display = "none"
        btn.style.display = "block"
        addBtn.style.display = "none"
    })

    addBtn.addEventListener("click", () => {
        const newItem = document.createElement("div")
        newItem.classList.add("list_item")
        newItem.draggable = true
        newItem.textContent = value
        lists[0].append(newItem)

        textarea.value = ""
        value = ""
        form.style.display = "none"
        btn.style.display = "block"
        addBtn.style.display = "none"
    })

}

addTask()