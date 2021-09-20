const insertForm = document.querySelector('#insert');
const namesList = document.querySelector('#names');
const viewsText = document.querySelector('#views');

insertForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const name = insertForm.querySelector('input').value;

    const res = await fetch('/insert/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({name}) // body data type must match "Content-Type" header
    });

    const data = await res.json();

    console.log(data);

    await FillNamesList();
});

async function FillNamesList () {
    namesList.innerHTML = '';

    const res = await fetch('/select/');

    const data = await res.json();

    data.forEach(item => {
        namesList.innerHTML += `<li>${item.name}</li>`
    })
}


(async _ => {
    await FillNamesList();
    const views = await (await fetch('/getviews/')).json();
    viewsText.innerHTML = `Views: ${views.views}`;
})();