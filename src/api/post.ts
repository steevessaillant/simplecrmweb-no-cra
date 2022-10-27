export function postToServer(state: { id: string, firstName: string, lastName: string, dateOfBirth: string }) {
    return fetch("http://localhost:5000/api/CRMCustomer", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: state.id,
            firstName: state.firstName,
            lastName: state.lastName,
            dateOfBirth: state.dateOfBirth
        })
    }).then(
        (postsResponse) => {
            if (postsResponse.ok) {
                console.log('yesy');
                return postsResponse;
            }
            return Promise.reject();
        },
    );
}


