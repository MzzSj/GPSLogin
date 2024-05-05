import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ExampleComponent = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      const auth = getAuth();
      onAuthStateChanged(auth, (userAuth) => {
        if (userAuth) {
          userAuth.getIdTokenResult()
            .then((idTokenResult) => {
              setIsAdmin(!!idTokenResult.claims.admin);
            })
            .catch((error) => {
              console.error('Error getting custom claims:', error);
            });
        }
      });
    }
  }, [user]);

  return (
    <div>
      {isAdmin ? (
        <p>You are an admin.</p>
      ) : (
        <p>You are not an admin.</p>
      )}
    </div>
  );
};

export default ExampleComponent;
