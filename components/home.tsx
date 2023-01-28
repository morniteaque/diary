import {
  Brand,
  Button,
  ButtonVariant,
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
  PageSection,
  PageSectionVariants,
  SkipToContent,
  Text,
  TextContent,
} from "@patternfly/react-core";
import { CogIcon, DollarSignIcon } from "@patternfly/react-icons";
import icon from "../docs/icon-dark.png";

export default function Home() {
  return (
    <Page
      header={
        <PageHeader
          logo={<Brand src={icon.src} alt="Diary logo" />}
          headerTools={
            <PageHeaderTools>
              <PageHeaderToolsGroup>
                <PageHeaderToolsItem>
                  <Button aria-label="Settings" variant={ButtonVariant.plain}>
                    <CogIcon />
                  </Button>
                </PageHeaderToolsItem>
                <PageHeaderToolsItem>
                  <Button
                    icon={<DollarSignIcon />}
                    aria-label="Donate"
                    variant={ButtonVariant.link}
                    className="pf-x-u-color--unset"
                  >
                    Donate
                  </Button>
                </PageHeaderToolsItem>
              </PageHeaderToolsGroup>
            </PageHeaderTools>
          }
          topNav={
            <Nav aria-label="Nav" variant="horizontal">
              <NavList>
                <NavItem itemId={0} isActive>
                  Master
                </NavItem>
                <NavItem itemId={1}>Core HRT</NavItem>
                <NavItem itemId={2}>FFS</NavItem>
                <NavItem itemId={3}>SRS</NavItem>
                <NavItem itemId={4}>Domperidone</NavItem>
                <NavItem itemId={5}>Ibutamoren</NavItem>
                <NavItem itemId={6}>Depression</NavItem>
                <NavItem itemId={7}>Coming Out</NavItem>
                <NavItem itemId={7}>Substance Use</NavItem>
              </NavList>
            </Nav>
          }
        />
      }
      skipToContent={
        <SkipToContent href="#main">Skip to content</SkipToContent>
      }
      mainContainerId="main"
    >
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Diary</Text>
        </TextContent>
      </PageSection>
    </Page>
  );
}
