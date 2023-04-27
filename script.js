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
    document.querySelector(".grid-container").innerHTML = ""
    console.log(myObj)
    for (let i = 0; i < myObj.data.length; i++) {
        let rowEl = document.createElement("div")
        rowEl.classList.add("row")
        for (let j = 0; j < myObj.data[i].length; j++) {
            let pixelEl = document.createElement("div")
            pixelEl.addEventListener("click", () => {
                myObj.data[i][j] = [myObj.var[color].rgb]
                pixelEl.style.background = `rgb(${myObj.var[color].rgb.replace(" ", ",")})`
                console.log(myObj)
                init()
            })
            pixelEl.classList.add("pixel")
            pixelEl.style.background = `rgb(${myObj.data[i][j].join(",")})`
            rowEl.appendChild(pixelEl)
        }
        document.querySelector(".grid-container").appendChild(rowEl)
    }
}

if (save.length == 0) {
    save = emptySave(10, 10)
    myObj.data = save
}

init()
console.log(myObj)