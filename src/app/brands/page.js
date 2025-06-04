import React from 'react'
import Brandslider from '../components/brandscomponents/brandslider'

export default function Brands({ searchParams }) {
  const category = searchParams?.category || 'all'
  return (
    <>
      <Brandslider category={category} />
    </>
  )
}
