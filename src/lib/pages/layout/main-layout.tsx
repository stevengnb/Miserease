import Navbar from '../../../components/navbar/navbar'
import IChildren from './IChildren'

export default function MainLayout({children } : IChildren) {

    
  return (
    <div className='min-h-screen bg-primary'>
      <Navbar />
      <div className='p-4'>
        {children}
      </div>
    </div>
  )
}
