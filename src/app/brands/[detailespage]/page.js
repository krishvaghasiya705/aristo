import React from 'react'
import Branddetailspage from '@/app/components/brandscomponents/branddetailspage'

export default async function Brandsdetails({ params }) {
    // Ensure params is properly awaited
    const resolvedParams = await Promise.resolve(params)
    
    return (
        <div>
            <Branddetailspage params={resolvedParams} />
        </div>
    )
}
