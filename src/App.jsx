import { useState } from 'react';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useGlobalContext } from './store//Context';

function App() {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <>
        <div className="sp sp-circle"></div>
      </>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
