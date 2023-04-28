let saves = []
let color = 0
let currentSave = {}
let choice = ""
let currentName = ""

const colorDict = {
    aliceblue: "240 248 255",
    antiquewhite: "250 235 215",
    aqua: "0 255 255",
    aquamarine: "127 255 212",
    azure: "240 255 255",
    beige: "245 245 220",
    bisque: "255 228 196",
    black: "0 0 0",
    blanchedalmond: "255 235 205",
    blue: "0 0 255",
    blueviolet: "138 43 226",
    brown: "165 42 42",
    burlywood: "222 184 135",
    cadetblue: "95 158 160",
    chartreuse: "127 255 0",
    chocolate: "210 105 30",
    coral: "255 127 80",
    cornflowerblue: "100 149 237",
    cornsilk: "255 248 220",
    crimson: "220 20 60",
    cyan: "0 255 255",
    darkblue: "0 0 139",
    darkcyan: "0 139 139",
    darkgoldenrod: "184 134 11",
    darkgray: "169 169 169",
    darkgreen: "0 100 0",
    darkgrey: "169 169 169",
    darkkhaki: "189 183 107",
    darkmagenta: "139 0 139",
    darkolivegreen: "85 107 47",
    darkorange: "255 140 0",
    darkorchid: "153 50 204",
    darkred: "139 0 0",
    darksalmon: "233 150 122",
    darkseagreen: "143 188 143",
    darkslateblue: "72 61 139",
    darkslategray: "47 79 79",
    darkslategrey: "47 79 79",
    darkturquoise: "0 206 209",
    darkviolet: "148 0 211",
    deeppink: "255 20 147",
    deepskyblue: "0 191 255",
    dimgray: "105 105 105",
    dimgrey: "105 105 105",
    dodgerblue: "30 144 255",
    firebrick: "178 34 34",
    floralwhite: "255 250 240",
    forestgreen: "34 139 34",
    fuchsia: "255 0 255",
    gainsboro: "220 220 220",
    ghostwhite: "248 248 255",
    gold: "255 215 0",
    goldenrod: "218 165 32",
    gray: "128 128 128",
    grey: "128 128 128",
    green: "0 128 0",
    greenyellow: "173 255 47",
    honeydew: "240 255 240",
    hotpink: "255 105 180",
    indianred: "205 92 92",
    indigo: "75 0 130",
    ivory: "255 255 240",
    khaki: "240 230 140",
    lavender: "230 230 250",
    lavenderblush: "255 240 245",
    lawngreen: "124 252 0",
    lemonchiffon: "255 250 205",
    lightblue: "173 216 230",
    lightcoral: "240 128 128",
    lightcyan: "224 255 255",
    lightgoldenrodyellow: "250 250 210",
    lightgray: "211 211 211",
    lightgreen: "144 238 144",
    lightgrey: "211 211 211",
    lightpink: "255 182 193",
    lightsalmon: "255 160 122",
    lightseagreen: "32 178 170",
    lightskyblue: "135 206 250",
    lightslategray: "119 136 153",
    lightslategrey: "119 136 153",
    lightsteelblue: "176 196 222",
    lightyellow: "255 255 224",
    lime: "0 255 0",
    limegreen: "50 205 50",
    linen: "250 240 230",
    magenta: "255 0 255",
    maroon: "128 0 0",
    mediumaquamarine: "102 205 170",
    mediumblue: "0 0 205",
    mediumorchid: "186 85 211",
    mediumpurple: "147 112 219",
    mediumseagreen: "60 179 113",
    mediumslateblue: "123 104 238",
    mediumspringgreen: "0 250 154",
    mediumturquoise: "72 209 204",
    mediumvioletred: "199 21 133",
    midnightblue: "25 25 112",
    mintcream: "245 255 250",
    mistyrose: "255 228 225",
    moccasin: "255 228 181",
    navajowhite: "255 222 173",
    navy: "0 0 128",
    oldlace: "253 245 230",
    olive: "128 128 0",
    olivedrab: "107 142 35",
    orange: "255 165 0",
    orangered: "255 69 0",
    orchid: "218 112 214",
    palegoldenrod: "238 232 170",
    palegreen: "152 251 152",
    paleturquoise: "175 238 238",
    palevioletred: "219 112 147",
    papayawhip: "255 239 213",
    peachpuff: "255 218 185",
    peru: "205 133 63",
    pink: "255 192 203",
    plum: "221 160 221",
    powderblue: "176 224 230",
    purple: "128 0 128",
    red: "255 0 0",
    rosybrown: "188 143 143",
    royalblue: "65 105 225",
    saddlebrown: "139 69 19",
    salmon: "250 128 114",
    sandybrown: "244 164 96",
    seagreen: "46 139 87",
    seashell: "255 245 238",
    sienna: "160 82 45",
    silver: "192 192 192",
    skyblue: "135 206 235",
    slateblue: "106 90 205",
    slategray: "112 128 144",
    slategrey: "112 128 144",
    snow: "255 250 250",
    springgreen: "0 255 127",
    steelblue: "70 130 180",
    tan: "210 180 140",
    teal: "0 128 128",
    thistle: "216 191 216",
    tomato: "255 99 71",
    turquoise: "64 224 208",
    violet: "238 130 238",
    wheat: "245 222 179",
    white: "255 255 255",
    whitesmoke: "245 245 245",
    yellow: "255 255 0",
    yellowgreen: "154 205 50"
};
  

const getRgb = (s) => {
    const temp = s.toLowerCase().replace(" ", "")
    return Object.keys(colorDict).includes(temp) ? colorDict[temp] : false
}

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
        name.classList.add("var-name")
        name.classList.add("var-input")
        const rgb = document.createElement("input")
        rgb.classList.add("var-rgb")
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
        rgb.addEventListener('change', () => {currentSave.var[i].rgb = getRgb(rgb.value) ? getRgb(rgb.value) : rgb.value; refreshVariables()})
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
    currentSave.data = emptyGrid(document.querySelector("#width").value, document.querySelector("#height").value, getRgb(document.querySelector("#color").value) ? getRgb(document.querySelector("#color").value) : document.querySelector("#color").value)
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
    const newName = saves[0] ? saves[0].name : ""
    localStorage.setItem('saves', JSON.stringify(saves))
    localStorage.setItem('currentName', JSON.stringify(newName))
    choice = newName
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