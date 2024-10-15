import React from 'react'
import Header from '../Header/Header'

export default function Layout({content}) {
  return (
    <div>
      <Header/>
      {content}
    </div>
  )
}
