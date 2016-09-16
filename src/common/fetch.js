import handleErr from './error-handler'

const jsonHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export default class Fetch {
    static get (url) {
        return Fetch.connect(url, { credentials: 'include' })
    }

    static post(url, data) {
        return Fetch.connect(
                url,
                {
                    method: 'post',
                    credentials: 'include',
                    headers: jsonHeader,
                    body: JSON.stringify(data)
                }
            )
    }

    //add default error handler
    static connect (url, body) {
        return fetch(url, body).then(response => response.json(), handleErr)
    }
}
