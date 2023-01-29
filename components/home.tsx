import {
  Brand,
  Button,
  ButtonVariant,
  Divider,
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
  Switch,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  CogIcon,
  ExternalLinkAltIcon,
  FilterIcon,
  HelpIcon,
} from "@patternfly/react-icons";
import Link from "next/link";
import { useState } from "react";
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [nsfw, setNSFW] = useState(false);

  return (
    <Page
      header={
        <PageHeader
          logo={<Brand src={icon.src} alt="Diary logo" />}
          headerTools={
            <PageHeaderTools>
              <PageHeaderToolsGroup>
                <PageHeaderToolsItem>
                  <Button
                    aria-label="Settings"
                    onClick={() => {
                      setHelpOpen(false);
                      setSettingsOpen((v) => !v);
                    }}
                    isActive={settingsOpen}
                    variant={
                      settingsOpen ? ButtonVariant.control : ButtonVariant.plain
                    }
                  >
                    <CogIcon />
                  </Button>
                </PageHeaderToolsItem>

                <PageHeaderToolsItem>
                  <Button
                    aria-label="Help"
                    onClick={() => {
                      setSettingsOpen(false);
                      setHelpOpen((v) => !v);
                    }}
                    isActive={helpOpen}
                    variant={
                      helpOpen ? ButtonVariant.control : ButtonVariant.plain
                    }
                  >
                    <HelpIcon />
                  </Button>
                </PageHeaderToolsItem>

                <Divider
                  inset={{ default: "insetMd" }}
                  orientation={{
                    default: "vertical",
                  }}
                  className="pf-x-u-opacity-muted pf-u-mx-sm"
                />

                <PageHeaderToolsItem>
                  <Button
                    aria-label="Donate"
                    variant={ButtonVariant.link}
                    className="pf-x-u-color--unset"
                  >
                    Donate
                    <ExternalLinkAltIcon className="pf-u-ml-sm" />
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
      additionalGroupedContent={
        (settingsOpen || helpOpen) && (
          <PageSection variant={PageSectionVariants.light} isWidthLimited>
            {settingsOpen ? (
              <Toolbar>
                <ToolbarContent>
                  <ToolbarItem>
                    <Switch
                      label="NSFW"
                      labelOff="NSFW"
                      isChecked={nsfw}
                      onChange={setNSFW}
                      isReversed
                    />
                  </ToolbarItem>

                  <ToolbarItem variant="separator" />

                  <ToolbarItem>Slider</ToolbarItem>

                  <ToolbarItem variant="separator" />

                  <ToolbarItem>
                    <Button aria-label="Filters" variant={ButtonVariant.plain}>
                      <FilterIcon />
                    </Button>
                  </ToolbarItem>
                </ToolbarContent>
              </Toolbar>
            ) : (
              "Help"
            )}
          </PageSection>
        )
      }
    >
      <PageSection>
        <TextContent>
          <Text component="h1">Body</Text>
        </TextContent>
      </PageSection>
    </Page>
  );
}
