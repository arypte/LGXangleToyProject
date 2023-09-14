"use client";
import React, { useState, useEffect, useContext } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import { TopNavigationBarPlaceholder } from "../placeholder";
import { useRouter } from "next/navigation";

const History = () => {
  const router = useRouter();
  return (
    <div>
      <TopNavigationBar />
      <TopNavigationBarPlaceholder />
    </div>
  );
};

export default History;
