import React from 'react';
import './App.css';
import './styles/styles.css';
import './styles/main_styles.css';
import './styles/header_styles.css';
import './styles/catalogs_styles.css';
import './styles/footer_styles.css';
import Main from "./Main";

function App(props) {
    return (<div>
      <header>
        This is website!
      </header>

      <main>
        <Main/>
      </main>

      <footer>
        Your copyright message
      </footer>
    </div>);
}

export default App;
