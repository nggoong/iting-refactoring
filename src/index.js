import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserProvider from './context/UserProvider';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from './components/scroll/ScrollToTop';

import Loading from './components/loading/Loading';

Sentry.init({
	dsn: 'https://e811b519a47f4967ab7c164c201fccb9@o1397196.ingest.sentry.io/6722339',
	integrations: [new BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true
		}
	}
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<UserProvider>
			<React.Suspense fallback={<Loading />}>
				<QueryClientProvider client={queryClient}>
					{/* <ReactQueryDevtools initialIsOpen={true} /> */}
					<ScrollToTop />
					<App />
				</QueryClientProvider>
			</React.Suspense>
		</UserProvider>
	</BrowserRouter>
);

reportWebVitals();
