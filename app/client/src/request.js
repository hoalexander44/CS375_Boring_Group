let baseurl = `http://${process.env['REACT_APP_SERVER_HOST']}:${process.env['REACT_APP_SERVER_PORT']}`;

function is2xx(status) {
    return status.startsWith("2");
}

async function post(component, endpoint, data) {
    console.log(`Sending POST to ${baseurl}${endpoint} with payload ${JSON.stringify(data)}`);
    return await fetch(`${baseurl}${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
}

async function get(component, endpoint) {
    console.log(`Sending GET to ${baseurl}${endpoint}`);
    return await fetch(`${baseurl}${endpoint}`);
}

export { post, get };
