import React from 'react'
import Branddetailspage from '@/app/components/brandscomponents/branddetailspage'

export default async function Brandsdetails({ params }) {
    return (
        <div>
            <Branddetailspage params={params} />
        </div>
    )
}
