import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from './pages/Dashboard'
import Login from './components/Login'

 
function App() {

  // const [ListOfEvents, setListOfEvents] = useState([]);

  // useEffect(()=>{
  //   axios.get("http://localhost:8001/test").then((response)=>{
  //    setListOfEvents(response.data)
  //   })
  // }, [])
 const router = createBrowserRouter([
  {
    path:"/",
    element: <Login/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  }
 ])

  return (
    <>
    
     <RouterProvider router={router}/>
     
    </>
  )
}

export default App
