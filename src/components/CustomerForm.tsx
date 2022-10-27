import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import moment from "moment";
import { FormLabel } from 'react-bootstrap';
import {postToServer} from "../api/post";



export const CustomerForm = () => {

  function validateId(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/[^\W_]$/i.test(value)) {
      error = 'Id must be alpha-numeric';
    }
    return error;
  }
  function validateName(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    }
    else if (!/^[a-z]+$/i.test(value)) {
      error = 'First name must be alpha';
    }
    return error;
  }
  function validateLName(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    }
    else if (!/^[a-z]+$/i.test(value)) {
      error = 'Last name must be alpha';
    }
    return error;
  }
  function validateDateOfBirth(value: moment.MomentInput) {
    let error: string;
    const yearsAgo = moment().diff(value, 'years', true); //with precision = true like 17.95 would not be 18
    const minimumAge = 18;
    if (!value) {
      error = 'Required';
      return error;
    }
    yearsAgo < minimumAge ? error = "Must be 18 years of age" : error = "";
    return error;
  }

  return (<div>
        <h1>Customer Edit Form</h1>
        <Formik
            initialValues={{
              id: '',
              firstName: '',
              lastName: '',
              dateOfBirth: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.id !== '' && values.firstName !== ''
                  && values.lastName !== '' && values.dateOfBirth !== '') {
                postToServer(values).then(response => {
                  if(response.ok){
                    //setResult(response.statusText);
                    setSubmitting(true);
                  }else{
                    setSubmitting(false);
                  }
                });
              }
            }}
        >
          {({isSubmitting}) => (
              <Form data-testid="form">
                <FormLabel>Id</FormLabel>
                <Field name="id" data-testid="id" validate={validateId}/>
                <ErrorMessage data-testid="errorForId" name='id' component='div'/>
                <br/>
                <FormLabel>First Name</FormLabel>
                <Field name="firstName" data-testid="firstName" validate={validateName}/>
                <ErrorMessage data-testid="errorForFirstName" name='firstName' component='div'/>
                <br/>
                <FormLabel>Last Name</FormLabel>
                <Field name="lastName" data-testid="lastName" validate={validateLName}/>
                <ErrorMessage data-testid="errorForLastName" name='lastName' component='div'/>
                <br/>
                <FormLabel>Date Of Birth</FormLabel>
                <Field type="date" id="dateOfBirth" name="dateOfBirth" data-testid="dateOfBirth"
                       validate={validateDateOfBirth}/>
                <ErrorMessage data-testid="errorForDateOfBirth" name='dateOfBirth' component='div'/>
                <br/>
                <button type="submit" name="submit" data-testid="submit" disabled={isSubmitting}>Create / Update Customer</button>

              </Form>
          )}
        </Formik>
      </div>
  )
}