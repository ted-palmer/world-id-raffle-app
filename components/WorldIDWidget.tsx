import dynamic from "next/dynamic";
import { WidgetProps, VerificationResponse } from "@worldcoin/id";
import { useAccount, useContractRead } from "wagmi";
import { useState } from "react";

const WorldIDWidget = dynamic<WidgetProps>(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

const SubscribeToRaffle = () => {
  const { isConnected } = useAccount();
  const [proof, setProof] = useState<VerificationResponse | null>(null);
  console.log(proof);

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
          onSuccess={(verificationResponse) => setProof(verificationResponse)}
          onError={(error) => console.error(error)}
          debug={true} // to aid with debugging, remove in production
        />
      }

      {isConnected && proof && 
        <p className="text-sm">Connected and verified.</p>
      }
    </>
  )
}

export default SubscribeToRaffle;