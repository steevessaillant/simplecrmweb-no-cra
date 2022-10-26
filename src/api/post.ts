export const post = (state: { id: string; firstName: string; lastName: string; dateOfBirth: string; }) : Promise<Response> => {
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
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    });
}