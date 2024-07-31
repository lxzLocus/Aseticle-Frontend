"use client";

import '@radix-ui/themes/styles.css';
import { Theme, Flex, Text, Box, TextField, IconButton, Switch, Badge, CheckboxCards, Select, SegmentedControl } from '@radix-ui/themes';
import { MagnifyingGlassIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';

//testdata
import { data } from './testdata.js';

// 定義
interface Item {
    url: string;
    title: string;
    author: string;
    conference: string;
    pages: number;
    date: string;
    abstract: string;
    cite_num: number;
    submitted: boolean;
    relevant_no: number;
    tier: number;
}

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            setDarkMode(JSON.parse(savedDarkMode));
        }
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('darkMode', JSON.stringify(darkMode));
        }
    }, [darkMode, isClient]);

    if (!isClient) {
        return null;
    }

    const imageSrc = darkMode ? '/images/DarkMode.png' : '/images/Nomal.png';

    return (
        <Theme
            appearance={darkMode ? 'dark' : 'light'}
            accentColor="mint"
            grayColor="gray"
            panelBackground="solid"
            scaling="100%"
            radius="full"
        >
            <div className={styles.centeredContainer}>
                <div
                    className={styles.topBar}
                    style={{
                        boxShadow: darkMode
                            ? '0 2px 4px rgba(255, 255, 255, 0.1)'
                            : '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <img src={imageSrc} alt="logo" className={styles.image} />
                    <Query />
                    <div className={styles.switchLabelContainer}>
                        <Text className={styles.switchLabel}>Dark Mode</Text>
                        <Switch
                            variant="surface"
                            checked={darkMode}
                            onCheckedChange={(checked) => setDarkMode(checked)}
                        />
                    </div>
                </div>
                <div className={styles.countBar}
                    style={{
                        boxShadow: darkMode
                            ? '0 2px 4px rgba(255, 255, 255, 0.1)'
                            : '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Text>Content Items: {data.length}</Text>
                </div>
                <div className={styles.mainContainer}>
                    <ListContainer />
                    <div className={styles.contentContainer}>
                        {data.map((item, index) => (
                            <ContentItem key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </Theme>
    );
}

function Query() {
    return (
        <Flex direction="row" gap="3" className={styles.queryFlex}>
            <Box>
                <TextField.Root placeholder="Search the scholar…" size="3" className={styles.textField}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                    <TextField.Slot pr="3">
                        <IconButton size="2" variant="ghost">
                            <ArrowRightIcon height="16" width="16" />
                        </IconButton>
                    </TextField.Slot>
                </TextField.Root>
            </Box>
        </Flex>
    );
}

function ContentItem({ item }: { item: Item }) {
    return (
        <div className={styles.arrayItemContainer}>
            <div className={styles.itemDetails}>
                <a href={item.url} className={styles.title}>{item.title}</a>
                <p className={styles.author}>{item.author}</p>
                <p className={styles.abstract}>{item.abstract}</p>
                <div className={styles.meta}>
                    <span>{item.date}</span> |
                    <span> {item.pages} pages</span> |
                    <span> Cited: {item.cite_num}</span> |
                    <span> Submitted: {item.submitted ? "Yes" : "No"}</span>
                </div>
            </div>
            <div className={styles.badgeContainer}>
                <Badge size="3" variant="outline" radius="large">Arxiv</Badge>
            </div>
        </div>
    );
}

function ListContainer() {
    const [selectedItem, setSelectedItem] = useState("item1");

    return (
        <div className={styles.listContainer}>
            <SegmentedControl.Root
                value={selectedItem}
                onValueChange={(value) => setSelectedItem(value)}
                className={styles.segmentedControl}
            >
                <SegmentedControl.Item value="item1" className={styles.segmentedControlItem}>
                    Item 1
                </SegmentedControl.Item>
                <SegmentedControl.Item value="item2" className={styles.segmentedControlItem}>
                    Item 2
                </SegmentedControl.Item>
                <SegmentedControl.Item value="item3" className={styles.segmentedControlItem}>
                    Item 3
                </SegmentedControl.Item>
            </SegmentedControl.Root>

            <Select.Root value={selectedItem} onValueChange={(value) => setSelectedItem(value)} >
                <Select.Trigger aria-label="Food" className={styles.selectTrigger}>
                    {/* <Select.Value placeholder="Select an item…" /> */}
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="item1" className={styles.selectItem}>Item 1</Select.Item>
                    <Select.Item value="item2" className={styles.selectItem}>Item 2</Select.Item>
                    <Select.Item value="item3" className={styles.selectItem}>Item 3</Select.Item>
                </Select.Content>
            </Select.Root>

            {/* <div className={styles.checkboxContainer}>
                <CheckboxCards checked className={styles.checkboxCard}>
                    <CheckboxCards.Indicator />
                    <CheckboxCards.Label>Checkbox 1</CheckboxCards.Label>
                </CheckboxCards>
                <CheckboxCards className={styles.checkboxCard}>
                    <CheckboxCards.Indicator />
                    <CheckboxCards.Label>Checkbox 2</CheckboxCards.Label>
                </CheckboxCards>
                <CheckboxCards className={styles.checkboxCard}>
                    <CheckboxCards.Indicator />
                    <CheckboxCards.Label>Checkbox 3</CheckboxCards.Label>
                </CheckboxCards>
            </div> */}
        </div>
    );
}
