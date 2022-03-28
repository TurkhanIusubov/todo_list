const form1 = document.querySelector('form.form1')
const addBtn = document.querySelector('.add-btn')
const inputText = document.querySelector('input.input_text') 
const div2 = document.querySelector('div.d2')

function createDomElements(todos){
    let UL = document.createElement('ul')
    UL.classList.add('ul1')
    div2.appendChild(UL)

    let textDiv = document.createElement('div')
    textDiv.classList.add('text_div')
    UL.appendChild(textDiv)

    let btn_cb = document.createElement('input')
    btn_cb.classList.add('btn-cb')
    btn_cb.type = 'checkbox'
    btn_cb.checked = todos.isComplete
    textDiv.appendChild(btn_cb)

    let LI = document.createElement('li')
    textDiv.appendChild(LI)
    LI.textContent = todos.text
    // console.log(todos.text)

    let btns_div = document.createElement('div')
    btns_div.classList.add('btns-div')
    UL.appendChild(btns_div)

    let delete_btn = document.createElement('button')
    delete_btn.classList.add('delete-btn')
    btns_div.appendChild(delete_btn)
    delete_btn.textContent = 'Delete'

    let edit_btn = document.createElement('button')
    edit_btn.classList.add('edit-btn')
    btns_div.appendChild(edit_btn)
    edit_btn.textContent = 'Edit'

    // ----  EDIT INPUT AND SAVE BUTTON ----

    let editInput = document.createElement('input')
    editInput.type = 'text'
    editInput.classList.add('edit-input')
    textDiv.appendChild(editInput)

    let save_btn = document.createElement('button')
    save_btn.classList.add('save-btn')
    btns_div.appendChild(save_btn)
    save_btn.textContent = 'Save'

    editInput.style.display = 'none'
    save_btn.style.display = 'none'
}

function startPage(){
    let todos = JSON.parse(localStorage.getItem('todos'))

    if(!todos){
        localStorage.setItem('todos', JSON.stringify([]) )
    } else{
        todos.forEach(element => {
            createDomElements(element)
        })
    }
    inputText
}
startPage()

form1.addEventListener('submit', formFunction)

let arr = {}
function formFunction(e){
    // e.preventDefault()
    let inputValue = inputText.value
    if(inputValue){
        arr.text = inputValue
        arr.isComplete = false
        let todos = JSON.parse(localStorage.getItem('todos'))
        todos.push(arr)
        localStorage.setItem('todos', JSON.stringify(todos))
        createDomElements(todos[todos.length-1])
    }
    if(inputValue == ''){
        inputText.style.border = '1px solid red'
        inputText.style.boxShadow = '0 0 2px 1px red'
    }
    
    form1.reset()

}

let delete_btn = document.querySelectorAll('.delete-btn')
delete_btn.forEach(btn => {
    btn.addEventListener('click', deleteFunction)
})

function deleteFunction(e){
    let remove_UL = e.target.parentElement.parentElement
    remove_UL.remove()
    let LI_textContent = remove_UL.children[0].textContent
    let todos = JSON.parse(localStorage.getItem('todos'))
    todos = todos.filter(td=>td.text != LI_textContent)
    localStorage.setItem('todos', JSON.stringify(todos))
    
}

let btn_cb = document.querySelectorAll('.btn-cb')
btn_cb.forEach(cb=>{
    cb.addEventListener('click', cbFunction)
})
function cbFunction(e){
    let UL1 = e.target.parentElement.parentElement
    let LI_text = UL1.children[0].textContent
    let todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach(td=>{
        if(td.text === LI_text){
            td.isComplete = !td.isComplete
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    console.log('test')
}

let edit_btn = document.querySelectorAll('.edit-btn')
edit_btn.forEach(btn=>{
    btn.addEventListener('click', editFunction)
})

function editFunction(e){
    let editParent = e.target.parentElement.parentElement
    // editParent.remove()
    let cb_btn = editParent.children[0].children[0]
    let LI = editParent.children[0].children[1]
    let editInput = editParent.children[0].children[2]
    editInput.style.display = 'flex'
    editInput.value = LI.textContent
    editInput.focus()
    cb_btn.style.display = 'none'
    LI.style.display = 'none'

    let btns_div = e.target.parentElement
    let delete_btn = btns_div.children[0]
    let edit_btn = btns_div.children[1]
    let save_btn = btns_div.children[2]
    save_btn.style.display = 'flex'
    delete_btn.style.display = 'none'
    edit_btn.style.display = 'none'
}
let save_btn = document.querySelectorAll('.save-btn')

save_btn.forEach(btn=>{
    btn.addEventListener('click', saveFunction)
})
function saveFunction(e){
    let UL1 = e.target.parentElement.parentElement
    // console.log(UL1)
    let cb_btn = UL1.children[0].children[0]
    let LI = UL1.children[0].children[1]
    let editInput = UL1.children[0].children[2]

    let todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach(td=>{
        if(td.text===LI.textContent){
            td.text = editInput.value
            td.isComplete = false
            cb_btn.checked = false
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))

    LI.style.display = 'flex'
    LI.textContent = editInput.value
    editInput.style.display = 'none'
    cb_btn.style.display = 'flex'

    let delete_btn = UL1.children[1].children[0]
    let edit_btn = UL1.children[1].children[1]
    let save_btn = UL1.children[1].children[2]
    delete_btn.style.display = 'flex'
    edit_btn.style.display = 'flex'
    save_btn.style.display = 'none'

}

// ---- Edit Button Alternative Variant

// function editFunction(e){
//     let editParent = e.target.parentElement.parentElement
//     editParent.remove()
//     let LI_text = editParent.children[0].textContent
//     let todos = JSON.parse(localStorage.getItem('todos'))
//     todos = todos.filter(td=>td.text!=LI_text)
//     localStorage.setItem('todos', JSON.stringify(todos))

//     inputText.value = LI_text
//     inputText.focus()
// }