import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home';

function App() {
  const envClass = process.env.REACT_APP_ENV === 'development' ? 'env-dev' : 'env-prod';

  return (
    <div className={envClass}>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
