import React from 'react'
import EventTable from '../components/EventTable'

function Dashboard() {
  return (

        
          <div className="flex flex-wrap ml-9 my-5 flex-grow overflow-x-auto">    
        <div className="w-full max-w-full sm:w-auto mx-auto text-center ">
            <EventTable/>
        </div>
       </div>
  
        
 
 
  )
}

export default Dashboard;