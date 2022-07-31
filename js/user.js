const urlParam = new URLSearchParams(window.location.search)
const userParam = urlParam.get('user')
let url;

window.addEventListener('load', () => {
    document.querySelector('.container-loading').style.display = 'none'
    document.querySelector('section').style.display = 'flex'
    userApi()
    repositoriesApi()
})

function userApi() {
    fetch(`https://api.github.com/users/${userParam}`)
    .then(response => response.json())
    .then(userInfo => {
        url = userInfo.html_url
        createUser(userInfo)
    })
}
function createUser(userInfo) {
    document.querySelector('.user-avatar').src = userInfo.avatar_url
    document.querySelector('.name').innerText = userInfo.name
    document.querySelector('.username').innerText = `@${userInfo.login}`
    document.querySelector('.bio').innerText = userInfo.bio
    document.querySelector('.followers').innerText = `${userInfo.followers} follower${userInfo.followers <= 1 ? "" : "s"}`
    document.querySelector('.following').innerText = `${userInfo.following} following`
}

function goToProfile() {
    window.location = url
}

function repositoriesApi() {
    fetch(`https://api.github.com/users/${userParam}/repos`)
    .then(response => response.json())
    .then(repos => {
        repos.forEach(el => {
            const repositories = document.querySelector('.repositories')
            const repositoriesBox = document.createElement('div')
            const btnDetails = document.createElement('button')
            
            repositories.classList.add('repositories-box')
            repositoriesBox.classList.add('box')
            btnDetails.classList.add('btn-details')

            btnDetails.innerText = 'See more'
            console.log(el)

            repositoriesBox.innerHTML = 
            `
                <div class="repositories-infos">
                    <a href="${el.html_url}" class="name-repos">${el.name}</a>
                    <p class="description-repos">${el.description !== null ? el.description : ""}</p>
                </div>
                <div class="visibility-repos"><p>${el.visibility}</p></div>
                <p class="language">${el.language !== null ? el.language : ""}</p>
            `

            btnDetails.addEventListener('click', () => {
                modalDetails(el.name)
            })
            
            repositoriesBox.appendChild(btnDetails)
            repositories.appendChild(repositoriesBox)
        })

    })
}

function modalDetails(names) {
    document.querySelector('.modal-container').style.display = 'flex'
    document.body.style.overflow = 'hidden'

    fetch(`https://api.github.com/users/${userParam}/repos`)
    .then(response => response.json())
    .then(reposInfo => {
        reposInfo.find(el => {
            if(el.name === names) {
                document.querySelector('.repository-name').innerHTML = `Name: <span class="span-name">${el.name}</span>`
                document.querySelector('.repository-description').innerHTML = `Description: <span>${el.description !== null ? el.description : '-'}</span>`
                document.querySelector('.repository-language').innerHTML = `Language: <span>${el.language !== null ? el.language : "-"}</span>`
                document.querySelector('.repository-watchers').innerHTML = `Watchers: <span>${el.watchers}</span>`
                document.querySelector('.repository-stars').innerHTML = `Stars: <span>${el.stargazers_count}</span>`
            }
        })
    })
}

document.querySelector('.close-modal').addEventListener('click', () => {
    document.querySelector('.modal-container').style.display = 'none'
    document.body.style.overflow = 'auto'
})

document.querySelector('.back').addEventListener('click', () => {
    window.location = '../index.html'
})


document.querySelector('.go-profile').addEventListener('click', goToProfile)