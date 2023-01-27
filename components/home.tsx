import { Text, TextContent, TextVariants } from "@patternfly/react-core";

export default function Home() {
  return (
    <TextContent>
      <Text component={TextVariants.h1}>Diary!</Text>
    </TextContent>
  );
}
