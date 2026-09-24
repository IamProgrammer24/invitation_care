import { useEffect, useState } from "react";
import config from "./data/config";
import OpenScreen from "./components/common/OpenScreen";
import Hero from "./components/wishes/Hero";
import MessageCard from "./components/wishes/MessageCard";
import NineColours from "./components/wishes/NineColours";
import From from "./components/wishes/From";
import ShareFooter from "./components/wishes/ShareFooter";

export default function App() {
  const [started, setStarted] = useState(false);
  const message = config.message[config.lang];

  useEffect(() => {
    document.documentElement.dataset.theme = config.theme;
  }, []);

  useEffect(() => {
    document.body.style.overflow = started ? "" : "hidden";
  }, [started]);

  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <Hero play={started} />
      <MessageCard message={message} />
      <NineColours lang={config.lang} startDate={config.startDate} />
      <From from={config.from} photo={config.photo} lang={config.lang} />
      <ShareFooter lang={config.lang} message={message} />
      <OpenScreen onStart={() => setStarted(true)} />
    </>
  );
}
