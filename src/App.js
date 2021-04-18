import react, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CssBaseline,
  TextField,
  Button,
  IconButton,
  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ButtonAppBar from "./Navbar";
import free from "./assets/free.svg";

import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    // margin: 0,
    padding: 0,
  },
  heading: {
    paddingTop: theme.spacing(4),
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1, 3),
    padding: theme.spacing(1, 2),
  },
  todo: {
    marginTop: theme.spacing(1),
  },
  list: {
    paddingTop: theme.spacing(2),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  show: {
    display: "block",
  },
  hide: {
    display: "none",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    flexDirection: "row",
    paddingTop: theme.spacing(4),
    padding: theme.spacing(1.5),
  },
  img: {
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing("20%", 2),
      paddingBottom: theme.spacing(2),
    },
    padding: theme.spacing("50%", 2),
    paddingBottom: theme.spacing(2),
  },
  imgText: {
    [theme.breakpoints.up("md")]: {
      fontSize: "24px",
    },
  },
  deleteBtn: {
    fontWeight: "bold",
    width: theme.spacing(16),
    margin: theme.spacing(1, 3),
  },
}));

const App = () => {
  const classes = useStyles();
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [formVis, setFormVis] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("list");
    if (data) {
      setList(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <CssBaseline />
      <ButtonAppBar />
      <Container maxWidth="sm" className={classes.container}>
        {/* <Typography variant="h4" className={classes.heading}>
          Your tasks
        </Typography> */}

        <Fade big>
          <div className={formVis ? classes.show : classes.hide}>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Your task here"
                style={{ width: "100%" }}
                variant="outlined"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  setList([...list, todo]);

                  setFormVis(formVis ? false : true);
                  setTodo("");
                }}
              >
                Add
              </Button>
            </form>
          </div>
        </Fade>

        {list.length === 0 ? (
          <div>
            <Container maxWidth="sm" className={classes.imgContainer}>
              <img src={free} width="100%" className={classes.img} />
              <Typography
                align="center"
                variant="subtitle1"
                className={classes.imgText}
              >
                Yay! You have no new tasks. Click the add button to add a new
                task.
              </Typography>
            </Container>
          </div>
        ) : (
          ""
        )}

        <div>
          <Grid
            container
            display="flex"
            direction="column"
            justify="center"
            spacing={1}
            className={classes.list}
          >
            {list.length !== 0 ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.deleteBtn}
                  onClick={() => setList([])}
                >
                  Remove all
                </Button>
              </div>
            ) : (
              ""
            )}

            {list.map((el, key) => (
              <Fade bottom>
                <Grid item key={key}>
                  <Paper elevation={1} className={classes.card}>
                    <Typography variant="h6" className={classes.todo}>
                      {el}
                    </Typography>
                    <div>
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => {
                          setList(list.filter((element) => element !== el));
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </div>
                  </Paper>
                </Grid>
              </Fade>
            ))}
          </Grid>
        </div>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={() => setFormVis(formVis ? false : true)}
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
};

export default App;
