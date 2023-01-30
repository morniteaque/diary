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
  Slider,
  Switch,
  Tab,
  Tabs,
  TabTitleText,
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
  const [density, setDensity] = useState(75);
  const [activeTab, setActiveTab] = useState(0);

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
          <PageSection
            variant={PageSectionVariants.light}
            isWidthLimited
            isCenterAligned
            type="tabs"
          >
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

                  <Divider
                    orientation={{ default: "vertical" }}
                    inset={{ default: "insetXl" }}
                    className="pf-u-ml-sm pf-u-mr-lg"
                  />

                  <ToolbarItem
                    className="pf-u-flex-fill"
                    alignment={{ default: "alignRight" }}
                  >
                    <Slider
                      value={density}
                      isInputVisible
                      inputPosition="right"
                      inputValue={density}
                      inputLabel="% Density"
                      onChange={setDensity}
                      onInputCapture={(e) =>
                        setDensity(
                          parseInt((e.target as HTMLInputElement).value)
                        )
                      }
                      className="pf-u-mt-md"
                    />
                  </ToolbarItem>

                  <Divider
                    orientation={{ default: "vertical" }}
                    inset={{ default: "insetXl" }}
                    className="pf-u-ml-sm pf-u-mr-lg"
                  />

                  <ToolbarItem>
                    <Button aria-label="Filters" variant={ButtonVariant.plain}>
                      <FilterIcon />
                    </Button>
                  </ToolbarItem>
                </ToolbarContent>
              </Toolbar>
            ) : (
              <div className="pf-u-p-md">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(_, v) => setActiveTab(parseInt(v as string))}
                  usePageInsets
                  aria-label="Help tabs"
                  role="region"
                  className="pf-u-justify-content-center"
                >
                  <Tab
                    eventKey={0}
                    title={<TabTitleText>Welcome</TabTitleText>}
                    aria-label="Tab for the welcome section"
                  >
                    <div className="pf-u-py-md">Welcome</div>
                  </Tab>
                  <Tab
                    eventKey={1}
                    title={<TabTitleText>About Me</TabTitleText>}
                    aria-label="Tab for the about me section"
                  >
                    <div className="pf-u-py-md">About Me</div>
                  </Tab>
                </Tabs>
              </div>
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
