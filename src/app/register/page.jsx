'use client';

import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { Presets, Client } from 'userop';
import { AppContext } from '../layout';
import c_abi from '../c_abi.json';

const c_add = '0x588d98511bd106ab87011c54e50376c1c8f81613';

const Register = () => {
  const { account, setAccount, web3 } = useContext(AppContext);
  const [print, setPrint] = useState(0);
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
  const c_a = new ethers.Contract(c_add, c_abi, provider);
  const c_a2 = new web3.eth.Contract(c_abi, c_add);

  let t_signer;

  const [imageFile, setImageFile] = useState();
  const [skey, setSkey] = useState();

  const [signer, setSigner] = useState();
  const [builder, setBuilder] = useState();
  const [hash, setHash] = useState();

  const connect = async () => {
    console.log('t_signer : ', signer);
    // console.log('paymaster : ', process.env.NEXT_PUBLIC_PAYMASTER_URL);
    // console.log('rpcUrl : ', rpcUrl);
    // console.log('provier : ', provider);
    const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
      process.env.NEXT_PUBLIC_PAYMASTER_URL,
      {
        type: 'payg',
      }
    );

    const t_builder = await Presets.Builder.Kernel.init(signer, rpcUrl, {
      paymasterMiddleware: paymasterMiddleware,
    });

    setBuilder(t_builder);
  };

  const register = async () => {
    try {
      // destination_add : NFT 받을 주소
      const register = {
        to: c_add,
        value: ethers.constants.Zero,
        data: c_a.interface.encodeFunctionData('set_hash', [hash]), // 여기 들어감
      };

      console.log('set tx');

      builder.executeBatch([register]);

      console.log('set builder');

      // Send the user operation
      const client = await Client.init(rpcUrl);
      const res = await client.sendUserOperation(builder, {
        onBuild: (op) => console.log('int~'),
      });

      console.log('Waiting for transaction...');
      const ev = await res.wait();
      console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);

      setPrint(Number(count));
    } catch (error) {
      console.log(error);
    }
  };

  const del = () => {
    setImageFile();
  };

  const onChangeImageFile = (e) => {
    if (!e.target.files) return;

    const crypto = require('crypto');
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const fileData = event.target.result;
        const fileBuffer = Buffer.from(fileData);
        const ab = crypto.createHash('sha512').update(fileBuffer).digest('hex');
        console.log('hash : ', ab);
        setHash(ab);
        setImageFile(file);
      }
    };
  };

  useEffect(() => {
    setPrint(0);
    if (account) {
      setSkey(account.pvk);
      t_signer = new ethers.Wallet(account.pvk);
      setSigner(t_signer);
    }
  }, [account]);

  useEffect(() => {
    if (signer) {
      //   console.log('signer : ', signer);
      connect();
      console.log('ready');
    }
  }, [signer]);

  return (
    <div className="flex justify-center items-center h-screen">
      {!imageFile ? (
        <form className="flex flex-col">
          <label
            className="px-8 py-2 border rounded-xl bg-red-200"
            htmlFor="imageFile"
          >
            {imageFile ? imageFile.name : 'Choose image'}
          </label>
          <input
            className="hidden"
            id="imageFile"
            type="file"
            onChange={onChangeImageFile}
          />
        </form>
      ) : (
        <div className="flex flex-col">
          <div>
            <button
              className='className="px-8 py-2 border rounded-xl bg-red-200'
              onClick={register}
            >
              원본 등록
            </button>
            {print != 0 ? <div>{print}</div> : <></>}
          </div>
          <button
            className='className="px-8 py-2 border rounded-xl bg-red-200'
            onClick={del}
          >
            원본 검증
          </button>
          <button
            className='className="px-8 py-2 border rounded-xl bg-red-200'
            onClick={del}
          >
            이미지 제거
          </button>
        </div>
      )}
    </div>
  );
};
export default Register;
