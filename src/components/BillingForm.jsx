import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

const BillingForm = ({ formValues, handleChange, isInvalid }) => {
  return (
    <Wrapper>
      <Col>
        <SectionHeader>
          Billing Information
        </SectionHeader>
      </Col>
      <Row className='my-3' style={{ height: '40px' }}>
        <Col className='px-0'>
          <NumberInput
            isInvalid={isInvalid.creditCard}
            name='creditCard'
            onChange={handleChange}
            placeholder='Credit Card Number'
            type='number'
            value={formValues.creditCard}
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a valid credit card number
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className='my-3' style={{ height: '40px' }}>
        <Col className='ps-0 pe-2'>
          <Form.Control
            isInvalid={isInvalid.expirationDate}
            name='expirationDate'
            onChange={handleChange}
            placeholder='mm/yy'
            required
            type='text'
            value={formValues.expirationDate}
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a valid expiration mm/yy
          </Form.Control.Feedback>
        </Col>
        <Col className='ps-2 pe-0'>
          <NumberInput
            isInvalid={isInvalid.zipCode}
            name='zipCode'
            onChange={handleChange}
            placeholder='Zip Code'
            required
            type='number'
            value={formValues.zipCode}
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a valid zip code
          </Form.Control.Feedback>
        </Col>
      </Row>
    </Wrapper>
  )
};

const NumberInput = styled(Form.Control)`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SectionHeader = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
`;

const Wrapper = styled(Row)`
  justify-content: center;
`;

export default BillingForm;