import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			mainBlue: string;
			lightBlue: string;
			backgroundGray: string;
			lightGray: string;
			mediumGray: string;
			darkGray: string;

			searchBlue: string;
			searchTextGray: string;
			searchIconBlue: string;
			hrGray: string;
		};
	}
}
