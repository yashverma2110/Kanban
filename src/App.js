import { MuiThemeProvider, Snackbar } from "@material-ui/core";
import { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./shared/layout/Header";
import { Enter } from "./modules/auth";
import { Dashboard } from "./modules/dashboard";
import { isAuthenticated } from "./utils/common";
import theme from "./assets/theme/theme";
import themeImg from "./assets/theme2.webp";
import { Board } from "./modules/board";
import { Alert } from "@material-ui/lab";
import messages from "./utils/messages.json";
import { Loader } from "./shared/components/Loader";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [info, setInfo] = useState(null);

  return (
    <MuiThemeProvider theme={theme}>
      <img src={themeImg} alt="theme" id="bkg-theme" />
      <Router basename="/">
        <Header
          loggedIn={loggedIn}
          toggleSnackbar={setInfo}
          setLoggedIn={setLoggedIn}
        />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact>
              <Enter setLoggedIn={setLoggedIn} toggleSnackbar={setInfo} />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard toggleSnackbar={setInfo} />
            </Route>
            <Route path="/board">
              <Board toggleSnackbar={setInfo} />
            </Route>
          </Switch>
        </Suspense>
        <Snackbar
          open={Boolean(info)}
          onClose={() => setInfo(null)}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={info?.severity}>{messages[info?.status]}</Alert>
        </Snackbar>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
