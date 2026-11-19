
"use client"

import TransformerDetailForm from './components/detail-form';
import { Suspense } from 'react';







const Page =()=> {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransformerDetailForm />
    </Suspense>
  )
}

export default Page