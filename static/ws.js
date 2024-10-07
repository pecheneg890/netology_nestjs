const socket = io.connect('http://localhost:3000');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAllComments() {
	const bookId = document.getElementById('bookId').value;

	socket.emit('getAllComments', { bookId: bookId }, (answer) => {
		console.log(answer);
		let table = '<table border=1><tr><th>Комментарий</th></tr>';

		JSON.parse(answer).map((el) => (table = table + '<tr><td>' + el.comment + '</td></tr>'));

		document.getElementById('commentOut').innerHTML = table;
	});
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function addComment() {
	const bookId = document.getElementById('bookId').value;
	const comment = document.getElementById('comment').value;

	socket.emit('addComment', { bookId: bookId, comment: comment }, (answer) => {
		window.alert(answer);
	});
}
