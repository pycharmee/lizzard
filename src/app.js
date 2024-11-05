const $circle  = document.querySelector('#circle');
const $score  = document.querySelector('#score');

function start() {
    setScore(getScore())
    setImage()
}

function setScore(score) {
    localStorage.setItem('score', score)
    $score.textContent = score;
}

function setImage() {
    if (getScore() >= 10) {
        $circle.setAttribute('src', './assets/lizzard.png');
    }
}

function getScore() {
    return Number(localStorage.getItem('score')) ?? 0
}

function addOne() {
    setScore(getScore() +1)
    setImage()
}


$circle.addEventListener('click', (event) => {
    const rect = $circle.getBoundingClientRect()

    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    const DEG = 50

    const tiltX = (offsetY / rect.height) * DEG
    const tiltY = (offsetX / rect.width) * -DEG

    $circle.style.setProperty('--tiltX', tiltX + 'DEG')
    $circle.style.setProperty('--tiltY', tiltY + 'DEG')

    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0DEG`)
        $circle.style.setProperty('--tiltY', `0DEG`)
    }, 300)

    const plusOne = document.createElement('div')
    plusOne.classList.add('plus-one')
    plusOne.textContent = '+1'
    plusOne.style.left = `${event.clientX - rect.left}px`
    plusOne.style.top = `${event.clientY - rect.top}px`

    $circle.parentElement.appendChild(plusOne)

    addOne()

    setTimeout(() =>{
    plusOne.remove()
    }, 2000)
})

start()