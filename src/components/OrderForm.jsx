import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

const OrderForm = ({ formValues, handleChange, isInvalid }) => {
  return (
    <Row>
      <Col>
        <SectionHeader>
          Your Order
        </SectionHeader>
      </Col>
      <RowInputWrapper className='my-3'>
        <Col className='my-2 my-md-0' sm={12} md={6}>
          <NumberInput
            isInvalid={isInvalid.quantity}
            max={3}
            min={0}
            name='quantity'
            onChange={handleChange}
            placeholder='Max 3'
            type='number'
            value={formValues.quantity}
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a quantity (max 3)
          </Form.Control.Feedback>
        </Col>
        <Col className='my-2 my-md-0' sm={12} md={6}>
          <ReadOnlyInput
            readOnly
            type='text'
            value={formValues.total.toFixed(2)}
          />
        </Col>
      </RowInputWrapper>
    </Row>
  )
};

const NumberInput = styled(Form.Control)`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ReadOnlyInput = styled(Form.Control)`
  &.form-control[readonly] {
    background-color: #fff;
  }
`;

const RowInputWrapper = styled(Row)`
  height: 40px;
  @media (max-width: 576px) {
    height: 80px;
  }
`;

const SectionHeader = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
`;

export default OrderForm;