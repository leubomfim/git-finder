const clientId = '146ff4326293c7134cb3'
const search = document.querySelector('.search-btn')
  
window.addEventListener('load', () => {
    document.querySelector('.container-loading').style.display = 'none'
    document.querySelector('main').style.display = 'block'
    search.addEventListener('click', callApi)
})

function callApi() {
    const inputUserProfile = document.getElementById('finder')
    const url = `https://api.github.com/users/${inputUserProfile.value}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.message) {
            const small = document.querySelector('small')

            small.classList.add('error-profile')
            inputUserProfile.style.border = '1px solid #ee5252'
            small.innerText = 'User profile not found'
        } else {
            window.location.href = `pages/user.html?user=${inputUserProfile.value}`
        }
    })
    .catch(e => {
        console.log(e)
    })
}