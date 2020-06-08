import React from 'react';

import './tab-panel.scss';

import { Icon } from '../icon';
import { useSession } from '../../hooks';
import { RowLayout, StackLayout } from '../../layouts';

export const TabPanel = ({ tabs = {}, name = '', className, style, ...rest } = {}) => {
    const defaultTabId = Object.keys(tabs).length
        ? Object.keys(tabs)[0]
        : null;
    const [ activeTabId, setActiveTabId ] = useSession(`tabs/${name}`, defaultTabId);
    
    return (
        <StackLayout className="ak-tabs">
            <RowLayout className="ak-tabs-header">
                {Object.entries(tabs).map(([ tabId, tab ]) => (
                    <button
                        key={tabId}
                        onClick={() => setActiveTabId(tabId)}
                        className={`ak-tab-button ak-tab--${activeTabId === tabId ? 'active' : 'inactive'}`}>
                        {tab.icon ? <Icon fa={tab.icon} /> : null}
                        <span>{tab.title || tabId}</span>
                    </button>
                ))}
                <div className="ak-tab-spacer">&nbsp;</div>
            </RowLayout>
            
            <StackLayout className="ak-tabs-content">
                {Object.entries(tabs)
                    .filter(([ tabId, tab ]) => tabId === activeTabId)
                    .map(([ tabId, tab ]) => <div key={tabId}><tab.content /></div>)}
            </StackLayout>
        </StackLayout>
    );
}