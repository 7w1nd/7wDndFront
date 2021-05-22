export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url): Promise<any> {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body): Promise<{ status: number, created: any[], exists: any[] }> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function _delete(url) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response): Promise<any> {
    return response.json().then(resp => {
        const data = resp;
        if (!response.ok) {
            const error = data?.message || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}