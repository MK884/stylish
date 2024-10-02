import { Text, TextProps } from 'react-native'
import React from 'react'

interface MyTextProps extends TextProps {
    className?: string
}

const MyText = ({className, ...rest}:MyTextProps) => {
    return (
      <Text
      style={{
          fontFamily: 'Montserrat_400Regular'
        }}
        className={className}
        {...rest}
      />
    );
  };

export default MyText