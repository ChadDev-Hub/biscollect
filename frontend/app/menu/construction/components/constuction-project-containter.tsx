
"use client"
import React, { useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchConstruction } from './construction-slice';
import ConstructionCard from './construction-card';


const ConstructionProjectContainer = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.construction.data);
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchConstruction());
        }
        fetchData();
    },[dispatch])
    
  return (
    <div className="grid grid-cols-1 gap-4 ">
      {data.map((item) => (
        <ConstructionCard key={item.id} data={item} />
      ))}
    </div>
  )
}

export default ConstructionProjectContainer