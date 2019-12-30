import React, { Fragment } from 'react';

import './error-boundary.scss';
import { Inspector } from 'arkade/tools/inspector';
import { Icon } from 'arkade/common';

export class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);

        this.state = { hasError: !!props.error, caughtError: null };
    }

    static getDerivedStateFromError(caughtError) {
        return { hasError: true, caughtError: caughtError };
    }

    componentDidCatch(error, errorInfo) {
        console.info('ErrorBoundary caught:', { error, errorInfo });
    }

    render () {
        const { children, error, className } = this.props;
        const { hasError, caughtError } = this.state;
        const displayableError = caughtError || error;

        return !hasError && !displayableError ? children : (
            <div className={`border-danger pad-30 error-boundary-wrapper ${className || ''}`}>
                <p className="text-engraved margin-0">
                    Exception
                </p>

                {displayableError.message && (
                    <h2 className="text-italic border-color-danger error-boundary-header">
                        {displayableError.message}
                    </h2>
                )}

                <h6 className="text-subtle margin-top-20 margin-bottom-0">Location</h6>
                <h5>{displayableError.fileName} <br/> Line {displayableError.lineNumber}, column {displayableError.columnNumber}</h5>

                {displayableError.contextData && (
                    <Fragment>
                        <h6 className="text-subtle margin-top-20 margin-bottom-0">Context data</h6>
                        <Inspector data={displayableError.contextData}/>
                    </Fragment>
                )}

                <div>
                    <button className="btn btn-primary" onClick={() => window.location.href = window.location.href}>
                        <Icon fa="refresh"/>
                        <span>Reload the page</span>
                    </button>
                </div>

                <details>
                    <summary><h6 className="text-subtle margin-top-20 margin-bottom-0" style={{display:'inline-block'}}>Stack trace</h6></summary>
                    <small>
                        <blockquote className="border-color-warning">
                            <code>{displayableError.stack}</code>
                        </blockquote>
                    </small>
                </details>
            </div>
        );
    }
};
