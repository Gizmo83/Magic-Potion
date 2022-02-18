import React from 'react';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import styled from 'styled-components';

const Notification = ({ onClose, showNotification, variant, message }) => {
  return (
    <ToastContainer position='bottom-end'>
      <Toast
        autohide={true}
        bg={variant}
        className='m-5'
        delay={3000}
        onClose={() => onClose(false)}
        show={showNotification}
      >
        <StyledToastBody>
          {message}
        </StyledToastBody>
      </Toast>
    </ToastContainer>
  );
};

const StyledToastBody = styled(Toast.Body)`
  color: #fff;
`;

export default Notification;
