import React, { Component, ErrorInfo } from "react";

export type HandleError = (error: {
  error: Error;
  errorInfo: ErrorInfo;
}) => Promise<void>;

export type FallbackProps = { resetError: () => void };

const defaultHandleError: HandleError = ({ error }) =>
  Promise.resolve(console.error(error));

const defaultFallback: React.FC<FallbackProps> = ({ resetError }) => (
  <>
    <h1>Oops, something went wrong.</h1>
    <button
      onClick={(event) => {
        event.preventDefault();
        resetError();
      }}
    >
      Reset Error
    </button>
  </>
);

type ErrorBoundaryProps = {
  onError?: HandleError;
  onReset?: () => void;
  fallback?: React.FC<FallbackProps>;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  state = {
    hasError: false,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError = defaultHandleError } = this.props;

    onError({ error, errorInfo });
  }

  resetError() {
    const { onReset } = this.props;
    if (onReset) {
      onReset();
    }

    this.setState({ hasError: false });
  }

  render() {
    const { resetError } = this;
    const { hasError } = this.state;
    const { children, fallback: Fallback = defaultFallback } = this.props;

    return hasError ? <Fallback resetError={resetError} /> : children;
  }
}
