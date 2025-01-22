import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CategoryModal = (props) => {
   console.log("Modal show state: ", props.show);

   return (
      <Modal
         {...props}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               {props.content.title}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <h5>"{props.content.title}"에 대하여</h5>
            <p>
               {props.content.content}
            </p>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
         </Modal.Footer>
      </Modal>
   )
}

export default CategoryModal