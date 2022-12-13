function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';


    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;


    if (prompt == '') {
        alert('Please add some text')
        return
    }

    generateImageRequest(prompt, size)
}
async function generateImageRequest(prompt, size) {
    try {
        showSpinner();

        const response = await fetch('https://generate-image-using-opanai.vercel.app/openai/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        })

        if (!response.ok) {
            removeSpinner()
            throw new Error('Resim generate edilemedi')
        }
        const data = await response.json()
        console.log(data);
        const imageUrl = data.image_url;
        document.querySelector('#image').src = imageUrl
        removeSpinner()
    } catch (err) {
        document.querySelector('.msg').textContent = err
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}
document.querySelector('#image-form').addEventListener('submit', onSubmit)