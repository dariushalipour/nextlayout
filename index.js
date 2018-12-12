const createStyle = obj => Object.entries(obj)
    .map(i => `${i[0]}:${i[1]};`).join('')

const root = document.getElementById('root')

const boxOne = document.createElement('div')
boxOne.setAttribute('style', createStyle({
    position: 'fixed',
    transition: 'all .1s linear',
    width: '100px',
    height: '100px',
    'background-color': 'purple',
}))
root.appendChild(boxOne)

const boxTwo = document.createElement('div')
boxTwo.setAttribute('style', createStyle({
    position: 'fixed',
    transition: 'all .1s linear',
    width: '50px',
    height: '50px',
    'background-color': 'magenta',
}))
root.appendChild(boxTwo)

const boxThree = document.createElement('div')
boxThree.setAttribute('style', createStyle({
    position: 'fixed',
    transition: 'all .1s linear',
    width: '25px',
    height: '25px',
    'background-color': 'green',
}))
root.appendChild(boxThree)

const px = val => `${val}px`

const align = {
    top: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.top = px(crdt.offsetTop - sbjt.offsetHeight)
    },
    topInside: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.top = px(crdt.offsetTop)
    },
    middle: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.top = px(crdt.offsetTop + (crdt.offsetHeight / 2) - (sbjt.offsetHeight / 2))
    },
    bottomInside: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.top = px(crdt.offsetTop + crdt.offsetHeight - sbjt.offsetHeight)
    },
    bottom: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.top = px(crdt.offsetTop + crdt.offsetHeight)
    },
    left: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.left = px(crdt.offsetLeft - sbjt.offsetWidth)
    },
    leftInside: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.left = px(crdt.offsetLeft)
    },
    center: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.left = px(crdt.offsetLeft + (crdt.offsetWidth / 2) - (sbjt.offsetWidth / 2))
    },
    rightInside: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.left = px(crdt.offsetLeft + crdt.offsetWidth - sbjt.offsetWidth)
    },
    right: (sbjt, crdt = getWindowAsCoordinator()) => {
        sbjt.style.left = px(crdt.offsetLeft + crdt.offsetWidth)
    },
}

const getWindowAsCoordinator = () => ({
    offsetLeft: 0,
    offsetTop: 0,
    offsetWidth: window.innerWidth,
    offsetHeight: window.innerHeight,
})

const doAlign = (subject, alignment, coordinator) => {
    for (let i = 0; i < alignment.length; ++i) {
        const alignmentFn = alignment[i]
        alignmentFn(subject, coordinator)
    }
}

const setAlignment = (subject, alignment = [], coordinator) => {
    const handleResize = () => doAlign(subject, alignment, coordinator)
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
}

setAlignment(boxOne, [align.center, align.middle])
setAlignment(boxTwo, [align.right, align.bottom], boxOne)

const alignList = [
    [align.left, align.top],

    [align.leftInside, align.top],
    [align.center, align.top],
    [align.rightInside, align.top],

    [align.right, align.top],

    [align.right, align.topInside],
    [align.right, align.middle],
    [align.right, align.bottomInside],

    [align.right, align.bottom],

    [align.rightInside, align.bottom],
    [align.center, align.bottom],
    [align.leftInside, align.bottom],

    [align.left, align.bottom],

    [align.left, align.bottomInside],
    [align.left, align.middle],
    [align.left, align.topInside],

    [align.leftInside, align.topInside],
    [align.center, align.topInside],
    [align.rightInside, align.topInside],
    [align.rightInside, align.middle],
    [align.rightInside, align.bottomInside],
    [align.center, align.bottomInside],
    [align.leftInside, align.bottomInside],
    [align.leftInside, align.middle],
]

let alignListIndex = -1

setInterval(() => {
    doAlign.call(null, boxThree, alignList[(++alignListIndex) % alignList.length], boxTwo)
}, 250)
