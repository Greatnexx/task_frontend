import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import DashBoard from "./pages/dashBoard"

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
					<Route path="/dashboard" index element={<DashBoard />} />	
				
			</>
		)
	);
	return <RouterProvider router={router} />;
};

export default App
