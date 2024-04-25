import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useEffect, useRef } from 'react';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
	OptionType,
	defaultArticleState
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';

type ArticleParams = {
	fontFamily: OptionType;
	setFontFamily: (fontFamily: OptionType) => void;
	fontSize: OptionType;
	setFontSize: (fontSize: OptionType) => void;
	fontColor: OptionType;
	setFontColors: (fontColor: OptionType) => void;
	backgroundColor: OptionType;
	setBackgroundColor: (fontColor: OptionType) => void;
	contentWidth: OptionType;
	setContentWidth: (fontColor: OptionType) => void;
};

export const ArticleParamsForm = (props: ArticleParams) => {
	const {
		fontFamily: initialFontFamily,
        fontSize: initialFontSize,
        fontColor: initialFontColor,
        backgroundColor: initialBackgroundColor,
        contentWidth: initialContentWidth,
		setFontFamily,
		setFontSize,
		setFontColors,
		setBackgroundColor,
		setContentWidth,
	} = props;

	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const [tempFontFamily, setTempFontFamily] = useState(initialFontFamily);
    const [tempFontSize, setTempFontSize] = useState(initialFontSize);
    const [tempFontColor, setTempFontColor] = useState(initialFontColor);
    const [tempBackgroundColor, setTempBackgroundColor] = useState(initialBackgroundColor);
    const [tempContentWidth, setTempContentWidth] = useState(initialContentWidth);


    const applyChanges = () => {
        setFontFamily(tempFontFamily);
        setFontSize(tempFontSize);
        setFontColors(tempFontColor);
        setBackgroundColor(tempBackgroundColor);
        setContentWidth(tempContentWidth);
    };

	const resetChanges = () => {
        setFontFamily(defaultArticleState.fontFamilyOption);
        setFontSize(defaultArticleState.fontSizeOption);
        setFontColors(defaultArticleState.fontColor);
        setBackgroundColor(defaultArticleState.backgroundColor);
        setContentWidth(defaultArticleState.contentWidth);
		
		setTempFontFamily(defaultArticleState.fontFamilyOption)
		setTempFontSize(defaultArticleState.fontSizeOption)
		setTempFontColor(defaultArticleState.fontColor)
		setTempBackgroundColor(defaultArticleState.backgroundColor)
		setTempContentWidth(defaultArticleState.contentWidth)
    };



	useEffect(() => {
		const handleOutsideClick = (event: Event) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	const toggleForm = () => {
		setIsFormOpen((isFormOpen) => !isFormOpen);
	};

	return (
		<>
			<ArrowButton isFormOpen={isFormOpen} toggleForm={toggleForm} />
			<aside
				className={`${styles.container} ${
					isFormOpen ? styles.container_open : ''
				}`}>
				<form ref={formRef} className={styles.form}>
					<Text
						children='Задайте параметры'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						family='open-sans'
					/>
					<Select
						selected={tempFontFamily}
						onChange={setTempFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={tempFontSize}
						name='radio'
						onChange={setTempFontSize}
						options={fontSizeOptions}
						title='Название радиогруппы'
					/>
					<Select
						selected={tempFontColor}
						onChange={setTempFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={tempBackgroundColor}
						onChange={setTempBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={tempContentWidth}
						onChange={setTempContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset'onClick={resetChanges} />
						<Button title='Применить' type='button' onClick={applyChanges}/>
					</div>
				</form>
			</aside>
		</>
	);
};
