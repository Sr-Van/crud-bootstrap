let registers = []

const setDb = () => [
    localStorage.registers = JSON.stringify(registers)
]

if(!localStorage.registers) {
    setDb()
} 

registers = JSON.parse(localStorage.getItem("registers"))



const personName = document.querySelector("#nome")
const personAge = document.querySelector("#idade")
const personSalary = document.querySelector("#salario")
const personTime = document.querySelector("#tempo")

const tbody = document.querySelector(".tbody-register")

const btnAdd = document.querySelector(".btn-add")
const btnEdit = document.querySelector(".btn-edit")
const btnDelete = document.querySelector(".btn-delete")

let idToChange


const cleanInputs = () => {
    personName.value = ""
    personAge.value = ""
    personSalary.value = ""
    personTime.value = ""
}


const addRegister = () => {
    const newObj = {}

    newObj.id = Math.floor(Math.random() * 1000)
    newObj.name = personName.value
    newObj.age = parseFloat(personAge.value)
    newObj.salary = parseFloat(personSalary.value)
    newObj.time = parseFloat(personTime.value)

    registers.push(newObj)
    setDb()
    cleanInputs()
    render()
}


const renderTableRegisters = (person, index) => {

    const {name: personName, age, salary, time} = person
    const tr = document.createElement("tr")

    tr.innerHTML = 
        `
            <td data-id="${index}">${personName}</td>
            <td>${age}</td>
            <td>${salary}</td>
            <td>${time}</td>
        `

    tbody.append(tr)
}


const render = () => {
    tbody.innerHTML = ""
    registers.forEach((person, index) => {
        renderTableRegisters(person, index)
    })
}

render()

const fillInputsWithValues = i => {
    const { name, age, salary, time } = registers[i]

    document.querySelector("#nome").value = name
    document.querySelector("#idade").value = age
    document.querySelector("#salario").value = salary
    document.querySelector("#tempo").value = time
}


const editRegister = id => {
    let editRegister = registers[id]

    editRegister.name = personName.value
    editRegister.age = parseFloat(personAge.value)
    editRegister.salary = parseFloat(personSalary.value)
    editRegister.time = parseFloat(personTime.value)

    setDb()
    render()
}

const deleteRegister = id => {
    registers.splice(id, 1)
    setDb()
    render()
}

btnAdd.addEventListener("click", () => addRegister())


btnEdit.addEventListener("click", () => editRegister(idToChange))

btnDelete.addEventListener("click", () => deleteRegister(idToChange))

tbody.addEventListener("click", (e) => {
    const target = e.target.getAttribute("data-id")
    fillInputsWithValues(target)
    idToChange = target
})
