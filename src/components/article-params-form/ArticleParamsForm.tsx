import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';
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
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParams = {
	setFontFamily: (fontFamily: OptionType) => void;
	setFontSize: (fontSize: OptionType) => void;
	setFontColors: (fontColor: OptionType) => void;
	setBackgroundColor: (fontColor: OptionType) => void;
	setContentWidth: (fontColor: OptionType) => void;
};

export const ArticleParamsForm = ({
	setFontFamily,
	setFontSize,
	setFontColors,
	setBackgroundColor,
	setContentWidth,
}: ArticleParams) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);

	const [formState, setFormState] = useState(defaultArticleState);

	function updatePageState(formState: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	}) {
		setFontFamily(formState.fontFamilyOption);
		setFontSize(formState.fontSizeOption);
		setFontColors(formState.fontColor);
		setBackgroundColor(formState.backgroundColor);
		setContentWidth(formState.contentWidth);
	}

	const handleResetForm = () => {
		setFormState(defaultArticleState);
		updatePageState(formState);
	};

	const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
		console.log(type + ': ' + value);
		setFormState({
			...formState,
			[type]: value,
		});
	};

	useOutsideClickClose({
		isOpen: isFormOpen,
		onChange: setIsFormOpen,
		rootRef: divRef,
	});

	const toggleForm = () => {
		setIsFormOpen((isFormOpen) => !isFormOpen);
	};

	console.log(formState.fontFamilyOption);

	return (
		<>
			<ArrowButton isFormOpen={isFormOpen} toggleForm={toggleForm} />
			<div ref={divRef}>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isFormOpen === true,
					})}>
					<form
						className={styles.form}
						onSubmit={(event) => {
							event.preventDefault();
							updatePageState(formState);
						}}>
						<Text
							size={31}
							weight={800}
							fontStyle='normal'
							uppercase={true}
							family='open-sans'>
							Задайте параметры
						</Text>
						<Select
							selected={formState.fontFamilyOption}
							onChange={(selectedOption) => {
								handleChange('fontFamilyOption', selectedOption);
							}}
							options={fontFamilyOptions}
							title='шрифт'
						/>
						<RadioGroup
							selected={formState.fontSizeOption}
							name='radio'
							onChange={(selectedOption) =>
								handleChange('fontSizeOption', selectedOption)
							}
							options={fontSizeOptions}
							title='Название радиогруппы'
						/>
						<Select
							selected={formState.fontColor}
							onChange={(selectedOption) =>
								handleChange('fontColor', selectedOption)
							}
							options={fontColors}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={formState.backgroundColor}
							onChange={(selectedOption) =>
								handleChange('backgroundColor', selectedOption)
							}
							options={backgroundColors}
							title='Цвет фона'
						/>
						<Select
							selected={formState.contentWidth}
							onChange={(selectedOption) =>
								handleChange('contentWidth', selectedOption)
							}
							options={contentWidthArr}
							title='Ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={handleResetForm} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
