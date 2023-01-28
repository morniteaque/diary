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
import Link from "next/link";
import icon from "../docs/icon-dark.png";

const NAV_ITEMS = [
  ["Master", "master"],
  ["Core HRT", "core-hrt"],
  ["FFS", "ffs"],
  ["SRS", "srs"],
  ["Domperidone", "domperidone"],
  ["Ibutamoren", "ibutamoren"],
  ["Depression", "depression"],
  ["Coming Out", "coming-out"],
  ["Substance Use", "substance-use"],
];

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
                {NAV_ITEMS.map((el, i) => (
                  <NavItem
                    itemId={i}
                    key={i}
                    isActive={window?.location.pathname.endsWith("/" + el[1])}
                    to={"/" + el[1]}
                    component={Link as unknown as React.ReactNode}
                  >
                    {el[0]}
                  </NavItem>
                ))}
              </NavList>
            </Nav>
          }
          className="pf-c-page__header--centered"
        />
      }
      skipToContent={
        <SkipToContent href="#main">Skip to content</SkipToContent>
      }
      mainContainerId="main"
    >
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Body</Text>
        </TextContent>
      </PageSection>
    </Page>
  );
}
