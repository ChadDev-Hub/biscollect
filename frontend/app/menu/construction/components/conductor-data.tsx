
"use client"
import {useEffect, useState} from "react"
import {ConductorName} from "@/types/conductor-wire"
import {GetConductorName} from "@/lib/actions/conductor"
const ConductorData = () => {
    const [conductors, setConductors] = useState<ConductorName[]>([])
    useEffect(() => {
        const getConductors = async () => {
            const data = await GetConductorName();
            if (data) {
                setConductors(data)
            }
        }
        getConductors()
    },[])
  return (
    <div>
        <h1>Conductors</h1>
        
        <ul className="dropdown">

            {conductors.map((conductor) => (
                <li className="dropdown-content menu" key={conductor.id}>{conductor.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default ConductorData