import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import { Context } from "..";
import { fetchPosts, deletePost } from "../http/postAPI";
import EditPost from "../components/EditPost";

const Posts = observer(() => {
  const { post, user } = useContext(Context);

  const removePost = (item) => {
    deletePost(item.id);
    post.setPosts(post.posts.filter((p) => p.id !== item.id));
  };

  useEffect(() => {
    fetchPosts().then((data) => post.setPosts(data));
  }, []);

  return (
    <Container>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Post</th>
            <th>Author</th>
            <th>Image</th>
            <th>Video</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {post.posts.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.text}</td>
              <td>{item.author}</td>
              <td>
                {item.img && (
                  <Image
                    width={100}
                    height={100}
                    src={process.env.REACT_APP_API_URL + item.img}
                  />
                )}
              </td>
              <td>
                {item.video && (
                  <div className="embed-responsive embed-responsive-4by3">
                    <iframe
                      title="myFrame"
                      className="embed-responsive-item"
                      src={process.env.REACT_APP_API_URL + item.video}
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </td>
              <td>
                <div
                  className={
                    item.userId === user.user.id
                      ? "d-flex justify-content-end"
                      : "d-none"
                  }
                >
                  <EditPost post={item} />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => removePost(item)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
});
export default Posts;
