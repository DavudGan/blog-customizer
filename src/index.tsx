import React, { createContext, useContext, useState } from 'react';

import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);
	const [fontColor, setFontColors] = useState(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);

	console.log(fontFamily);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamily.value,
					'--font-size': fontSize.value,
					'--font-color': fontColor.value,
					'--container-width': contentWidth.value,
					'--bg-color': backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamily={fontFamily}
				fontSize={fontSize}
				fontColor={fontColor}
				backgroundColor={backgroundColor}
				contentWidth={contentWidth}
				setFontFamily={setFontFamily}
				setFontSize={setFontSize}
				setFontColors={setFontColors}
				setBackgroundColor={setBackgroundColor}
				setContentWidth={setContentWidth}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
