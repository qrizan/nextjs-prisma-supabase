
import options from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth'
import NavigationBar from './NavigationBar';

const MainNavigation = async () => {
  const session = await getServerSession(options)

  return (
    <NavigationBar session={session} />
  )
}

export default MainNavigation