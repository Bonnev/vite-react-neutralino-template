import React from 'react';
import { useState } from 'react';
import reactLogo from '/react.svg';
import neutralinoLogo from '/neutralino-logo.gif';
import './App.css';

Neutralino.filesystem.writeFile('./test.txt', 'random text');

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<div>
				<a href="https://vitejs.dev"
					rel="noopener noreferrer" target="_blank">
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org"
					rel="noopener noreferrer" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
				<a href="https://neutralino.js.org/"
					rel="noopener noreferrer" target="_blank">
					<img src={neutralinoLogo} className="logo neutralino" alt="Neutralino logo" />
				</a>
			</div>
			<h1>Vite + React + Neutralino</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Editt <code>src/App.jsx</code> and save to test HMR within the browser
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite, React and Neutralino logos to learn more
			</p>
		</div>
	);
}

export default App;
