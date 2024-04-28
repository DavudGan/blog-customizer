import arrow from 'src/images/arrow.svg';
import { clsx } from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	isFormOpen: boolean;
	toggleForm: OnClick;
}

export const ArrowButton = ({ isFormOpen, toggleForm }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container]: isFormOpen === false,
				[styles.container_open]: isFormOpen === true,
			})}
			onClick={toggleForm}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow]: isFormOpen === false,
					[styles.arrow_open]: isFormOpen === true,
				})}
			/>
		</div>
	);
};
