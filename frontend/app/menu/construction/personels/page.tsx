
"use client"

import ReturnMenu from '@/app/common/components/buttons/return-menu';
import ToolsNavar from "@/app/common/components/tools-navbar";
import PersonelForm from "./components/personel-form";
function PersonelPage() {
  return (
    <>
    <ToolsNavar className="flex justify-between p-4 bg-base-200 w-full">
    
        <ReturnMenu />
        
        <PersonelForm />
      
        
    </ToolsNavar>
        <main className="flex flex-1">

        </main>
    </>
    
  )
}

export default PersonelPage