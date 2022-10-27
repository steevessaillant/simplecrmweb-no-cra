import React from 'react';
import {cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {CustomerForm} from '../components/CustomerForm'
import '@testing-library/jest-dom';
import {act} from 'react-dom/test-utils';


//https://reactjs.org/link/wrap-tests-with-act


jest.mock('../api/post', () => ({
    postToServer: jest.fn().mockReturnValue(Promise.resolve([])),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

afterEach(() => {
    cleanup();
});

describe('should render the component with its heading title', () => {

    it('renders with title', async () => {
        const expected = "Customer Edit Form";

        render(<CustomerForm/>);
        const formTitle = await screen.findByRole("heading");

        expect(formTitle).toBeDefined()
        expect(formTitle.textContent).toEqual(expected);
    });
})

describe("when loading and interacting with the form", () => {

    it("should display alpha-numeric only error for id", async () => {

        const expected = "Id must be alpha-numeric";

        render(<CustomerForm/>);

        const idInput = await screen.findByTestId('id');
        fireEvent.change(idInput, {target: {value: ' '}}); //just enter a space then blur
        fireEvent.blur(idInput);

        const idErrorLabel = await screen.findByTestId('errorForId');

        expect(idErrorLabel.textContent).toEqual(expected);


    });

    it("should display alpha only error for first name", async () => {

        const expected = "First name must be alpha";

        render(<CustomerForm/>);

        const firstNameInput = await screen.findByTestId('firstName');
        fireEvent.change(firstNameInput, {target: {value: '1test'}});
        fireEvent.blur(firstNameInput);

        const errorForFirstNameLabel = await screen.findByTestId('errorForFirstName');

        expect(errorForFirstNameLabel.textContent).toContain(expected);
    });

    it("should display alpha only error for last name", async () => {

        const expected = "Last name must be alpha";

        render(<CustomerForm/>);

        const lastNameInput = await screen.findByTestId('lastName');
        fireEvent.change(lastNameInput, {target: {value: '1test'}});
        fireEvent.blur(lastNameInput);

        const errorForLastNameLabel = await screen.findByTestId('errorForLastName');

        expect(errorForLastNameLabel.textContent).toContain(expected);
    });

    it("should display must be 18 years of age error", async () => {

        const expected = "Must be 18 years of age";

        render(<CustomerForm/>);

        const dateInput = await screen.findByTestId('dateOfBirth');
        fireEvent.change(dateInput, {target: {value: '2222-01-01'}});
        fireEvent.blur(dateInput);

        const errorForDateOfBirthLabel = await screen.findByTestId('errorForDateOfBirth');

        expect(errorForDateOfBirthLabel.textContent).toContain(expected);
    });


    // it("should display must be 18 error", () => {
    //     act(() => {
    //         render(<CustomerForm/>);
    //     });
    //
    //     waitFor(async () => {
    //         const dateInput = await screen.findByTestId('dateOfBirth');
    //         if (dateInput !== null)
    //             fireEvent.change(dateInput, {target: {value: '2222-01-01'}});
    //         /* fire events that update state */
    //         const submitButton = await screen.findByRole("button", {name: "submit", hidden: true});
    //         fireEvent.click(submitButton);
    //     });
    //
    //     waitFor(() => {
    //         expect(screen).toContain("Must be 20 years of age");
    //     });
    //     cleanup();
    // });
    //
    // it("should post form when data is valid", () => {
    //
    //     act(() => {
    //         render(<CustomerForm/>);
    //     });
    //
    //     const fakeValidCustomer = {
    //         id: 'JestTestId',
    //         firstName: 'Tester',
    //         lastName: 'Tested',
    //         dateOfBirth: '2000-01-01'
    //     };
    //
    //
    //     waitFor(async () => {
    //         const idInput = await screen.findByTestId('id');
    //         fireEvent.change(idInput, {target: {value: fakeValidCustomer.id}}); //just enter a space then blur
    //         fireEvent.blur(idInput);
    //         const firstNameInput = await screen.findByTestId('firstName');
    //         fireEvent.change(firstNameInput, {target: {value: fakeValidCustomer.firstName}});
    //         fireEvent.blur(firstNameInput);
    //
    //         const lastNameInput = await screen.findByTestId('firstName');
    //         fireEvent.change(lastNameInput, {target: {value: fakeValidCustomer.lastName}});
    //         fireEvent.blur(lastNameInput);
    //         const dateInput = await screen.findByTestId('dateOfBirth');
    //         if (dateInput !== null)
    //             fireEvent.change(dateInput, {target: {value: fakeValidCustomer.dateOfBirth}});
    //         /* fire events that update state */
    //         const submitButton = await screen.findByRole("button", {name: "submit", hidden: true});
    //         fireEvent.click(submitButton);
    //         expect(screen).toContain("shit")
    //     });
    //     waitFor(() => {
    //         expect(screen).toContain("shit");
    //     });
    //     cleanup();
    //
    //
    // })

});