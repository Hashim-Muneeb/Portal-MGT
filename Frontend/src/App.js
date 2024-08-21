import './App.css';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Routers from '../src/routers/Routers';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </div>
  );
}

export default App;
