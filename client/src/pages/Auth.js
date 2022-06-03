import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(name, email, password);
      } else {
        data = await registration(name, email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(POSTS_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Not have account?&nbsp;
                <NavLink to={REGISTRATION_ROUTE}>Sign up</NavLink>
              </div>
            ) : (
              <div>
                Have account?&nbsp;
                <NavLink to={LOGIN_ROUTE}>Sign in</NavLink>
              </div>
            )}
            <Button variant="outline-success" onClick={click}>
              {isLogin ? "Enter" : "Sign up"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
