import React, { useContext, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Context } from "../index";
import { createPost } from "../http/postAPI";
import { observer } from "mobx-react-lite";

const CreatePost = observer(() => {
  const { post, user } = useContext(Context);
  const [text, setText] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const selectImgFile = (e) => {
    setImgFile(e.target.files[0]);
  };
  const selectVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
  };
  let today = new Date().toLocaleDateString("en-US");

  const addPost = () => {
    const formData = new FormData();
    formData.append("date", today);
    formData.append("text", text);
    formData.append("author", user.user.name);
    formData.append("userId", user.user.id);
    formData.append("img", imgFile);
    formData.append("video", videoFile);
    createPost(formData).then((data) => {
      post.add(data);
      setText("");
      setImgFile("");
      setVideoFile("");
      document.querySelectorAll("input[type=file]")[0].value = "";
      document.querySelectorAll("input[type=file]")[1].value = "";
    });
  };

  return (
    <Container>
      <Form.Group>
        <Form.Control
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-3"
          placeholder="Enter your post"
        />
        <Form.Label className="mt-2 mb-0">Upload Photo</Form.Label>
        <Form.Control type="file" onChange={selectImgFile} />
        <Form.Label className="mt-2 mb-0">Upload video</Form.Label>
        <Form.Control type="file" onChange={selectVideoFile} />
        <hr />
      </Form.Group>
      <Button className="mb-5" variant="outline-success" onClick={addPost}>
        Add post
      </Button>
    </Container>
  );
});

export default CreatePost;
