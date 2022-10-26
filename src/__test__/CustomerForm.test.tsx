import React from 'react';
import { cleanup,fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CustomerForm } from '../components/CustomerForm'
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import {post} from "../api/post";

//https://reactjs.org/link/wrap-tests-with-act
let container: any;
jest.mock("../api/post")

beforeEach(() => {
  jest.clearAllMocks();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("when loading and interacting with the form", () => {
  it('renders without crashing', async () => {
    // Test first render and componentDidMount
    await act(async () => {
      render(<CustomerForm />,container);
    });
    cleanup();
  });

  it("should display alpha-numeric only error for id",  () => {
    act(() => {
      render(<CustomerForm />,container);
    });

    waitFor(async () => {
      const idInput = await container.findByTestId('id');
      fireEvent.change(idInput, { target: { value: ' ' } }); //just enter a space then blur
      fireEvent.blur(idInput);
    });

    waitFor(() => {
      expect(container).toContain("Id must be alpha-numeric");
    });
    cleanup();
  });

  it("should display alpha only error for names",  () => {
    act(() => {
      render(<CustomerForm />,container);
    });

    waitFor(async () => {
      const firstNameInput = await container.findByTestId('firstName');
      fireEvent.change(firstNameInput, { target: { value: '1' } });
      fireEvent.blur(firstNameInput);

      const lastNameInput = await container.findByTestId('firstName');
      fireEvent.change(lastNameInput, { target: { value: '@' } });
      fireEvent.blur(lastNameInput);
    });

    waitFor(() => {
      expect(container).toContain("name must be alpha");
    });
    cleanup();
  });

  it("should display must be 18 error", () => {
    act(() => {
      render(<CustomerForm />,container);
    });

    waitFor(async () => {
      const dateInput = await container.findByTestId('dateOfBirth');
      if (dateInput !== null)
        fireEvent.change(dateInput, { target: { value: '2222-01-01' } });
      /* fire events that update state */
      const submitButton = await container.findByRole("button", { name: "submit", hidden: true });
      fireEvent.click(submitButton);
    });

    waitFor(() => {
      expect(container).toContain("Must be 18 years of age");
    });
    cleanup();
  });

  it("should post form when data is valid",  () => {

    const fakeValidCustomer = {
      id: 'JestTestId',
      firstName: 'Tester',
      lastName: 'Tested',
      dateOfBirth: '2000-01-01'
    };

    // global.fetch = jest.fn(():any => Promise.resolve({
    //   json: () => new Response(null,{ statusText: 'BAD REQUEST'})
    // }));

     waitFor(async () => {
      const idInput = await container.findByTestId('id');
      fireEvent.change(idInput, {target: {value: fakeValidCustomer.id}}); //just enter a space then blur
      fireEvent.blur(idInput);
      const firstNameInput = await container.findByTestId('firstName');
      fireEvent.change(firstNameInput, {target: {value: fakeValidCustomer.firstName}});
      fireEvent.blur(firstNameInput);

      const lastNameInput = await container.findByTestId('firstName');
      fireEvent.change(lastNameInput, {target: {value: fakeValidCustomer.lastName}});
      fireEvent.blur(lastNameInput);
      const dateInput = await container.findByTestId('dateOfBirth');
      if (dateInput !== null)
        fireEvent.change(dateInput, {target: {value: fakeValidCustomer.dateOfBirth}});
      /* fire events that update state */
      const submitButton = await container.findByRole("button", {name: "submit", hidden: true});
      fireEvent.click(submitButton);
    });
     waitFor(() => {
      expect(screen).toContain("shit");
    });
    cleanup();


  })

});