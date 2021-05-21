import React from 'react';
import { CredentialType } from '../types';
import styles from './App.module.css';
import Credential from './components/Credential';
import Hero from './components/Hero';

function App(): JSX.Element {
  const credentials: CredentialType[] = [
    {
      service: 'GitHub',
      username: 'Jajajaja10',
      password: '1234',
    },
    {
      service: 'Balaldl',
      username: 'eeee',
      password: '1234',
    },
    {
      service: 'Lalala',
      username: 'Jajajeeeaja10',
      password: '123454',
    },
  ];

  const credentialElements = credentials.map((credential) => (
    <Credential key={credential.service} credential={credential} />
  ));

  return (
    <div className={styles.App}>
      <Hero
        imgSrc="https://images.unsplash.com/photo-1584985429926-08867327d3a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGxvY2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
        title="cryptHammer"
        subtitle="safe. safer. cryptHammer"
      />
      <main>
        <ul>{credentialElements}</ul>
      </main>
    </div>
  );
}

export default App;
