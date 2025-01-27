import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { useOrgData } from '../hooks/OrgDataContext'; // Custom hook for shared data context
import { WuLoader } from '@npm-questionpro/wick-ui-lib';
import '../DesktopView.css'; // Custom stylesheet

export default function DesktopView() {
    const { orgData, loading, error } = useOrgData(); // Access organization data from context
    const [selection, setSelection] = useState([]);

    // Template for rendering each node in the organization chart
    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <div className="flex flex-column">
                    <div className="flex flex-column align-items-center">
                        <img
                            alt={node.data.name}
                            src={node.data.image}
                            className="mb-3 w-3rem h-3rem rounded-circle"  // Added 'rounded-circle'
                        />
                        <span className="font-bold mb-2">{node.data.name}</span>
                        <span>{node.data.title}</span>
                    </div>
                </div>
            );
        }
    
        return node.label;
    };
    
    if (loading) {
        return (
            <div className="loader">
                <WuLoader color="hsl(208, 80%, 50%)" size="md" />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="card overflow-x-auto">
            <OrganizationChart
                value={orgData}
                selectionMode="multiple"
                selection={selection}
                onSelectionChange={(e) => setSelection(e.data)}
                nodeTemplate={nodeTemplate}
                className="p-organizationchart"
            />
        </div>
    );
}
