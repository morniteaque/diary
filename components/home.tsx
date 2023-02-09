import {
  Brand,
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Chip,
  ChipGroup,
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
  FormSelect,
  FormSelectOption,
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
  Panel,
  PanelMain,
  PanelMainBody,
  SkipToContent,
  Slider,
  Switch,
  Tab,
  Tabs,
  TabTitleText,
  Text,
  TextContent,
  TextInput,
  TextVariants,
  Timestamp,
  Title,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Tooltip,
} from "@patternfly/react-core";
import {
  CalendarWeekIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  CompressIcon,
  ExpandIcon,
  ExternalLinkAltIcon,
  FilterIcon,
  HelpIcon,
  StampIcon,
} from "@patternfly/react-icons";
import Link from "next/link";
import React, { useState } from "react";
import icon from "../docs/icon-dark.png";

const TOPICS = [
  ["HRT", "hrt"],
  ["FFS", "ffs"],
  ["SRS", "srs"],
  ["Domperidone", "domperidone"],
  ["Ibutamoren", "ibutamoren"],
  ["Depression", "depression"],
  ["Coming Out", "coming-out"],
  ["Substance Use", "substance-use"],
];

interface IEntry {
  date: Date;
  title: string;
  text: string;
  topics: string[];
}

const ENTRIES: IEntry[] = [
  {
    date: new Date("2023-01-03 10:30"),
    title: "Dolor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit …",
    topics: ["substance-use"],
  },
  {
    date: new Date("2023-01-20 11:30"),
    title: "Lorem",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit …",
    topics: ["coming-out"],
  },
  {
    date: new Date("2023-01-23 09:30"),
    title: "Lorem",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit …",
    topics: ["hrt"],
  },
  {
    date: new Date("2023-01-23 16:30"),
    title: "Ipsum",
    text: "Dolor sit amet consectetur adipisicing elit lorem ipsum …",
    topics: ["ffs", "hrt"],
  },
  {
    date: new Date("2023-01-24"),
    title: "Amet",
    text: "Dolor sit amet consectetur adipisicing elit lorem ipsum …",
    topics: ["ffs", "domperidone"],
  },
  {
    date: new Date("2023-01-25"),
    title: "Consectur",
    text: "Dolor sit amet consectetur adipisicing elit lorem ipsum …",
    topics: ["coming-out"],
  },
  {
    date: new Date("2023-01-26"),
    title: "Ducimus",
    text: "Dolor sit amet consectetur adipisicing elit lorem ipsum …",
    topics: ["substance-use", "ibutamoren"],
  },
];

const TopicsChips: React.FC<{ topics: string[]; className?: string }> = ({
  topics,
  ...otherProps
}) => (
  <ChipGroup {...otherProps}>
    {topics?.map((t, i) => (
      <Chip isReadOnly key={i} className={"pf-x-c-chip pf-x-c-chip--" + t}>
        {t}
      </Chip>
    ))}
  </ChipGroup>
);

interface IEntryCardProps {
  entry: IEntry;
  onClick: () => void;
  selected: boolean;
  showDate?: boolean;
}

