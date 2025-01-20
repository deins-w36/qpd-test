import React, { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode | ReactNode[]
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="users-list-container flex flex-col gap-5 justify-center items-start w-full p-5 bg-white rounded-2xl">
      {children}
    </div>
  )
}

export default PageWrapper
