import React from 'react'
import { FadeLoader } from 'react-spinners'

function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <FadeLoader color='#37d7b7'/>
    </div>
  )
}

export default Loader
