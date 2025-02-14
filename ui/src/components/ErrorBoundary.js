import React, { Component } from "react"

const extractComponentName = (stack) => {
    const match = stack.match(/\s+at\s+([A-Za-z0-9_$.]+)/);
    return match ? match[1] : "Unknown Component";
};

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, componentName: null };
    }

    componentDidCatch(error, errorInfo) {
        const componentName = extractComponentName(errorInfo.componentStack);
        this.setState({ hasError: true, error, componentName })
        console.error("Error:", error)
        console.error("Component Stack:", errorInfo.componentStack)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong in {this.state.componentName}.</h2>
                    <p>{this.state.error?.toString()}</p>
                    <pre>{this.state.error?.stack}</pre> 
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary