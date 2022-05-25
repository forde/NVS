const appendMessage = (className='', text='', onStage=3000) => {

    const message = document.createElement('div')
    message.classList.add('message')
    message.classList.add(className)

    const container = document.createElement('div')
    container.classList.add('container')
    container.classList.add('message-inner')
    container.innerHTML = text

    message.appendChild(container)
    document.body.appendChild(message)

    setTimeout(() => {
        message.classList.add('visible')
        setTimeout(() => {
            message.classList.remove('visible')
            setTimeout(() => {
                document.body.removeChild(message)
            }, 500)
        }, onStage)
    }, 100)
}

export function success(message) {
    appendMessage('success', message)
}

export function error(message) {
    appendMessage('error', message)
}