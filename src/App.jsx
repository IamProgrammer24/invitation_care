import { useEffect, useState } from "react";
import config from "./data/config";
import OpenScreen from "./components/common/OpenScreen";
import Hero from "./components/wishes/Hero";
import MessageCard from "./components/wishes/MessageCard";
import NineColours from "./components/wishes/NineColours";
import From from "./components/wishes/From";
import ShareFooter from "./components/wishes/ShareFooter";

export default function App() {
  const [opened, setOpened] = useState(false);
  const message = config.message[config.lang];

  useEffect(() => {
    document.documentElement.dataset.theme = config.theme;
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  return (
    <>
      <Hero play={opened} />
      <MessageCard message={message} />
      <NineColours lang={config.lang} startDate={config.startDate} />
      <From from={config.from} photo={config.photo} lang={config.lang} />
      <ShareFooter lang={config.lang} message={message} />
      {!opened && <OpenScreen onOpen={() => setOpened(true)} />}
    </>
  );
}
