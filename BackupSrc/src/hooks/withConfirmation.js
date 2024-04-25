import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withConfirmation = (Component, routeToConfirm) => {
  return (props) => {
    const history = useNavigate();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
      const handleBeforeUnload = (event) => {
        if (showConfirmDialog) {
          const message = `You have unsaved changes. Are you sure you want to leave ${routeToConfirm}?`;
          event.returnValue = message;
          return message;
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [showConfirmDialog, routeToConfirm]);

    const navigateToComponent = () => {
      const shouldNavigate = window.confirm(`Do you want to navigate to ${routeToConfirm}?`);
      if (shouldNavigate) {
        setShowConfirmDialog(false);
        history.push(routeToConfirm);
      }
    };

    return (
      <div>
        {/* Render the wrapped component */}
        <Component {...props} />

        {/* Your confirmation dialog trigger button */}
        <button onClick={() => setShowConfirmDialog(true)}>Show Confirm Dialog</button>

        {/* Your navigation button */}
        <button onClick={navigateToComponent}>Navigate to {routeToConfirm}</button>
      </div>
    );
  };
};

export default withConfirmation;
