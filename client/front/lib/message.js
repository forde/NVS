const appendMessage = (className='', text='', onStage=3000) => {

    const message = document.createElement('div')
    message.classList.add('ft-message')
    message.classList.add(className)

    const container = document.createElement('div')
    container.classList.add('ft-container')
    container.classList.add('ft-message-inner')
    container.innerHTML = text

    message.appendChild(container)
    document.body.appendChild(message)

    setTimeout(() => {
        message.classList.add('ft-visible')
        setTimeout(() => {
            message.classList.remove('ft-visible')
            setTimeout(() => {
                document.body.removeChild(message)
            }, 500)
        }, onStage)
    }, 100)
}

export function success(message) {
    appendMessage('ft-success', message)
}

export function error(message) {
    appendMessage('ft-error', message)
}