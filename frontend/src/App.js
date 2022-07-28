import './App.css';
import Login from "./components/userLogin"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "./components/userDetails";
import NoteDetails from "./components/NoteDetails";
import AddUser from "./components/AddUsers";
import ResetUser from "./components/ResetUser";
import AddNote from "./components/AddNote";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";



function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <section>
          {localStorage.getItem("token") ? (
            <Switch>
              <Route path="/home" component={Details} exact />
              <Route path="/note" component={NoteDetails} />
              <Route path="/adduser" component={AddUser} />
              <Route path="/resetuser" component={ResetUser} />
              <Route path="/addnote" component={AddNote} />


              <Route path="/" component={Login} />

            </Switch>
          ) : (
              <Switch>
                <Route path="/" component={Login} />
              </Switch>
            )}
        </section>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
