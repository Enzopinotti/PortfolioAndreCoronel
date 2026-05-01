import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home';
import SplashScreen from './components/layout/SplashScreen/SplashScreen';

function App() {
  const envClass = process.env.REACT_APP_ENV === 'development' ? 'env-dev' : 'env-prod';

  return (
    <div className={envClass}>
      <SplashScreen />
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
