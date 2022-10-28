import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {CustomerForm} from '../components/CustomerForm'
import '@testing-library/jest-dom';
import {postToServer} from '../api/post';
jest.mock('../api/post');


// here the whole foo var is mocked deeply
//const mockedPostToServer = jest.mocked(postToServer);

beforeEach(() => {
    jest.clearAllMocks();
});

afterEach(() => {
    cleanup();
});

describe('should render the component with its heading title', () => {

    it('renders with title', async () => {
        const expected = "Customer Edit Form";

        const { findByRole } = render(<CustomerForm/>);
        const formTitle = await findByRole("heading");

        expect(formTitle).toBeDefined()
        expect(formTitle.textContent).toEqual(expected);
    });
})

describe("when loading and interacting with the form", () => {

    it("should display alpha-numeric only error for id", async () => {

        const expected = "Id must be alpha-numeric";

        const { findByTestId } = render(<CustomerForm/>);

        const idInput = await findByTestId('id');
        fireEvent.change(idInput, {target: {value: ' '}}); //just enter a space then blur
        fireEvent.blur(idInput);

        const idErrorLabel = await findByTestId('errorForId');

        expect(idErrorLabel.textContent).toEqual(expected);


    });

    it("should display alpha only error for first name", async () => {

        const expected = "First name must be alpha";

        const { findByTestId } = render(<CustomerForm/>);

        const firstNameInput = await findByTestId('firstName');
        fireEvent.change(firstNameInput, {target: {value: '1test'}});
        fireEvent.blur(firstNameInput);

        const errorForFirstNameLabel = await findByTestId('errorForFirstName');

        expect(errorForFirstNameLabel.textContent).toContain(expected);
    });

    it("should display alpha only error for last name", async () => {

        const expected = "Last name must be alpha";

        const { findByTestId } = render(<CustomerForm/>);

        const lastNameInput = await findByTestId('lastName');
        fireEvent.change(lastNameInput, {target: {value: '1test'}});
        fireEvent.blur(lastNameInput);

        const errorForLastNameLabel = await findByTestId('errorForLastName');

        expect(errorForLastNameLabel.textContent).toContain(expected);
    });

    it("should display must be 18 years of age error", async () => {

        const expected = "Must be 18 years of age";

        const { findByTestId } = render(<CustomerForm/>);

        const dateInput = await findByTestId('dateOfBirth');
        fireEvent.change(dateInput, {target: {value: '2222-01-01'}});
        fireEvent.blur(dateInput);

        const errorForDateOfBirthLabel = await screen.findByTestId('errorForDateOfBirth');

        expect(errorForDateOfBirthLabel.textContent).toContain(expected);
    });


    it("should post form when data is valid", async () => {
        const fakeValidCustomer = {
            id: 'JestTestId',
            firstName: 'Tester',
            lastName: 'Tested',
            dateOfBirth: '2000-01-01'
        };

        const { findByTestId } = render(<CustomerForm/>);

        const idInput = await findByTestId('id');
        fireEvent.change(idInput, {target: {value: fakeValidCustomer.id}}); //just enter a space then blur

        const firstNameInput = await findByTestId('firstName');
        fireEvent.change(firstNameInput, {target: {value: fakeValidCustomer.firstName}});


        const lastNameInput = await findByTestId('firstName');
        fireEvent.change(lastNameInput, {target: {value: fakeValidCustomer.lastName}});

        const dateInput = await findByTestId('dateOfBirth');
        fireEvent.change(dateInput, {target: {value: fakeValidCustomer.dateOfBirth}});

        const submitButton = await findByTestId('submit');


        fireEvent.click(submitButton);
        //mockedPostToServer.postToServer(fakeValidCustomer)

        expect(submitButton).toBeDisabled();

        //expect(jest.mocked(postToServer).mock.calls).toHaveLength(1);

    })

})
;