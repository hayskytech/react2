import Student from "./components/Student";

function App() {
	const x = 5
	const y = 6

  return (
		<>
			<Student/>

			<h1>Addition: {x+y} </h1>
			<h1>Sub: {x-y} </h1>
			<h1>Mul: {x*y} </h1>
			<p>Like this we can use variables</p>
			
		</>
  );
}

export default App;
