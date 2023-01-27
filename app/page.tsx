"use client";

import NoSSR from "react-no-ssr";
import { TextContent, Text, TextVariants } from "@patternfly/react-core";

export default function Home() {
  return (
    <NoSSR>
      <TextContent>
        <Text component={TextVariants.h1}>Diary</Text>
      </TextContent>
    </NoSSR>
  );
}
