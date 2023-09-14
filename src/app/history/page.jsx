'use client';

import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { AppContext } from '../layout';
import c_abi from '../c_abi.json';
import axios from 'axios';

const history = () => {
  const { account, setAccount, web3 } = useContext(AppContext);
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const get_history_data = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/history/${account.id}`
      );

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(account);
    get_history_data();
  }, []);

  return isLoading == true ? (
    <div> Loading ~ </div>
  ) : (
    <div> "여기에 이미지 박스 컴포넌트 들어가면 됩니다" </div>
  );
};

export default history;
