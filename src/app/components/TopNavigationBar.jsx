"use client";

import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

const TopNavigationBar = () => {
  return (
    <>
      <Container>
        <NavigationItem>등록하기</NavigationItem>
        <NavigationItem>검증하기</NavigationItem>
        <NavigationItem>히스토리</NavigationItem>
      </Container>
      <StatusLine>
        <StatusCircle></StatusCircle>
        <StatusCircle></StatusCircle>
        <StatusCircle></StatusCircle>
      </StatusLine>
    </>
  );
};

export default TopNavigationBar;

const Container = styled.div`
  position: fixed;
  top: 30px;

  width: 320px;
  height: 35px;

  background-color: white;
  border-radius: 34px;
  border: 4px solid #2b9bda;

  align-items: center;
  display: flex;
  justify-content: space-between;

  padding: 4px;
`;

const NavigationItem = styled.div`
  width: 95px;
  height: 25px;
  border-radius: 23px;

  background-color: #2b9bda;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 14px;
  font-weight: 400;
`;

const StatusLine = styled.div`
  position: fixed;
  top: 100px;

  width: 240px;
  height: 5px;

  background-color: #2b9bda;
  border-radius: 3px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 4px solid #2b9bda;
  background-color: white;
`;
