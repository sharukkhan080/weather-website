const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#messsage-1')
const msg2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading...';
    msg2.textContent = ''
    fetch('http://localhost:3000/weather?adress=' + location).then((res) => {
    res.json().then((data) => {
        if(data.error){
            msg1.textContent = data.error

            console.log()
        }
        else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)

        }
    })
})
})