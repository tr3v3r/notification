const tipsData = [
    'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    'eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat ',
    'qui officia deserunt mollitia animi, id est laborum et dolorum fuga',
    'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates',
    'earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias',
    'numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem',
    'culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
]

const wrapper = document.querySelector('.notification-wrapper')
const tipsContainer = document.querySelector('.tips')
const dotsContainer = document.querySelector('ul')
const checkbox = document.querySelector('#checkbox')

const maxIndex = tipsData.length - 1
let currentIndex = 0;
let timer;

function updateTipsContainer() {
    tipsContainer.innerHTML = tipsData[currentIndex]
}

function renderDots() {
    dotsContainer.innerHTML = ''

    tipsData.forEach((tips, index) => {
        dotsContainer.innerHTML += `
                    <li>
                        <span class="dot ${index === currentIndex ? "active-dot" : '' }">&#11050;</span>
                    </li>
                    `
    })
}

function hideTip() {
    wrapper.style.display = "none" 
    clearTimeout(timer)

}

function dicrementIndex() {
    currentIndex = currentIndex - 1
    if(currentIndex < 0) {
        currentIndex = maxIndex
    }
}

function incrementIndex() {
    currentIndex = currentIndex + 1
    
    if(currentIndex > maxIndex) {
        currentIndex = 0
    }
}


wrapper.addEventListener('click', event => {
    if(event.target.classList.contains('close-button')) {
        hideTip()
    }

    if(event.target.classList.contains('arrow')) {

        if(event.target.classList.contains('left-arrow'))  {
           dicrementIndex()
        }
    
        if(event.target.classList.contains('right-arrow')) {
          incrementIndex()
        }
        clearTimeout(timer)
        updateTipsContainer()
        renderDots()

    }    
})


document.addEventListener('keydown', event => {
    switch(event.keyCode) {
        case 37: {
            dicrementIndex()
            updateTipsContainer()
            renderDots()
            break;
        }
        case 39: {
            incrementIndex()
            updateTipsContainer()
            renderDots()
            break;
        }
        case 27: {
            hideTip()
        }
        default: return
    }


   
})

checkbox.addEventListener('change', event => {
   localStorage.setItem('checked', String(event.target.checked))
})

addEventListener('load', () => {
    if(localStorage.getItem('checked') === 'true') {
        hideTip()      
    } else {
        updateTipsContainer()
        renderDots()
        timer = setTimeout(hideTip, 5000)
    }    
})





