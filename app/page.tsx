import AppLayout from '../components/client/layout/AppLayout';
import Lobby from '../components/client/lobby/Lobby';

export default function Home() {

  return (
    <main>
      <AppLayout>
        <Lobby />
      </AppLayout>
    </main>
  )
}
