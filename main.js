import {success, error } from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css'; 
import './reset.scss'
import './style.scss'

const jsonObject = {}

const htmlElements = {
    inputKey: document.querySelector("#inputKey"),
    inputValue: document.querySelector("#inputValue"),
    buttonCreate: document.querySelector("#buttonCreate"),
    jsonBlock: document.querySelector("#jsonBlock"),
    copyJsonButton: document.querySelector("#copyJsonButton"),
    svg: document.querySelector("#svg")
}

htmlElements.buttonCreate.addEventListener("click", () => {
    const keyInput = htmlElements.inputKey.value
    const valueInput = htmlElements.inputValue.value

    if (keyInput === "" && valueInput === "") {
        error({
            text: "You have not filled in all the fields"
        })
        return;
    }
    if (keyInput === "" || valueInput === "") {
        error({
            text: "You forgot to fill in one more field."
        })
        return;
    }

    if (!isNaN(valueInput)) {
        jsonObject[keyInput] = parseInt(valueInput)
    } else {
        jsonObject[keyInput] = valueInput
    }
    
    const jsonStringify = JSON.stringify(jsonObject)
    htmlElements.jsonBlock.innerHTML = `${jsonStringify}`

    htmlElements.copyJsonButton.addEventListener("click", () => {
        const originalColor = htmlElements.copyJsonButton.style.color
        const originalFill = htmlElements.svg.style.fill

        htmlElements.copyJsonButton.style.color = "#12A921" 
        htmlElements.svg.style.fill = "#12A921"

        
        navigator.clipboard.writeText(jsonStringify)
        success({
            text: "JSON copied to clipboard!"
        })

        setTimeout(() => {
            htmlElements.copyJsonButton.style.color = originalColor
            htmlElements.svg.style.fill = originalFill
        }, 500)
    })
})