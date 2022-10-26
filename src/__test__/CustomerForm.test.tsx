import React from 'react';
import { cleanup,fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CustomerForm } from '../components/CustomerForm'
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';



//https://reactjs.org/link/wrap-tests-with-act
let container: any;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("when the button is pressed", () => {

  
  it('renders without crashing', async () => {
    // Test first render and componentDidMount
    await act(async () => {
      render(<CustomerForm />,container);
    });
    cleanup();
  });

  it("should display alpha-numeric only error for id", async () => {
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

  it("should display alpha only error for names", async () => {
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
      render(<CustomerForm />);
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

  // it("should post form when data is valid", () => {
  //   const handleSubmit = jest.fn();
  //   const utils = render(<PasswordDataForm onSubmit={handleSubmit}></PasswordDataForm>);

  //   const passwordInput = utils.container.querySelector("#newPassword");
  //   await wait(() => {
  //     fireEvent.change(passwordInput, { target: { value: "123" } });
  //   });
  //   expect(passwordInput.value).toBe("123");

  //   const updateButton = utils.container.querySelector('button[type="submit"]');
  //   await wait(() => {
  //     fireEvent.click(updateButton);
  //   });
  //   expect(handleSubmit).toHaveBeenCalledWith({ newPassword: "123", passwordConfirm: "123" });
  // })

});