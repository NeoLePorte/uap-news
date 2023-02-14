// import logo from './logo.svg';
import './App.css';
import RedditSearchPage from './Components/RedditSearchPage';
<head>
  <link rel="preconnect" href="https://fonts.gstatic.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"/>
</head>
function App() {
  return (
    <div className="App">
      { <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>}
      <RedditSearchPage></RedditSearchPage>
    </div>
  );
}

export default App;
