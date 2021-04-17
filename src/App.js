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

import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    // margin: 0,
    // padding: 0,
  },
  heading: {
    paddingTop: theme.spacing(4),
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
    padding: theme.spacing(1, 2),
  },
  todo: {
    marginTop: theme.spacing(1),
  },
  list: {
    marginTop: theme.spacing(2),
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
  },
}));

const App = () => {
  const classes = useStyles();
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [formVis, setFormVis] = useState(false);

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

        <div>
          <Grid
            container
            display="flex"
            direction="column"
            justify="center"
            spacing={1}
            className={classes.list}
          >
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
                        onClick={(e) =>
                          setList(list.filter((element) => element !== el))
                        }
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
