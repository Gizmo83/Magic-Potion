import React, { useCallback, useEffect, useState } from 'react';

import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';

import MagicPotionImg from './assets/Magic potion image.jpg';
import BillingForm from './components/BillingForm';
import ContactForm from './components/ContactForm';
import OrderForm from './components/OrderForm';
import Notification from './components/Notification';

import { postForm } from './api/api';

const ITEM_COST = 49.99;

const App = () => {
  const [form, setForm] = useState({
    creditCard: '',
    email: '',
    expirationDate: '',
    quantity: '',
    total: 0,
    zipCode: '',
  });
  const [isInvalid, setIsInvalid] = useState({
    creditCard: false,
    email: false,
    expirationDate: false,
    quantity: false,
    zipCode: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationVariat, setNotificationVariant] = useState('success');

  const validationHelper = (key, value, pattern, length) => {
    if (pattern) {
      value && value.match(pattern)
        ? setIsInvalid((prev) => ({ ...prev, [key]: false }))
        : setIsInvalid((prev) => ({ ...prev, [key]: true }));
    }

    if (length !== undefined && length !== null) {
      +value && value.length >= length
        ? setIsInvalid((prev) => ({ ...prev, [key]: false }))
        : setIsInvalid((prev) => ({ ...prev, [key]: true }));
    }
  };

  const validateForm = (form) => {
    for (const [key, value] of Object.entries(form)) {
      switch(key) {
        case 'creditCard':
          validationHelper(key, value, undefined, 14);
          break;
        case 'email':
          const emailRegex =
            /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
            validationHelper(key, value, emailRegex);
          break;
        case 'expirationDate':
          const expirationRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
          validationHelper(key, value, expirationRegex);
          break;
        case 'quantity':
          validationHelper(key, value, undefined, 0);
          break;
        case 'zipCode':
          validationHelper(key, value, undefined, 5);
          break;
        default:
          break;
      }
    }  
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'quantity':
        if (value >= 0 && value < 4) {
          setForm((prev) => ({
            ...prev,
            quantity: value,
            total: value * ITEM_COST,
          }));
          setIsInvalid((prev) => ({ ...prev, [name]: false }));
          setIsSubmit(false);
        }
        break;
      default:
        setForm((prev) => ({ ...prev, [name]: value }));
        setIsInvalid((prev) => ({ ...prev, [name]: false }));
        setIsSubmit(false);
        break;
    }
  };

  const handleButton = (e) => {
    e.preventDefault();
    validateForm(form);
    setIsSubmit(true);
  };

  const handleNotification = (status) => {
    switch (status) {
      case 'error': {
        setNotificationMessage('A user with the same name at this address already exists')
        setNotificationVariant('danger')
        break;
      }
      case 'success': {
        setNotificationMessage('Your order has been placed!')
        setNotificationVariant('success')
        break;
      }
      default:
        break;
    }
    setShowNotification(true);
  };

  const submitForm = useCallback(async () => {
    const payload = {
      email: form.email,
      quantity: +form.quantity,
      total: form.total,
      payment: {
        ccNum: form.creditCard,
        exp: form.expirationDate,
      },
    };
    try {
      const result = await postForm(payload);
      if (result) {
        setIsSubmit(false);
        setForm({
          creditCard: '',
          email: '',
          expirationDate: '',
          quantity: '',
          total: 0,
          zipCode: '',
        });
        handleNotification('success');
        console.log(result);
      }
    } catch (error) {
      setIsSubmit(false);
      handleNotification('error');
      console.log(error);
    }
  }, [form.creditCard, form.email, form.expirationDate, form.quantity, form.total])

  useEffect(() => {
    const isFormValid = Object.values(isInvalid).every(value => value === false);
    if (isSubmit && isFormValid) {
      submitForm();
    }
  }, [isInvalid, isSubmit, submitForm]);

  return (
    <Wrapper>
      <TopRow>
        <TopCol>
          <Title>
            Magic Potion #1
          </Title>
          <Image fluid src={MagicPotionImg} />
        </TopCol>
      </TopRow>
      <Form className='px-2 px-md-0'>
        <OrderForm
          formValues={form}
          handleChange={handleChange}
          isInvalid={isInvalid}
        />
        <Divider />
        <ContactForm
          formValues={form}
          handleChange={handleChange}
          isInvalid={isInvalid}
        />
        <Divider />
        <BillingForm
          formValues={form}
          handleChange={handleChange}
          isInvalid={isInvalid}
        />
        <Divider />
        <Col className='my-5 text-center'>
          <StyledButton
            onClick={handleButton}
            type='button'
            variant='dark'
          >
            PLACE YOUR ORDER
          </StyledButton>
        </Col>
      </Form>
      <Notification
        onClose={setShowNotification}
        showNotification={showNotification}
        message={notificationMessage}
        variant={notificationVariat}
      />
    </Wrapper>
  );
};

const Divider = styled.hr`
  color: #D3D3D3;
  margin-bottom: 40px;
  margin-top: 40px;
  max-width: 616px;
`;

const TopRow = styled(Row)`
  margin-top: 3rem;
  margin-bottom: 3rem;
  @media (max-width: 576px) {
    margin-top: 0px;
    padding: 0px;
  }
`;

const TopCol = styled(Col)`
  position: relative;
  text-align: center;
  color: black;
  @media (max-width: 576px) {
    padding: 0px;
  }
`;

const StyledButton = styled(Button)`
  font-size: 12px;
  height: 56px;
  width: 207px;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 700;
  line-height: 64px;
  @media (max-width: 576px) {
    color: #fff;
    left: 50%;
    margin: 0px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
`;

const Wrapper = styled(Container)`
  max-width: 640px;
`;

export default App;
