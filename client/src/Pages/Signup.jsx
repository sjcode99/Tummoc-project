import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backend_url } from "./BackendURL";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const initialState = {
  name: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // console.log(formData);
  const onSubmit = async (e) => {
    let { name, password } = formData;
    e.preventDefault();
    if (name == "" || password == "") {
      toast({
        title: `Please Fill * required Field`,
        status: "info",
        isClosable: true,
      });
      return;
    }

    try {
      let res = await fetch(`${backend_url}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      res = await res.json();
      if (res) {
        if (res.msg === "Registered Successfully") {
          toast({
            title: `${res.msg}`,
            status: "success",
            isClosable: true,
          });
          navigate("/login");
        } else if (res.msg === "Registation failed") {
          toast({
            title: `${res.msg}`,
            status: "error",
            isClosable: true,
          });
        }
      }

      setFormData({
        name: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { name, password } = formData;
  return (
    <Box textAlign={"center"}>
      <Heading mb="10px" fontSize={["22px", "22px", "26px"]} p="20px">
        Sign up
      </Heading>
      <Container>
        <form onSubmit={onSubmit}>
          <Box className="input-icons">
            <i className="fa fa-user icon"></i>
            <Input
              className="input-field"
              w="300px"
              type={"text"}
              placeholder="Enter Username*"
              value={name}
              name="name"
              onChange={handleChange}
            />
          </Box>
          <Box
            className="input-icons"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <InputGroup size="md" w="300px">
              <i className="fa fa-key icon"></i>
              <Input
                className="input-field"
                value={password}
                name="password"
                type={show ? "text" : "password"}
                placeholder="Enter Password*"
                onChange={handleChange}
                color="pink.700"
              />
              <InputRightElement >
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  color="pink.700"
                >
                  {show ? <VscEyeClosed /> : <VscEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Input
            w="300px"
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "10px",
            }}
            type={"submit"}
            value="Sign up"
          />
        </form>
      </Container>
      <p style={{margin: "30px"}}>
        Already a member?{" "}
        <Link style={{ textDecoration: "none", color: "green" }} to={"/login"}>
          Login
        </Link>
      </p>
    </Box>
  );
};

export default Signup;
