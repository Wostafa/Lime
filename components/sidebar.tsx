import { PropsWithChildren } from 'react'

interface SidebarProps {
  className?: string
}

export default function Sidebar({className = '', children}: PropsWithChildren<SidebarProps>){
  return(
    <div className={`flex-1 rounded-2xl h-fit overflow-hidden ${className}`} >
      {children}
    </div>
  )
}