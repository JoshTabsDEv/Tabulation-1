import React from 'react'
import Navbar from '../components/Navbar'
import InputForJudgeSet from '../components/InputForJudgeSet'


function StartEvent() {
  return (
    <div style={{textAlign: "center"}}>
      <Navbar name="Judging Set-Up"/>
      <InputForJudgeSet/>
    </div>
    
  )
}

export default StartEvent