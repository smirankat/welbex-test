import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updatePost } from "../http/postAPI";

const EditPost = ({ post }) => {
  const [show, setShow] = useState(false);
  const [editText, setEditText] = useState(post.text);

  const handleEdit = () => {
    post.text = editText;
    updatePost(post);
    setEditText(post.text);
    setShow(false);
  };
  const handleClose = () => {
    setEditText(post.text);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-success" onClick={handleShow} className="me-2">
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter your post"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outline-success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPost;
