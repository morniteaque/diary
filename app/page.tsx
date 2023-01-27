"use client";

import dynamic from "next/dynamic";
import { TextContent, Text, TextVariants } from "@patternfly/react-core";

function Home() {
  return (
    <TextContent>
      <Text component={TextVariants.h1}>Diary</Text>
    </TextContent>
  );
}

export default dynamic(async () => Home, {
  ssr: false,
});
