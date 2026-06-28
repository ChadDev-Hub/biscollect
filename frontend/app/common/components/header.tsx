
"use client"
import React from 'react'

type Props = {
  title: string
}

const Header = ({title}: Props) => {
  return (
    <header className="p-4 w-full text-center bg-emerald-300 rounded-b-4xl">
      <h1 className="text-3xl text-primary font-bold">{title}</h1>
    </header>
  )
}

export default Header