import { useState, CSSProperties } from 'react';

import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColors] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

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
