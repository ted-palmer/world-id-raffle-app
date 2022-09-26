import dynamic from "next/dynamic";
import { WidgetProps, VerificationResponse } from "@worldcoin/id";
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import contractInterface from '../contract-abi.json';
import { useState, useEffect } from "react";
import { defaultAbiCoder as abi } from "@ethersproject/abi";

const contractConfig = {
  addressOrName: '0x9F17FBe6D58e28F7434fD052930BfC83F6E1411E',
  contractInterface: contractInterface,
};

const WorldIDWidget = dynamic<WidgetProps>(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

const SubscribeToRaffle = () => {
  const { isConnected, address } = useAccount();
  const [proof, setProof] = useState<VerificationResponse | null>(null);
  const [decodedProof, setDecodedProof] = useState();

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'verifyAndSubscribe',
    chainId: 80001,
    args:
    [
      address, 
      proof?.merkle_root, 
      proof?.nullifier_hash, 
      decodedProof,
      { gasLimit: 10000000 }
    ]
  });

  useEffect(() => {
    if(proof?.proof) {
      setDecodedProof(abi.decode(["uint256[8]"], proof?.proof)[0]);
      console.log(decodedProof)
    }
  }, [proof]);

  const {
    data: subscribeData,
    write: subscribe,
    isLoading: isSubscribeLoading,
    isSuccess: isSubscribeStarted,
    error: subscribeError,
  } = useContractWrite(contractWriteConfig);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: subscribeData?.hash,
  });

  const isSubscribed = txSuccess;

  return (
    <>
      {!isConnected && (
        <p className='text-sm'>Connect your wallet to subscribe to the raffle</p>
      )}

      {isConnected &&
        <WorldIDWidget
          actionId="wid_staging_ccb632142a96f1365093393c23b00930" // obtain this from developer.worldcoin.org
          signal="my_signal"
          enableTelemetry
          onSuccess={(proof) => setProof(proof)}
          onError={(error) => console.error(error)}
          debug={true} // to aid with debugging, remove in production
        />
      }

      <button
        className={`w-80 disabled:opacity-20 hover:opacity-90 py-2 px-8 mb-4 rounded-lg text-xl font-bold ${isSubscribeStarted || isSubscribeLoading || isSubscribed ? "bg-white text-black border-2 border-black" : "bg-black text-white "}`}
        disabled={!subscribe || !isConnected || !proof}
        onClick={() => subscribe?.()}
      >
        {isSubscribeLoading && 'Confirming in wallet'}
        {isSubscribeStarted && !isSubscribed && 'Subscribing...'}
        {!isSubscribeLoading && isSubscribeStarted && isSubscribed && 'Subscribed!'}
        {!isSubscribeLoading && !isSubscribeStarted && !isSubscribed && 'Subscribe'}
      </button>

      {subscribeError && subscribeError.message && (
        <div className='w-60 overflow-scroll'>
          <p className='text-center text-red-400 my-2'>{subscribeError.message}</p>
        </div>
      )}

      {isSubscribed && (
        <a href={`https://mumbai.polygonscan.com/tx/${subscribeData?.hash}`} className='' target="_blank" rel="noreferrer">
          View transaction
        </a>
      )}
    </>
  )
}

export default SubscribeToRaffle;