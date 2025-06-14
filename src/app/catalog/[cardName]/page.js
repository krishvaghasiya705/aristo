"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { Catalogdat } from '@/app/components/catalogcomponents/catalogjson/catalogdata';
import Catalogcardpage from '@/app/components/catalogcomponents/catalogcardpage';

export default function CatalogItem() {
    const params = useParams();
    const cardName = params.cardName;
    const catalogItem = Catalogdat.find(item => 
        item.CardName.en.toLowerCase().replace(/\s+/g, '-') === cardName
    );

    return (
        <div>
            <Catalogcardpage catalogItem={catalogItem} />
        </div>
    );
} 