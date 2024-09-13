import React, {useState} from 'react';
import LoginButton from '@/app/components/header/LoginButton';

type Props = {};

const Header = (props: Props) => {
  const user = false;

  return (
    <div className='flex flex-col'>
      {!user && (
        <div className='ml-auto'>
          <LoginButton />
        </div>
      )}
    </div>
  );
};

export default Header;
