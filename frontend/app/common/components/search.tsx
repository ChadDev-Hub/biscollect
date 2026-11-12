"use client";
import type {  ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useMemo} from 'react';
import Fuse from 'fuse.js';
import {useAppDispatch} from '@/app/hooks';
import {Loader, Search as SearchIcon} from 'lucide-react'
type Props<T> = {
    placeholder?: string
    loading: boolean
    actions: ActionCreatorWithPayload<{[key: string]: T}[]>
    resetActions: () => void;
    data: {
        [key: string]: T
    }[]
}

const Search = <T,>({actions,resetActions, data, loading, placeholder}: Props<T>) => {
    const dispatch = useAppDispatch();
    const search = useMemo(()=>{
        if (!data?.length) return null;
        
        return new Fuse(data, {
            keys: Object.keys(data[0] as object),
            shouldSort: true,
        })
    },[data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return resetActions();
        if (!search) return
        const results = search.search(e.target.value);
        dispatch(actions(results.map((result) => result.item)));
    }
    
  return (
    <label className="input input-bordered w-full max-w-md">
        {loading ? <Loader className="animate-spin transition-all duration-1000" /> : <SearchIcon />}
        <input  onChange={handleSearch} placeholder={placeholder} className=" w-full max-w-md"/>
    </label>
    
  )
}

export default Search