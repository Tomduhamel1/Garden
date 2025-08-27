import React from 'react';
import CDField from './CDField';
import { useOrderDataContext } from '../../contexts/OrderDataContext';

// Wrapper component that provides context values to CDField
const CDFieldWrapper: React.FC<React.ComponentProps<typeof CDField>> = (props) => {
  const orderData = useOrderDataContext();
  
  // Pass context values as props to CDField
  return (
    <CDField
      {...props}
      getValue={props.getValue || orderData.getValue}
      handleFieldChange={props.handleFieldChange || orderData.handleFieldChange}
    />
  );
};

export default CDFieldWrapper;