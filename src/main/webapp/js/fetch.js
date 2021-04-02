/**
 * 
 */
function get(url) {
	return fetch(url, {
		method: 'GET',
	})
}

function post(url, json) {
	return fetch(url, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify(json)
	})
}

function put(url, json) {
	return fetch(url, {
		method: 'PUT',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify(json)
	})
}


function deletar(url) {
	return fetch(url, {
		method: 'DELETE'
	})
}

export { get, post, put, deletar }