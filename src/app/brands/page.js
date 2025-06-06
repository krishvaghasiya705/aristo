import React from 'react'
import Brandslider from '../components/brandscomponents/brandslider'

export default async function Brands({ searchParams }) {
  const params = await searchParams
  const category = params?.category || 'all'
  return (
    <>
      <Brandslider category={category} />
    </>
  )
}
