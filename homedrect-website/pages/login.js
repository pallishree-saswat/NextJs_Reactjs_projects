import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Link from "next/link";
import { useRouter } from "next/router";


const Login = () => {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

 
  const [email, setEmail] = useState("pallishreeb@thecloudriders.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const Router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({ name, email, password });
    try {
        setLoading(true);
        const { data } = await axios.post(`http://localhost:8000/api/user/login`, {
 
          email,
          password,

        });
        Router.push('/home')
        toast(data.message);
        setLoading(false);
      } catch (err) {
        toast(err.response.data);
        setLoading(false);
      }
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Signup</Button>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open}>
        {/* <DialogTitle>Optional sizes</DialogTitle> */}
        <DialogContent>
          <Box
            noValidate
            component="form"
            md={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <div class="modal-body veri_fication">
              <div class="phon_verifi1">
                <h2>
                  Enter your details to <br />
                  Register
                </h2>
                <form>
              
                  <div class="pl4s">
                    <p>Enter Your Email</p>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
              
                  <div class="pl4s">
                    <p>Enter Your Password</p>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-key"></i>
                    </span>
                  </div>
            
                  <div class="pl4s">
                    <button onClick={handleSubmit} class="submitBtn">Login </button>
                  </div>
                </form>
                <Link href="/signup">Dont have an account? Register here</Link>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
