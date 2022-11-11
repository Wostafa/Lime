import { PropsWithChildren } from 'react'

interface SidebarProps {
  className?: string
}

export default function Sidebar({className, children}: PropsWithChildren<SidebarProps>){
  return(
    <div className={`rounded-2xl h-fit ${className}`} >
      {children}
    </div>
  )
}