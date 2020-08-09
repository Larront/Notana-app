const encounterContainer = document.querySelector('[data-encounters]')
const newEncounterForm = document.querySelector('[data-new-encounter-form]')
const newEncounterInput = document.querySelector('[data-new-encounter-input]')
const deleteEncounterButton = document.querySelector('[data-delete-encounter-button]')
const monsterDisplayContainer = document.querySelector('[data-monsters-display-container]')
const monsterContainer = document.querySelector('[data-monsters]')
const initItemTemplate = document.getElementById('init-item-template')

//TODO: Add pull fucntion for encounter list and active encoutner from save file

let encounters = []
let selectedEncounterID = null

encounterContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'a') {
        selectedEncounterID = e.target.dataset.encounterID
        render()
    }
})

deleteEncounterButton.addEventListener('click', e => {
    encounters = encounters.filter(encounter => encounter.id !== selectedEncounterID)
    selectedEncounterID = null
    render()
})

newEncounterForm.addEventListener('submit', e => {
    e.preventDefault()
    const encounterName = newEncounterInput.value
    if (encounterName == null || encounterName === '') return
    const encounter = createEncounter(encounterName)
    newEncounterInput.value = null
    encounters.push(encounter)
    render()
})

function createEncounter(encounterName) {
    return {
        id: Date.now().toString(), name: encounterName, monsters: [{
            id: 1,
            name: 'Syndar Deofric',
            initiative: 12,
            hp: 80,
            states: [],
            unconscious: false
        }]
    }
}

function render() {
    clearElement(encounterContainer)
    renderEncounters()

    const selectedEncounter = encounters.find(encounter => encounter.id === selectedEncounterID)
    if (selectedEncounterID == null) {
        // monsterDisplayContainer.style.display = 'none'
    } else {
        monsterDisplayContainer.style.display = ''
        clearElement(monsterContainer)
        renderMonsters(selectedEncounter)
    }
}

function renderMonsters(selectedEncounter) {
    selectedEncounter.monsters.forEach(monster => {
        const monsterElement = document.importNode(initItemTemplate.content, true)

        monsterElement.id = monster.id

        const init = monsterElement.querySelector('.init-item-init')
        init.innerText = monster.initiative

        const monsterName = monsterElement.querySelector('.init-item-name')
        monsterName.innerText = monster.name

        const hp = monsterElement.querySelector('.init-item-hp')
        hp.value = monster.hp

        monsterContainer.appendChild(monsterElement)
    })
}

function renderEncounters() {
    encounters.forEach(encounter => {
        const encounterElement = document.createElement('li')
        encounterElement.classList.add("nav-item")

        const name = document.createElement('a')
        name.classList.add("nav-link")
        name.innerText = encounter.name
        name.dataset.encounterID = encounter.id

        if (encounter.id === selectedEncounterID) {
            name.classList.add("active")
        }

        encounterElement.appendChild(name)
        encounterContainer.appendChild(encounterElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()


