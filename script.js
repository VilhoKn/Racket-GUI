let save = []
let color = 0
let myObj = {
    var: [
        {name: "name", rgb: "0 0 0"},
    ],
    data: []
}

const emptySave = (x, y) => {
    arr = []
    for (i = 0; i < x; i++) {
        arr.push([])
        for (j = 0; j < y; j++) {
            arr[i].push([255, 255, 255])
        }
    }
    return arr
}

const init = () => {
    for (const row of save) {
        let rowEl = document.createElement("div")
        rowEl.classList.add("row")
        for (const pixel of row) {
            let pixelEl = document.createElement("div")
            pixelEl.addEventListener("click", () => {
                
            })
            pixelEl.classList.add("pixel")
            pixelEl.style.background = `rgb(${pixel.join(",")})`
            rowEl.appendChild(pixelEl)
        }
        document.querySelector(".grid-container").appendChild(rowEl)
    }
}

if (save.length == 0) {
    save = emptySave(10, 10)
    myObj.data = save
}