const EntryCard: React.FC<IEntryCardProps> = ({
  entry,
  onClick,
  selected,
  showDate,
  ...otherProps
}) => (
  <Card
    isSelectable
    isFlat
    isCompact
    isRounded
    onKeyDown={(e) => e.key === " " && onClick()}
    onClick={onClick}
    onSelectableInputChange={onClick}
    isSelectableRaised
    isSelected={selected}
    hasSelectableInput
    selectableInputAriaLabel="Select this card"
    className={
      "pf-c-card--preview pf-u-color-300 " +
      entry.topics.reduce((prev, curr) => `${prev} pf-c-card--${curr}`, "")
    }
    {...otherProps}
  >
    <CardTitle>{entry.title}</CardTitle>
    <CardBody>{entry.text}</CardBody>
    <CardFooter>
      <Flex
        justifyContent={{
          default: "justifyContentSpaceBetween",
        }}
        alignItems={{
          default: "alignItemsCenter",
        }}
      >
        {showDate && (
          <FlexItem>
            {entry.date.toLocaleTimeString("default", {
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </FlexItem>
        )}

        <FlexItem>
          <TopicsChips topics={entry.topics} />
        </FlexItem>
      </Flex>
    </CardFooter>
  </Card>
);

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [nsfw, setNSFW] = useState(false);
  const [detail, setDetail] = useState(75);
  const [activeTab, setActiveTab] = useState(0);
  const [filters, setFilters] = useState(false);
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(-1);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [startingDate] = useState(new Date("2020-01-13"));
  const [totalWeeks] = useState(56);
  const [diaryEntryFullscreen, setDiaryEntryFullscreen] = useState(false);
  const [activeTopics, setActiveTopics] = useState([
    "hrt",
    "ffs",
    "srs",
    "domperidone",
    "ibutamoren",
    "depression",
    "coming-out",
    "substance-use",
  ]);
  const [scale, setScale] = useState("week");

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
                {TOPICS.map((el, i) => (
                  <NavItem
                    component="button"
                    itemId={i}
                    key={i}
                    isActive={activeTopics.includes(el[1])}
                    onClick={() =>
                      setActiveTopics((o) =>
                        o.includes(el[1])
                          ? o.filter((j) => j !== el[1])
                          : [...o, el[1]]
                      )
                    }
                    className={"pf-x-navlink-" + el[1]}
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
        <Drawer isExpanded={selectedEntryIndex >= 0}>
          <DrawerContent
            className="pf-m-no-background"
            panelContent={
              <DrawerPanelContent
                widths={
                  diaryEntryFullscreen
                    ? {
                        default: "width_100",
                      }
                    : {
                        lg: "width_50",
                        xl: "width_33",
                        "2xl": "width_33",
                      }
                }
              >
                <DrawerHead>
                  <Title headingLevel="h2" size="xl">
                    {ENTRIES[selectedEntryIndex]?.title}
                  </Title>

                  <div className="pf-u-mt-sm">
                    {ENTRIES[selectedEntryIndex]?.date.toLocaleString(
                      "default",
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        weekday: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>

                  <TopicsChips
                    className="pf-u-mt-sm"
                    topics={ENTRIES[selectedEntryIndex]?.topics}
                  />

                  <DrawerActions>
                    <Button
                      variant="plain"
                      onClick={() =>
                        setSelectedEntryIndex((e) => (e - 1 < 0 ? e : e - 1))
                      }
                    >
                      <ChevronLeftIcon />
                    </Button>

                    <Button
                      variant="plain"
                      onClick={() => setDiaryEntryFullscreen((v) => !v)}
                      className="pf-u-display-none pf-u-display-block-on-md"
                    >
                      {diaryEntryFullscreen ? <CompressIcon /> : <ExpandIcon />}
                    </Button>

                    <Button
                      variant="plain"
                      onClick={() =>
                        setSelectedEntryIndex((e) =>
                          e + 1 >= ENTRIES.length ? e : e + 1
                        )
                      }
                    >
                      <ChevronRightIcon />
                    </Button>

                    <Divider
                      orientation={{ default: "vertical" }}
                      inset={{ default: "insetSm" }}
                      className="pf-u-mx-sm"
                    />

                    <DrawerCloseButton
                      onClick={() => setSelectedEntryIndex(-1)}
                    />
                  </DrawerActions>
                </DrawerHead>
                <DrawerPanelBody>
                  <Flex
                    spaceItems={{ default: "spaceItemsLg" }}
                    direction={{ default: "column" }}
                  >
                    <FlexItem>
                      <p>{ENTRIES[selectedEntryIndex]?.text}</p>
                    </FlexItem>
                  </Flex>
                </DrawerPanelBody>
              </DrawerPanelContent>
            }
          >
            <DrawerContentBody className="pf-c-drawer__body---centered">
              <Panel>
                <PanelMain>
                  <PanelMainBody>
                    <Flex
                      justifyContent={{
                        default: "justifyContentSpaceBetween",
                      }}
                      alignItems={{
                        default: "alignItemsCenter",
                      }}
                    >
                      <FlexItem className="pf-u-my-sm pf-u-my-0-on-sm pf-u-mr-md pf-u-display-none pf-u-display-block-on-sm">
                        <CalendarWeekIcon className="pf-u-mr-sm" />{" "}
                        <div className="pf-x-timestamp-wrapper pf-u-display-inline">
                          <Timestamp
                            dateFormat="short"
                            date={
                              new Date(
                                startingDate.getTime() +
                                  (currentWeek - 1) * 7 * 24 * 60 * 60 * 1000
                              )
                            }
                          />
                          {" - "}
                          <Timestamp
                            dateFormat="short"
                            date={
                              new Date(
                                startingDate.getTime() +
                                  currentWeek * 7 * 24 * 60 * 60 * 1000
                              )
                            }
                          />
                        </div>
                      </FlexItem>

                      <FlexItem className="pf-u-my-sm pf-u-my-0-on-sm pf-x-pagination">
                        <Toolbar className="pf-u-py-0">
                          <ToolbarContent className="pf-u-px-0">
                            <ToolbarItem>
                              <FormSelect
                                value={scale}
                                onChange={setScale}
                                aria-label="Scale input"
                              >
                                {[
                                  { value: "week", label: "Week" },
                                  { value: "month", label: "Month" },
                                  { value: "list", label: "List" },
                                ].map((el, i) => (
                                  <FormSelectOption
                                    key={i}
                                    value={el.value}
                                    label={el.label}
                                  />
                                ))}
                              </FormSelect>
                            </ToolbarItem>

                            <ToolbarGroup>
                              <ToolbarItem className="pf-u-mx-0">
                                <Button
                                  variant="plain"
                                  onClick={() =>
                                    setCurrentWeek((d) => {
                                      const newValue = d - 1;

                                      if (
                                        newValue <= totalWeeks - 1 &&
                                        newValue > 0
                                      ) {
                                        return newValue;
                                      }

                                      return d;
                                    })
                                  }
                                >
                                  <ChevronLeftIcon />
                                </Button>
                              </ToolbarItem>

                              <ToolbarItem className="pf-u-mx-0">
                                <TextInput
                                  min="0"
                                  value={currentWeek}
                                  type="number"
                                  onChange={(value) => {
                                    const newValue = parseInt(value);

                                    if (
                                      newValue <= totalWeeks &&
                                      newValue > 0
                                    ) {
                                      setCurrentWeek(newValue);
                                    }
                                  }}
                                  aria-label="Current day input"
                                  style={{
                                    width:
                                      currentWeek.toString().length + 4 + "ch",
                                  }}
                                  className="pf-u-mx-sm"
                                />
                                <span>of {totalWeeks}</span>
                              </ToolbarItem>

                              <ToolbarItem className="pf-u-mx-0">
                                <Button
                                  variant="plain"
                                  onClick={() =>
                                    setCurrentWeek((d) => {
                                      const newValue = d + 1;

                                      if (
                                        newValue <= totalWeeks &&
                                        newValue > 0
                                      ) {
                                        return newValue;
                                      }

                                      return d;
                                    })
                                  }
                                >
                                  <ChevronRightIcon />
                                </Button>
                              </ToolbarItem>
                            </ToolbarGroup>
                          </ToolbarContent>
                        </Toolbar>
                      </FlexItem>
                    </Flex>
                  </PanelMainBody>
                </PanelMain>
              </Panel>

              {scale === "week" && (
                <Grid className="pf-x-c-grid pf-x-c-grid--week pf-u-p-md">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, i) => (
                      <GridItem span={1} key={i}>
                        <div className="pf-x-c-grid__header">{day}</div>

                        {ENTRIES.map((v, id) => ({ id, ...v }))
                          .filter(
                            (e) =>
                              e.date.getDay() == i &&
                              activeTopics.filter((v) => e.topics.includes(v))
                                .length > 0
                          )
                          .map((entry) => (
                            <EntryCard
                              key={entry.id}
                              entry={entry}
                              selected={selectedEntryIndex === entry.id}
                              onClick={() =>
                                setSelectedEntryIndex((e) =>
                                  e === entry.id ? -1 : entry.id
                                )
                              }
                            />
                          ))}
                      </GridItem>
                    )
                  )}
                </Grid>
              )}

              {scale === "month" && (
                <Grid className="pf-x-c-grid pf-x-c-grid--month pf-u-p-md">
                  {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => (
                    <GridItem span={1} key={i}>
                      <div className="pf-x-c-grid__header">{week}</div>

                      {ENTRIES.map((v, id) => ({ id, ...v }))
                        .filter(
                          (e) =>
                            Math.ceil(
                              (e.date.getDate() +
                                new Date(
                                  e.date.getFullYear(),
                                  e.date.getMonth(),
                                  1
                                ).getDay()) /
                                7
                            ) ==
                              i + 1 &&
                            activeTopics.filter((v) => e.topics.includes(v))
                              .length > 0
                        )
                        .map((entry) => (
                          <EntryCard
                            key={entry.id}
                            entry={entry}
                            selected={selectedEntryIndex === entry.id}
                            onClick={() =>
                              setSelectedEntryIndex((e) =>
                                e === entry.id ? -1 : entry.id
                              )
                            }
                            showDate
                          />
                        ))}
                    </GridItem>
                  ))}
                </Grid>
              )}

              <Panel>
                <PanelMain>
                  <PanelMainBody>
                    <Flex
                      justifyContent={{
                        default: "justifyContentSpaceBetween",
                      }}
                      alignItems={{
                        default: "alignItemsCenter",
                      }}
                    >
                      <FlexItem className="pf-u-my-sm pf-u-my-0-on-sm pf-u-mr-md">
                        <a
                          href="https://github.com/morniteaque/diary"
                          target="_blank"
                          rel="noreferrer"
                          className="pf-x-u-color--unset"
                        >
                          © 2023 Emmeryn Adkin, Felicitas Pojtinger and
                          contributors
                        </a>
                      </FlexItem>

                      <FlexItem className="pf-u-my-sm pf-u-my-0-on-sm">
                        <Link href="/imprint" className="pf-x-u-color--unset">
                          <StampIcon className="pf-u-mr-sm" />
                          Imprint
                        </Link>
                      </FlexItem>
                    </Flex>
                  </PanelMainBody>
                </PanelMain>
              </Panel>
            </DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </PageSection>
    </Page>
  );
}
