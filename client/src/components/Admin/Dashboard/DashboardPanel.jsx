import React from 'react'
import Scoreboard from '../../Scoreboard/Scoreboard'

function DashboardPanel() {
  return (
    <div className='container-fluid'>
      <div className="score-board">
        <Scoreboard/>
      </div>
    </div>
  )
}

export default DashboardPanel