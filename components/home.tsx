import {
  Brand,
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  Divider,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Flex,
  FlexItem,
  Grid,
  GridItem,
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
  TextVariants,
  Title,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Tooltip,
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

const ENTRIES = [
  {
    date: "2023-01-28",
  },
  {
    date: "2023-01-29",
  },
  {
    date: "2023-01-30",
  },
  {
    date: "2023-01-31",
  },
];

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [nsfw, setNSFW] = useState(false);
  const [detail, setDetail] = useState(75);
  const [activeTab, setActiveTab] = useState(0);
  const [filters, setFilters] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState("");

  return (
    <Page
      header={
        <PageHeader
          logo={<Brand src={icon.src} alt="Diary logo" />}
          headerTools={
            <PageHeaderTools>
              <PageHeaderToolsGroup>
                <PageHeaderToolsItem>
                  <ToggleGroup
                    aria-label="Settings and help toggles"
                    className="pf-u-py-sm"
                  >
                    <ToggleGroupItem
                      icon={<CogIcon />}
                      aria-label="Toggle settings"
                      isSelected={settingsOpen}
                      onChange={() => {
                        setHelpOpen(false);
                        setSettingsOpen((v) => !v);
                      }}
                    />

                    <ToggleGroupItem
                      icon={<HelpIcon />}
                      aria-label="Toggle help"
                      isSelected={helpOpen}
                      onChange={() => {
                        setSettingsOpen(false);
                        setHelpOpen((v) => !v);
                      }}
                    />
                  </ToggleGroup>
                </PageHeaderToolsItem>

                <PageHeaderToolsItem>
                  <Button
                    aria-label="Donate"
                    variant={ButtonVariant.link}
                    className="pf-x-u-color--unset pf-u-ml-sm"
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
            stickyOnBreakpoint={{
              default: "top",
            }}
          >
            {settingsOpen ? (
              <>
                <Toolbar>
                  <ToolbarContent>
                    <ToolbarItem className="pf-u-display-none pf-u-display-inline-flex-on-md">
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
                      className="pf-u-ml-sm pf-u-mr-lg pf-u-display-none pf-u-display-inline-flex-on-md"
                    />

                    <ToolbarItem
                      className="pf-u-flex-fill pf-u-mr-0 pf-u-mr-md-on-md"
                      alignment={{ default: "alignRight" }}
                    >
                      <Tooltip
                        content="Amount of detail to show for a given entry"
                        position="bottom"
                      >
                        <Slider
                          value={detail}
                          isInputVisible
                          inputPosition="right"
                          inputValue={detail}
                          inputLabel="%"
                          onChange={setDetail}
                          onInputCapture={(e) =>
                            setDetail(
                              parseInt((e.target as HTMLInputElement).value)
                            )
                          }
                          className="pf-u-mt-md"
                        />
                      </Tooltip>
                    </ToolbarItem>

                    <Divider
                      orientation={{ default: "vertical" }}
                      inset={{ default: "insetXl" }}
                      className="pf-u-ml-sm pf-u-mr-lg pf-u-display-none pf-u-display-inline-flex-on-md"
                    />

                    <ToolbarItem className="pf-u-display-none pf-u-display-inline-flex-on-md">
                      <ToggleGroup aria-label="Filter controls">
                        <Tooltip
                          content="Toggle the available filters"
                          position="bottom"
                        >
                          <ToggleGroupItem
                            icon={<FilterIcon />}
                            aria-label="Toggle the available filters"
                            isSelected={filters}
                            onChange={() => setFilters((v) => !v)}
                          />
                        </Tooltip>
                      </ToggleGroup>
                    </ToolbarItem>

                    <Divider
                      orientation={{ default: "horizontal" }}
                      className="pf-u-pt-lg pf-u-pb-md pf-u-display-flex pf-u-display-none-on-md"
                    />

                    <ToolbarItem className="pf-u-display-block pf-u-display-none-on-md">
                      <Switch
                        label="NSFW"
                        labelOff="NSFW"
                        isChecked={nsfw}
                        onChange={setNSFW}
                        isReversed
                      />
                    </ToolbarItem>

                    <ToolbarItem
                      alignment={{
                        default: "alignRight",
                      }}
                      className="pf-u-display-block pf-u-display-none-on-md"
                    >
                      <ToggleGroup aria-label="Filter controls">
                        <Tooltip
                          content="Toggle the available filters"
                          position="bottom"
                        >
                          <ToggleGroupItem
                            icon={<FilterIcon />}
                            aria-label="Toggle the available filters"
                            isSelected={filters}
                            onChange={() => setFilters((v) => !v)}
                          />
                        </Tooltip>
                      </ToggleGroup>
                    </ToolbarItem>
                  </ToolbarContent>
                </Toolbar>

                {filters && (
                  <div className="pf-u-pb-md pf-u-px-md">
                    <Divider
                      orientation={{ default: "horizontal" }}
                      className="pf-u-pb-md"
                    />
                    Filters
                  </div>
                )}
              </>
            ) : (
              <div className="pf-u-py-sm pf-u-px-md">
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
                    <TextContent className="pf-u-py-md">
                      <Text component={TextVariants.p}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam vel enim id eros ultricies vehicula eu eu erat.
                        Curabitur sollicitudin vel eros ac aliquam. Aenean at
                        facilisis dolor. Aenean turpis sapien, pulvinar vitae
                        purus eu, maximus placerat mauris. Sed id lacus quis
                        velit hendrerit aliquet. Interdum et malesuada fames ac
                        ante ipsum primis in faucibus. Donec elementum, diam vel
                        commodo sollicitudin, justo purus maximus eros, nec
                        placerat lectus dolor sed tellus. Mauris scelerisque
                        quam est, ut aliquam magna tristique pretium. Etiam
                        vitae libero quis augue faucibus semper sed quis magna.
                        Suspendisse non risus in augue porta efficitur id ut
                        justo. Praesent maximus, velit vitae suscipit volutpat,
                        elit leo viverra velit, eget hendrerit lectus lorem id
                        mauris. Vestibulum porttitor luctus urna, ultricies
                        lobortis massa tristique vel.
                      </Text>

                      <Text component={TextVariants.p}>
                        Vestibulum consequat velit sit amet volutpat porta.
                        Praesent egestas, eros non dictum sodales, est metus
                        rutrum ligula, non congue turpis leo at lorem. Nam at
                        pretium risus. Curabitur eu eros eu magna condimentum
                        laoreet at sit amet sem. Mauris velit nulla, commodo sed
                        euismod ut, aliquet sit amet metus. Quisque gravida
                        lacus non fringilla placerat. Curabitur euismod velit eu
                        ligula pharetra molestie. Class aptent taciti sociosqu
                        ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Donec condimentum luctus odio et semper.
                        Maecenas id est a quam tristique porta. Integer posuere
                        arcu justo, nec dictum magna consectetur vel. Donec
                        lectus ex, tincidunt vitae odio sit amet, finibus auctor
                        mauris. Proin volutpat, felis vel commodo hendrerit,
                        ipsum odio malesuada urna, in placerat eros felis et
                        sem. Morbi vel laoreet turpis, sit amet laoreet nisi.
                      </Text>
                    </TextContent>
                  </Tab>
                  <Tab
                    eventKey={1}
                    title={<TabTitleText>About Me</TabTitleText>}
                    aria-label="Tab for the about me section"
                  >
                    <TextContent className="pf-u-py-md">
                      <Text component={TextVariants.p}>
                        Vestibulum consequat velit sit amet volutpat porta.
                        Praesent egestas, eros non dictum sodales, est metus
                        rutrum ligula, non congue turpis leo at lorem. Nam at
                        pretium risus. Curabitur eu eros eu magna condimentum
                        laoreet at sit amet sem. Mauris velit nulla, commodo sed
                        euismod ut, aliquet sit amet metus. Quisque gravida
                        lacus non fringilla placerat. Curabitur euismod velit eu
                        ligula pharetra molestie. Class aptent taciti sociosqu
                        ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Donec condimentum luctus odio et semper.
                        Maecenas id est a quam tristique porta. Integer posuere
                        arcu justo, nec dictum magna consectetur vel. Donec
                        lectus ex, tincidunt vitae odio sit amet, finibus auctor
                        mauris. Proin volutpat, felis vel commodo hendrerit,
                        ipsum odio malesuada urna, in placerat eros felis et
                        sem. Morbi vel laoreet turpis, sit amet laoreet nisi.
                      </Text>
                    </TextContent>
                  </Tab>
                </Tabs>
              </div>
            )}
          </PageSection>
        )
      }
    >
      <PageSection isFilled padding={{ default: "noPadding" }}>
        <Drawer
          isExpanded={selectedEntry !== ""}
          className="pf-m-inline-on-2xl pf-c-drawer--centered"
        >
          <DrawerContent
            className="pf-m-no-background"
            panelContent={
              <DrawerPanelContent isResizable>
                <DrawerHead>
                  <Title headingLevel="h2" size="xl">
                    {selectedEntry}
                  </Title>
                  <DrawerActions>
                    <DrawerCloseButton onClick={() => setSelectedEntry("")} />
                  </DrawerActions>
                </DrawerHead>
                <DrawerPanelBody>
                  <Flex
                    spaceItems={{ default: "spaceItemsLg" }}
                    direction={{ default: "column" }}
                  >
                    <FlexItem>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Fuga eos modi corporis quos sunt nesciunt velit
                        explicabo esse quod dicta?
                      </p>
                    </FlexItem>
                  </Flex>
                </DrawerPanelBody>
              </DrawerPanelContent>
            }
          >
            <DrawerContentBody hasPadding>
              <Grid
                hasGutter
                role="region"
                aria-label="Selectable card container"
              >
                {ENTRIES.map((entry, key) => (
                  <GridItem key={key} span={6}>
                    <Card
                      isSelectable
                      isFullHeight
                      onKeyDown={(e) =>
                        e.key === " " &&
                        setSelectedEntry((e) =>
                          e === entry.date ? "" : entry.date
                        )
                      }
                      onClick={() =>
                        setSelectedEntry((e) =>
                          e === entry.date ? "" : entry.date
                        )
                      }
                      onSelectableInputChange={() =>
                        setSelectedEntry((e) =>
                          e === entry.date ? "" : entry.date
                        )
                      }
                      isSelectableRaised
                      isSelected={selectedEntry === entry.date}
                      hasSelectableInput
                      selectableInputAriaLabel="Select this card"
                    >
                      <CardTitle>{entry.date}</CardTitle>
                      <CardBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nemo tenetur unde doloremque quae inventore, itaque
                        accusantium ducimus modi quaerat, illo ullam quod
                        possimus cum sit?
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </PageSection>
    </Page>
  );
}
