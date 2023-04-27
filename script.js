let saves = []
let color = 0
let currentSave = {}
let choice = ""
let currentName = ""

const createCode = () => {
    let code = ""
    code += `(define koko ${currentSave.size})\n`
    for (i of currentSave.var) {
        code += `(define ${i.name} (square koko "solid" (make-color ${i.rgb})))\n`
    }
    let rowText = "\n"
    let pixelText = ""
    for (let i = 0; i < currentSave.data.length; i++) {
        pixelText = ""
        for (let j = 0; j < currentSave.data[i].length; j++) {
            const pixelName = currentSave.var.find(x => x.rgb == currentSave.data[i][j].join(" ")).name
            pixelText += `${pixelName} `
        }
        rowText += `(define R${i+1} (beside ${pixelText}))\n`
    }
    code += rowText+"\n"
    code += "\n(above "
    for(let i = 0; i < currentSave.data.length; i++) {
        code += `R${i+1} `
    }
    code += ")\n"
    document.querySelector("#code").value = code
    document.querySelector(".code").style.display = "block"
}

const loadSaves = () => {
    saves = localStorage.getItem('saves') ? JSON.parse(localStorage.getItem('saves')) : []
    currentName = localStorage.getItem('currentName') ? JSON.parse(localStorage.getItem('currentName')) : ""
}

const emptyGrid = (x, y, rgb) => {
    arr = []
    for (i = 0; i < x; i++) {
        arr.push([])
        for (j = 0; j < y; j++) {
            arr[i].push(rgb.split(" "))
        }
    }
    return arr
}

const refreshSaves = () => {
    document.querySelector(".saves").innerHTML = ""
    for (let i = 0; i < saves.length; i++) {
        const li = document.createElement('div')
        li.classList.add('save')
        const name = document.createElement("p")
        name.classList.add("save-name")
        name.innerText = saves[i].name
        if(saves[i].name == choice) li.classList.add("save-selected")
        li.addEventListener('click', () => {choice = saves[i].name; refreshSaves()})
        li.appendChild(name)
        document.querySelector(".saves").appendChild(li)
    }
}

const refreshInputs = () => {
    document.querySelector("#name").value = currentSave.name
    document.querySelector("#size").value = currentSave.size
    document.querySelector("#outline").value = currentSave.outline

    document.querySelector("#size").addEventListener('change', () => {currentSave.size = parseInt(document.querySelector("#size").value); console.log(currentSave.size); document.querySelectorAll(".pixel").forEach(i => {
        i.style.width = `${currentSave.size}px`
        i.style.height = `${currentSave.size}px`
    });})
    document.querySelector("#outline").addEventListener('change', () => {currentSave.outline = parseInt(document.querySelector("#outline").value); document.querySelectorAll(".pixel").forEach(i => {
        i.style.border = `${currentSave.outline}px solid #000`
    });})
}

const refreshVariables = () => {
    document.querySelector(".variable-container").innerHTML = ""
    for (let i = 0; i < currentSave.var.length; i++) {
        const li = document.createElement('div')
        li.classList.add('var')
        const name = document.createElement("input")
        name.classList.add("var-input")
        const rgb = document.createElement("input")
        rgb.classList.add("var-input")
        const preview = document.createElement("div")
        preview.classList.add("var-preview")

        if (i == color) li.classList.add("var-selected")
        name.value = currentSave.var[i].name
        const rgbTemp = currentSave.var[i].rgb
        rgb.value = rgbTemp
        const rgbList = rgbTemp.split(" ")
        preview.style.backgroundColor = `rgb(${rgbList.join(",")})`

        name.addEventListener('change', () => {currentSave.var[i].name = name.value; refreshVariables()})
        rgb.addEventListener('change', () => {currentSave.var[i].rgb = rgb.value; refreshVariables()})
        preview.addEventListener('click', () => {color = i; refreshVariables()})

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete")
        deleteButton.innerText = "X"
        deleteButton.addEventListener('click', () => {currentSave.var.splice(i, 1); refreshVariables()})
        
        li.appendChild(preview)
        li.appendChild(name)
        li.appendChild(rgb)
        li.appendChild(deleteButton)
        
        document.querySelector('.variable-container').appendChild(li)
    }
}

const refreshGrid = () => {
    document.querySelector(".grid-container").innerHTML = ""
    for (let i = 0; i < currentSave.data.length; i++) {
        let rowEl = document.createElement("div")
        rowEl.classList.add("row")
        for (let j = 0; j < currentSave.data[i].length; j++) {
            let pixelEl = document.createElement("div")
            pixelEl.addEventListener("click", () => {
                currentSave.data[i][j] = currentSave.var[color].rgb.split(" ")
                pixelEl.style.background = `rgb(${currentSave.var[color].rgb.replace(" ", ",")})`
                refreshGrid()
            })
            pixelEl.classList.add("pixel")
            pixelEl.style.width = `${currentSave.size}px`
            pixelEl.style.height = `${currentSave.size}px`
            pixelEl.style.border = `${currentSave.outline}px solid #000`
            pixelEl.style.background = `rgb(${currentSave.data[i][j].join(",")})`
            rowEl.appendChild(pixelEl)
        }
        document.querySelector(".grid-container").appendChild(rowEl)
    }
}

const init = () => {
    loadSaves()
    currentSave = saves.find(save => save.name == currentName)
    if (choice == "") choice = currentName
    if(saves.length == 0) {
        saves.push({
            name: "Oletus",
            size: 30,
            outline: 2,
            var: [
                {name: "M", rgb: "0 0 0"},
                {name: "V", rgb: "255 255 255"},
            ],
            data: emptyGrid(16, 16, "255 255 255")
        })
        localStorage.setItem('saves', JSON.stringify(saves))
        localStorage.setItem('currentName', JSON.stringify("Oletus"))
        init()
    }
    refreshGrid()
    refreshVariables()
    refreshInputs()
    refreshSaves()
}

document.querySelector("#fill").addEventListener('click', () => {
    currentSave.data = emptyGrid(document.querySelector("#width").value, document.querySelector("#height").value, document.querySelector("#color").value)
    refreshGrid()
})

document.querySelector("#save").addEventListener('click', () => {
    const newName = document.querySelector("#name").value
    if (newName == "") return
    if (saves.find(save => save.name == newName)) {
        saves = saves.filter(save => save.name != newName)
    }
    saves.push({...currentSave, name: newName})
    localStorage.setItem('saves', JSON.stringify(saves))
    localStorage.setItem('currentName', JSON.stringify(newName))
    init()
})

document.querySelector("#load").addEventListener('click', () => {
    if (choice == "") return
    localStorage.setItem('currentName', JSON.stringify(choice))
    init()
})

document.querySelector("#delete").addEventListener('click', () => {
    if (choice == "") return
    saves = saves.filter(save => save.name != choice)
    localStorage.setItem('saves', JSON.stringify(saves))
    localStorage.setItem('currentName', JSON.stringify(saves[0].name))
    choice = saves[0].name
    init()
})

document.querySelector("#add-variable").addEventListener('click', () => {
    currentSave.var.push({name: `V${Math.floor(Math.random() * 100)}`, rgb: "0 0 0"})
    refreshVariables()
})

document.querySelector("#close").addEventListener('click', () => {
    document.querySelector(".code").style.display = "none"
})

document.querySelector("#show").addEventListener('click', () => {
    createCode()
})

init()