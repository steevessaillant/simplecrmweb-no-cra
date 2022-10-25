import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CustomerForm } from '../components/CustomerForm'
import '@testing-library/jest-dom';


describe("when the button is pressed", () => {

  // beforeEach(() => {
  //??? need to investigate why it does not work , maybe its my ignorance of react...
  // })

  it('renders without crashing', () => {
    render(<CustomerForm />);
  });

  it("should display alpha-numeric only error for id", async () => {
    render(<CustomerForm />);

    waitFor(async () => {
      const idInput = await screen.findByTestId('id');
      fireEvent.change(idInput, { target: { value: ' ' } }); //just enter a space then blur
      fireEvent.blur(idInput);
    });

    waitFor(() => {
      expect(screen).toContain("Id must be alpha-numeric");
    });
  });

  it("should display alpha only error for names", async () => {
    render(<CustomerForm />);

    waitFor(async () => {
      const firstNameInput = await screen.findByTestId('firstName');
      fireEvent.change(firstNameInput, { target: { value: '1' } });
      fireEvent.blur(firstNameInput);

      const lastNameInput = await screen.findByTestId('firstName');
      fireEvent.change(lastNameInput, { target: { value: '@' } });
      fireEvent.blur(lastNameInput);
    });

    waitFor(() => {
      expect(screen).toContain("name must be alpha");
    });

  });

  it("should display must be 18 error", () => {

    waitFor(async () => {
      const dateInput = await screen.findByTestId('dateOfBirth');
      if (dateInput !== null)
        fireEvent.change(dateInput, { target: { value: '2222-01-01' } });
      /* fire events that update state */
      const submitButton = await screen.findByRole("button", { name: "submit", hidden: true });
      fireEvent.click(submitButton);
    });

    waitFor(() => {
      expect(screen).toContain("Must be 18 years of age");
    });

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