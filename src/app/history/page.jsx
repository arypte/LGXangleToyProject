"use client";

import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { AppContext } from "../layout";
import c_abi from "../c_abi.json";
import axios from "axios";
import styled from "styled-components";
import TopNavigationBar from "../components/TopNavigationBar";
import { TopNavigationBarPlaceholder } from "../placeholder";

const History = () => {
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(account);
    get_history_data();
  }, []);

  // return ({isLoading == true ? <div> Loading ~ </div> : <div> 아아 </div>});
  return (
    <>
      <TopNavigationBar />
      <TopNavigationBarPlaceholder />
      <PhotoGrid>
        {Array.from({ length: 12 }, (_, index) => (
          <PhotoBlock key={index}>{index + 1}</PhotoBlock>
        ))}
      </PhotoGrid>
    </>
  );
};

export default History;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const PhotoBlock = styled.div`
  width: 100px;
  height: 100px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;
