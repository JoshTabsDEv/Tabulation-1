import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from './pages/Dashboard'
import StartEvent from './pages/StartEvent'
import Login from './components/Login'
import JudgeCredentials from "./pages/JudgeCredentials";
import JudgeDashboard from "./pages/JudgeDashboard";
import ThankYouPage from "./pages/ThankYouPage";
import ScorePanel from "./pages/ScorePanel";

 
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
  },
  {
    path:"/eventStart/:eventId",
    element:<StartEvent/>
  },
  {
    path:"/GenerateJudgeCredentials/:eventId",
    element:<JudgeCredentials/>
  },
  {
    path:"/:eventId",
    element:<Login/>
  },
  {
    path:"/judge/:eventId/:judgeID",
    element:<JudgeDashboard/>
  },
  {
    path:"/done",
    element:<ThankYouPage/>
  },
  {
    path:"/Scores/:eventId",
    element:<ScorePanel/>
  }
 ])

  return (
    <>
    
     <RouterProvider router={router}/>
     
    </>
  )
}

export default App
