import React, { Fragment } from 'react';

import { Inspector } from './inspector';

export class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);

        this.state = { caughtError: null };
    }

    static getDerivedStateFromError(caughtError) {
        return { caughtError };
    }

    componentDidCatch(error, errorInfo) {
        console.info('ErrorBoundary caught:', { error, errorInfo });
    }

    render () {
        const { children, error } = this.props;
        const { caughtError } = this.state;

        const displayableError = caughtError || error;

        return !displayableError ? children : (
            <div className="border-danger pad-30 stack" style={{ borderWidth: '5px', height: '100vh', flexWrap: 'nowrap', overflow: 'auto' }}>
                <p className="text-engraved text-danger margin-0">
                    Error encountered
                </p>

                {displayableError.message && <h2 className="text-italic">{displayableError.message}</h2>}

                <h6 className="text-subtle">Location</h6>
                <h5>{displayableError.fileName} <br/> Line {displayableError.lineNumber}, column {displayableError.columnNumber}</h5>

                {displayableError.contextData && (
                    <Fragment>
                        <h6 className="text-subtle">Context data</h6>
                        <Inspector data={displayableError.contextData}/>
                    </Fragment>
                )}

                <h6 className="text-subtle">Stack trace</h6>
                <small>
                    <blockquote className="border-color-warning">
                        <code>{displayableError.stack}</code>
                    </blockquote>
                </small>
            </div>
        );
    }
};
