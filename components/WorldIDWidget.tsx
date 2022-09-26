import dynamic from "next/dynamic";
import { WidgetProps } from "@worldcoin/id";

const WorldIDWidget = dynamic<WidgetProps>(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

const Widget = () => {
  return (
    <WorldIDWidget
      actionId="wid_staging_ccb632142a96f1365093393c23b00930" // obtain this from developer.worldcoin.org
      signal="my_signal"
      enableTelemetry
      onSuccess={(verificationResponse) => console.log(verificationResponse)}
      onError={(error) => console.error(error)}
      debug={true} // to aid with debugging, remove in production
    />
  )
}

export default Widget;