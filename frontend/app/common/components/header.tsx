
"use client"
import React from 'react'

type Props = {
  title: string
}

const Header = ({title}: Props) => {
  return (
    <header className="p-4 w-full text-center bg-base-200 rounded-b-4xl">
      <h1 className="text-lg text-primary font-bold">{title}</h1>
    </header>
  )
}

export default Header