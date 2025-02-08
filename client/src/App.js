import logo from './logo.svg';
import './App.css';
import GetPosts from './components/GetPosts';
import CreatePosts from './components/CreatePosts';

function App() {
  return (
    <div className="App">
      <GetPosts />
      <CreatePosts />
    </div>
  );
}

export default App;
