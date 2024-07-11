import IChildren from './IChildren'

export default function MainLayout({children } : IChildren) {

    
  return (
    <div className='min-h-screen bg-primary'>
      {children}
    </div>
  )
}
