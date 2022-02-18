import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

const ContactForm = ({ formValues, handleChange, isInvalid }) => {
  return (
    <Wrapper>
      <Col>
        <SectionHeader>
          Contact
        </SectionHeader>
      </Col>
      <RowInputWrapper className='my-3'>
        <Col className='px-0'>
          <Form.Control
            isInvalid={isInvalid.email}
            name='email'
            onChange={handleChange}
            placeholder='E-mail'
            type='email'
            value={formValues.email}
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a valid e-mail
          </Form.Control.Feedback>
        </Col>
      </RowInputWrapper>
    </Wrapper>
  )
};

const RowInputWrapper = styled(Row)`
  height: 40px;
`;

const SectionHeader = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
`;

const Wrapper = styled(Row)`
  justify-content: center;
`;

export default ContactForm;