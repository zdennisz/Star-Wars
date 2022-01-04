import logo from "./logo.svg";
import "./App.css";
import BarChart from "./components/BarChart/BarChart/BarChart";
function App() {
	// TODO -Add real data fetching and sorting
	const dummyData = [
		{ name: "Tatooine", pop: 200000 },
		{ name: "Alderaan", pop: 2000000000 },
		{ name: "Naboo", pop: 4500000000 },
		{ name: "Bespin", pop: 6000000 },
		{ name: "Endor", pop: 30000000 },
	];
	return (
		<div className='App'>
			<BarChart planetInformation={dummyData} />
		</div>
	);
}

export default App;
