import React from "react";
import { Modal, Button } from "semantic-ui-react";

const DialogModal = (props) => {
  const {
    title,
    message,
    handleConfirm,
    handleCancel,
    showModal,
    handleModalClose,
  } = props;

  return (
    <Modal size="mini" open={showModal} onClose={handleModalClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <p>{message}</p>
      </Modal.Content>
      <Modal.Actions>
        {handleCancel && (
          <Button negative onClick={handleCancel}>
            No
          </Button>
        )}
        {handleConfirm && (
          <Button positive onClick={handleConfirm}>
            Ok
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
};

export default DialogModal;
