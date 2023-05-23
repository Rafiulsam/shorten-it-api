const loadLink = async searchText => {
    const url = `https://api.shrtco.de/v2/shorten?url=${searchText}`
    if (searchText) {
        const res = await fetch(url)
        const data = await res.json()
        const eyeBtn = document.getElementById('eye-btn')
        const inValidMsg = document.getElementById('invalid-msg')
        if (data.ok === true) {
            displayLink(data)
            eyeBtn.classList.remove('d-none')
            inValidMsg.classList.add('d-none')
        }
        else if(data.ok === false){
             eyeBtn.classList.add('d-none')
            inValidMsg.classList.remove('d-none')
            inValidMsg.innerHTML = `
                <p>${data.error} </p>
            `
        }
    }
    else {
        alert('Please enter a link')
    }
}
// loadLink('')

const searchLink = () => {
    const inputValue = document.getElementById('input-field').value;
    document.getElementById('input-field').value = '';

    loadLink(inputValue)
}

document.getElementById('btn').addEventListener('click', function () {
    searchLink()
})

const displayLink = link => {
    console.log(link);
    document.getElementById('linkModalLabel').innerText = 'Shorten Links'
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
            <div class= 'd-flex justify-content-between'>
            <p>Short link 1: <span id="link1">${link.result.full_short_link
            }</span></p> <a type='button' onclick="copyLink('link1') " class='w-auto'> Copy link </a>
            </div>
            <div class= 'd-flex justify-content-between'>
            <p> Short link 2: <span id="link1">${link.result.full_short_link2
            }</span></p> <a type='button' onclick="copyLink('link2') "class='w-auto'> Copy link </a>
            </div>
            <div class= 'd-flex justify-content-between'>
            <p> Short link 3: <span id="link1">${link.result.full_short_link3
            }</span></p> <a type='button' onclick="copyLink('link3') "class='w-auto'> Copy link </a>
            </div>
    
    `
}

const copyLink = (linkId) => {
    const linkText = document.getElementById(linkId).innerText;
    navigator.clipboard.writeText(linkText).then(() => {
      alert('Link copied to clipboard!');
    });
  };