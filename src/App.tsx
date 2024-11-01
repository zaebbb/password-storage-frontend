import React from 'react';
import {Header} from "./components/Header/Header";
import './styles/index.scss'
import {ToastContainer, Bounce, toast} from "react-toastify";
import {Cards} from "./components/Cards/Cards";
import { toastConfig } from './config/toastConfig';
import { useAppSelector } from './store/hooks';

function App() {
  const options = useAppSelector((state) => state.password.options);

  React.useEffect(() => {
    const tabs = document.querySelectorAll(`.card-tab`);

    tabs.forEach(tab => {
      tab.addEventListener('click', async (e: Event) => {
        if (e.target instanceof HTMLElement) {
          const content = e.target.textContent

          if (content) {
            await navigator.clipboard.writeText(content)

            toast('Скопировано', toastConfig(1000))
          }
        }
      })
    })
  }, [options])

  return (
    <>
      <Header />

      <main>
        <Cards />
      </main>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
