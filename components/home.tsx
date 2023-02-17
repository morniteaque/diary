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
import React, { ReactNode, useEffect, useRef, useState } from "react";
import icon from "../docs/icon-dark.png";

const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
const DIARY_DETAIL_KEY = "diary.detail";

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
  day: number;
  date: Date;
  title: string;
  text: string;
  topics: string[];
  detail: number;
  nsfw: boolean;
}

const ENTRIES: IEntry[] = [
  {
    day: 0,
    date: new Date("2023-01-03 10:30"),
    title: "Dolor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit …",
    topics: ["substance-use"],
    detail: 10,
    nsfw: false,
  },
  {
    day: 17,
    date: new Date("2023-01-20 11:30"),
    title: "Lorem",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit …",
    topics: ["coming-out"],
    detail: 1,
    nsfw: false,
  },
  {
    day: 20,
    date: new Date("2023-01-23 09:30"),
    title: "Lorem",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit …",
    topics: ["hrt"],
    detail: 65,
    nsfw: false,
  },
  {
    day: 20,
    date: new Date("2023-01-23 16:30"),
    title: "Ipsum",
    text: "Dolor sit amet consectetur adipisicing elit lorem ipsum …",
    topics: ["ffs", "hrt"],
    detail: 20,
    nsfw: true,
  },
  {
    day: 21,
    date: new Date("2023-01-24"),
    title: "Amet",
    text: "Dolor sit amet consectetur adipisicing elit lorem ipsum …",
    topics: ["ffs", "domperidone"],
    detail: 30,
    nsfw: false,
  },
  {
    day: 22,
    date: new Date("2023-01-25"),
    title: "Consectur",
    text: "Dolor sit amet consectetur adipisicing elit lorem ipsum …",
    topics: ["coming-out"],
    detail: 40,
    nsfw: false,
  },
  {
    day: 23,
    date: new Date("2023-01-26"),
    title: "Ducimus",
    text: "Dolor sit amet consectetur adipisicing elit lorem ipsum …",
    topics: ["substance-use", "ibutamoren"],
    detail: 100,
    nsfw: true,
  },
  {
    day: 30,
    date: new Date("2023-02-02"),
    title: "Ducimusss",
    text: "Dolor sit amet consectetur adipisicing elit lorem ipsum …",
    topics: ["substance-use", "ibutamoren"],
    detail: 50,
    nsfw: true,
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
  id: string;
  entry: IEntry;
  onClick: () => void;
  selected: boolean;
  showDate?: boolean;
  showDay?: boolean;
  showMonth?: boolean;
}

const EntryCard: React.FC<IEntryCardProps> = ({
  id,
  entry,
  onClick,
  selected,
  showDate,
  showDay,
  showMonth,
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
    id={id}
    selectableInputAriaLabel={`Select card with title ${entry.title}`}
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
        <FlexItem>
          {showDate
            ? entry.date.toLocaleTimeString("default", {
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
                month: showMonth ? "short" : undefined,
                day: showMonth ? "numeric" : undefined,
              })
            : entry.date.toLocaleTimeString("default", {
                hour: "numeric",
                minute: "numeric",
              })}

          {showDay && (
            <>
              {" "}
              · <span>Day {entry.day}</span>
            </>
          )}
        </FlexItem>

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
  const [detail, setDetail] = useState(100);
  const [activeTab, setActiveTab] = useState(0);
  const [filters, setFilters] = useState(false);
  const [selectedEntryID, setSelectedEntryID] = useState(-1);
  const [currentPagination, setCurrentPagination] = useState(1);
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

  useEffect(() => {
    const v = localStorage.getItem("diary.detail") || "100";

    setDetail(parseInt(v));
  }, []);

  useEffect(() => {
    localStorage.setItem(DIARY_DETAIL_KEY, detail.toString());
  }, [detail]);

  let { earliestEntryDate, earliestEntry, latestEntryDate } = ENTRIES.reduce(
    (prev, curr) => {
      if (!prev.earliestEntryDate || curr.date < prev.earliestEntryDate) {
        prev.earliestEntryDate = curr.date;
        prev.earliestEntry = curr;
      }

      if (!prev.latestEntryDate || curr.date > prev.latestEntryDate) {
        prev.latestEntryDate = curr.date;
      }

      return prev;
    },
    {
      earliestEntryDate: new Date(),
      earliestEntry: {} as IEntry,
      latestEntryDate: new Date(),
    }
  );

  let maxPages = 0;

  let pageStartIndex = 0;
  let pageEndIndex = 0;

  let pageStartDate = new Date();
  let pageEndDate = new Date();

  const filter = (e: IEntry) =>
    activeTopics.filter((v) => e.topics.includes(v)).length > 0 &&
    e.detail <= detail &&
    nsfw
      ? true
      : !e.nsfw;

  switch (scale) {
    case "week": {
      maxPages = Math.round(
        (latestEntryDate.getTime() - earliestEntryDate.getTime()) /
          (DAY_MILLISECONDS * 7)
      );

      pageStartDate = new Date(
        earliestEntryDate.getFullYear(),
        earliestEntryDate.getMonth(),
        1 + (currentPagination - 1) * 7
      );

      pageEndDate = new Date(
        earliestEntryDate.getFullYear(),
        earliestEntryDate.getMonth(),
        0 + currentPagination * 7
      );

      pageStartIndex = ENTRIES.findIndex(
        (e) =>
          e.date.getTime() >= pageStartDate.getTime() &&
          e.date.getTime() <= pageEndDate.getTime()
      );

      // See https://github.com/microsoft/TypeScript/issues/48829
      pageEndIndex =
        (ENTRIES as any).findLastIndex(
          (e: IEntry) =>
            e.date.getTime() >= pageStartDate.getTime() &&
            e.date.getTime() <= pageEndDate.getTime()
        ) + 1;

      break;
    }
    case "month": {
      maxPages = latestEntryDate.getMonth() - earliestEntryDate.getMonth() + 1;

      pageStartDate = new Date(
        earliestEntryDate.getFullYear(),
        earliestEntryDate.getMonth() + (currentPagination - 1),
        1
      );

      pageEndDate = new Date(
        earliestEntryDate.getFullYear(),
        earliestEntryDate.getMonth() + currentPagination,
        0
      );

      pageStartIndex = ENTRIES.findIndex(
        (e) =>
          e.date.getTime() >= pageStartDate.getTime() &&
          e.date.getTime() <= pageEndDate.getTime()
      );

      // See https://github.com/microsoft/TypeScript/issues/48829
      pageEndIndex =
        (ENTRIES as any).findLastIndex(
          (e: IEntry) =>
            e.date.getTime() >= pageStartDate.getTime() &&
            e.date.getTime() <= pageEndDate.getTime()
        ) + 1;

      break;
    }
    case "page": {
      const filteredEntries = ENTRIES.filter(filter);

      maxPages = Math.ceil(filteredEntries.length / 4);

      pageStartIndex =
        currentPagination - 1 <= 0 ? 0 : (currentPagination - 1) * 4;
      pageEndIndex = currentPagination - 1 <= 0 ? 4 : currentPagination * 4;
      if (!filteredEntries[pageEndIndex]) pageEndIndex = filteredEntries.length;

      pageStartDate = filteredEntries[pageStartIndex].date;
      pageEndDate = filteredEntries[pageEndIndex - 1].date;

      break;
    }
  }

  const entriesToShow =
    scale === "page"
      ? ENTRIES.map((v, id) => ({ id, ...v }))
          .filter(filter)
          .slice(pageStartIndex, pageEndIndex)
      : ENTRIES.map((v, id) => ({ id, ...v }))
          .slice(pageStartIndex, pageEndIndex)
          .filter(filter);

  let wentBackwards = useRef(false);
  useEffect(() => {
    if (
      (selectedEntryID == -1 ||
        entriesToShow.find((e) => e.id === selectedEntryID)) &&
      !(activeTopics.length > 0 && entriesToShow.length === 0)
    ) {
      wentBackwards.current = false;

      return;
    }

    setCurrentPagination((d) => {
      if (wentBackwards.current) {
        const newValue = d - 1;

        if (newValue <= maxPages - 1 && newValue > 0) {
          return newValue;
        }

        return 1;
      }

      const newValue = d + 1;

      if (newValue <= maxPages && newValue > 0) {
        return newValue;
      }

      return 1;
    });
  }, [selectedEntryID, currentPagination, detail, activeTopics, nsfw]);

  return (
    <Page
      className="pf-c-page--background"
      header={
        <PageHeader
          logo={<Brand src={icon.src} alt="Diary logo" />}
          logoComponent={Link as unknown as ReactNode}
          logoProps={{
            href: "/",
          }}
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
                    href="https://ko-fi.com/aphreditto"
                    component="a"
                    target="_blank"
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
                      setActiveTopics((o) => {
                        const newTopics = o.includes(el[1])
                          ? o.filter((j) => j !== el[1])
                          : [...o, el[1]];

                        if (newTopics.length < 1) {
                          return o;
                        }

                        return newTopics;
                      })
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
                          min={1}
                          max={100}
                          value={detail}
                          isInputVisible
                          inputPosition="right"
                          inputValue={detail}
                          inputLabel="%"
                          onChange={(e) => {
                            if (e > 0 && e <= 100) {
                              setDetail(e);
                            }
                          }}
                          onInputCapture={(e) => {
                            const newDetail = parseInt(
                              (e.target as HTMLInputElement).value
                            );

                            if (newDetail > 0 && newDetail <= 100) {
                              setDetail(newDetail);
                            }
                          }}
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
                          content="Toggle the available filters (coming soon)"
                          position="bottom"
                        >
                          <ToggleGroupItem
                            icon={<FilterIcon />}
                            aria-label="Toggle the available filters (coming soon)"
                            isSelected={filters}
                            onChange={() => setFilters((v) => !v)}
                            isDisabled
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
                          content="Toggle the available filters (coming soon)"
                          position="bottom"
                        >
                          <ToggleGroupItem
                            icon={<FilterIcon />}
                            aria-label="Toggle the available filters (coming soon)"
                            isSelected={filters}
                            onChange={() => setFilters((v) => !v)}
                            isDisabled
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
        <Drawer isExpanded={selectedEntryID >= 0}>
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
                    {ENTRIES[selectedEntryID]?.title}
                  </Title>

                  <div className="pf-u-mt-sm">
                    {ENTRIES[selectedEntryID]?.date.toLocaleString("default", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      weekday: "long",
                      hour: "numeric",
                      minute: "numeric",
                    })}{" "}
                    ·{" "}
                    <span className="pf-u-color-300">
                      Day {ENTRIES[selectedEntryID]?.day}
                    </span>
                  </div>

                  <TopicsChips
                    className="pf-u-mt-sm"
                    topics={ENTRIES[selectedEntryID]?.topics}
                  />

                  <DrawerActions>
                    <Button
                      variant="plain"
                      onClick={() =>
                        setSelectedEntryID((e) => (e - 1 < 0 ? e : e - 1))
                      }
                      aria-label="Go one page pack"
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
                        setSelectedEntryID((e) =>
                          e + 1 >= ENTRIES.length ? e : e + 1
                        )
                      }
                      aria-label="Go one page forward"
                    >
                      <ChevronRightIcon />
                    </Button>

                    <Divider
                      orientation={{ default: "vertical" }}
                      inset={{ default: "insetSm" }}
                      className="pf-u-mx-sm"
                    />

                    <DrawerCloseButton onClick={() => setSelectedEntryID(-1)} />
                  </DrawerActions>
                </DrawerHead>
                <DrawerPanelBody>
                  <Flex
                    spaceItems={{ default: "spaceItemsLg" }}
                    direction={{ default: "column" }}
                  >
                    <FlexItem>
                      <p>{ENTRIES[selectedEntryID]?.text}</p>
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
                          <Timestamp dateFormat="short" date={pageStartDate} />
                          {" - "}
                          <Timestamp dateFormat="short" date={pageEndDate} />
                        </div>
                      </FlexItem>

                      <FlexItem className="pf-u-my-sm pf-u-my-0-on-sm pf-x-pagination">
                        <Toolbar className="pf-u-py-0">
                          <ToolbarContent className="pf-u-px-0">
                            <ToolbarItem>
                              <FormSelect
                                value={scale}
                                onChange={(v) => {
                                  setCurrentPagination(1);
                                  setScale(v);
                                }}
                                aria-label="Scale input"
                              >
                                {[
                                  { value: "week", label: "Week" },
                                  { value: "month", label: "Month" },
                                  { value: "page", label: "Page" },
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
                                    setCurrentPagination((d) => {
                                      wentBackwards.current = true;

                                      const newValue = d - 1;

                                      if (
                                        newValue <= maxPages - 1 &&
                                        newValue > 0
                                      ) {
                                        return newValue;
                                      }

                                      return d;
                                    })
                                  }
                                  aria-label="Go one page pack"
                                >
                                  <ChevronLeftIcon />
                                </Button>
                              </ToolbarItem>

                              <ToolbarItem className="pf-u-mx-0">
                                <TextInput
                                  min="0"
                                  value={currentPagination}
                                  type="number"
                                  onChange={(value) => {
                                    const newValue = parseInt(value);

                                    if (newValue <= maxPages && newValue > 0) {
                                      setCurrentPagination(newValue);
                                    }
                                  }}
                                  aria-label="Current day input"
                                  style={{
                                    width:
                                      currentPagination.toString().length +
                                      4 +
                                      "ch",
                                  }}
                                  className="pf-u-mx-sm"
                                />
                                <span>of {maxPages}</span>
                              </ToolbarItem>

                              <ToolbarItem className="pf-u-mx-0">
                                <Button
                                  variant="plain"
                                  onClick={() =>
                                    setCurrentPagination((d) => {
                                      wentBackwards.current = false;

                                      const newValue = d + 1;

                                      if (
                                        newValue <= maxPages &&
                                        newValue > 0
                                      ) {
                                        return newValue;
                                      }

                                      return d;
                                    })
                                  }
                                  aria-label="Go one page forward"
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
                        <div className="pf-x-c-grid__header">
                          {day} ·{" "}
                          <span className="pf-u-color-300">
                            Day{" "}
                            {earliestEntry.day +
                              ((currentPagination - 1) * DAY_MILLISECONDS * 7 +
                                i * DAY_MILLISECONDS) /
                                DAY_MILLISECONDS -
                              earliestEntryDate.getDay()}
                          </span>
                        </div>

                        {entriesToShow
                          .filter((e) => e.date.getDay() == i)
                          .map((entry) => (
                            <EntryCard
                              id={entry.id.toString()}
                              key={entry.id}
                              entry={entry}
                              selected={selectedEntryID === entry.id}
                              onClick={() =>
                                setSelectedEntryID((e) =>
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

                      {entriesToShow
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
                            i + 1
                        )
                        .map((entry) => (
                          <EntryCard
                            id={entry.id.toString()}
                            key={entry.id}
                            entry={entry}
                            selected={selectedEntryID === entry.id}
                            onClick={() =>
                              setSelectedEntryID((e) =>
                                e === entry.id ? -1 : entry.id
                              )
                            }
                            showDate
                            showDay
                          />
                        ))}
                    </GridItem>
                  ))}
                </Grid>
              )}

              {scale === "page" && (
                <div className="pf-x-c-page">
                  <Grid className="pf-x-c-grid pf-u-p-md" hasGutter>
                    {entriesToShow.map((entry) => (
                      <GridItem span={12} md={6} key={entry.id}>
                        <EntryCard
                          id={entry.id.toString()}
                          entry={entry}
                          selected={selectedEntryID === entry.id}
                          onClick={() =>
                            setSelectedEntryID((e) =>
                              e === entry.id ? -1 : entry.id
                            )
                          }
                          showDate
                          showDay
                          showMonth
                        />
                      </GridItem>
                    ))}
                  </Grid>
                </div>
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
                        <Tooltip
                          content="No imprint is required for this site as it is not for profit and does not operate as a newspaper or blog."
                          position="left-end"
                          enableFlip
                        >
                          <Link href="#" className="pf-u-color-200">
                            <StampIcon className="pf-u-mr-sm" />
                            Imprint
                          </Link>
                        </Tooltip>
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
