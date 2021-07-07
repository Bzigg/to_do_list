let notes = [
    {
        'title': 'Миша Петров',
        'discription': 'image/photo/ava01.jpg',
        'date': '2000-05-01',
    },

    {
        'title': 'Маша Иванова',
        'discription': 'image/photo/ava02.jpg',
        'date': '2001-02-08',
    },
];

let strNotes = JSON.stringify(notes);

let user = new User();
user.getData();

function queryNotes() {

    let notesPromise = new Promise(function (resolve) {
        fetch('http://localhost/projects/to_do_list/backend/app.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `getDataNotes=last10`
        })
            .then(function (data) {
                resolve(data.text());
            })
    });

    Promise.all([notesPromise]).then(value => {

        notes = JSON.parse(value[0]);


    });

}

queryNotes();
