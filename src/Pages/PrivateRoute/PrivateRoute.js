// import React from 'react';
// import { Route, Navigate  } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../../config';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const [user, loading] = useAuthState(auth);

//   if (loading) return <p>Loading...</p>; // Optionally, you can show a loading spinner while checking auth status

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? (
//           <Component {...props} />
//         ) : (
//           <Navigate  to="/login" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../../config';

// const PrivateRoute = ({ element: Element }) => {
//   const [user, loading] = useAuthState(auth);

//   if (loading) return <p>Loading...</p>; // Optionally, you can show a loading spinner while checking auth status

//   return user ? <Element /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config';

// Regular function syntax for PrivateRoute
function PrivateRoute(props) {
  const { element: Element } = props;
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>; // Optionally, you can show a loading spinner while checking auth status

  return user ? <Element /> : <Navigate to="/login" />;
}

export default PrivateRoute;
