import React from 'react';
import Popover from 'react-tiny-popover';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
// import { filterData, sortByKey } from '../../helpers/common-functions';
import styles from './Selector.module.scss';

let inputFocusTimeOut = null;

const Selector = ({ nameForm, data, extraOption, placeholder, onSelectOption, defaultOptionValue }) => {
	const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
	const [dataToSearch, setDataToSearch] = React.useState('');
	const [findingDataArray, setFindingDataArray] = React.useState('');
	const [selectedData, setSelectedData] = React.useState('');
	const inputRef = React.useRef(null);

	React.useEffect(() => {
		if (defaultOptionValue) {
			const defaultOption = data.find((item) => item.value === defaultOptionValue);
			selectCurrentData(defaultOption);
		}
	}, [defaultOptionValue]);

	React.useEffect(() => {
		if (isPopoverOpen) {
			inputFocusTimeOut = setTimeout(() => {
				inputRef.current.focus();
			}, 100);
		}
		return () => {
			clearTimeout(inputFocusTimeOut);
		};
	}, [isPopoverOpen]);

	const handleSearchText = (e) => {
		
		setDataToSearch(e.target.value);

		const options = {
			includeScore: true,
			threshold: 0.45,
			// minMatchCharLength: 3,
			keys: ['description'],
		};
		const fuse = new Fuse(data, options);
		let result = fuse.search(e.target.value);
		
		const resultArray = result.map((result) => result.item);
		setFindingDataArray(resultArray);
	};

	const objectsArray = findingDataArray.length > 0 ? findingDataArray : data;
	const objectsInOrder = objectsArray.sort();
	
	console.log(findingDataArray)
	
	const selectCurrentData = (select) => {
		setSelectedData(select.description);
		setIsPopoverOpen(false);
		onSelectOption(nameForm, select);
	};

	return (
		<div className={styles.selector}>
			<Popover
				isOpen={isPopoverOpen}
				onClickOutside={() => setIsPopoverOpen(false)}
				position={['bottom']}
				padding={10}
				disableReposition
				content={({ position, nudgedLeft, nudgedTop }) => (
					<div className={styles.selectorOptions}>
						<div className={styles.searchBox}>
							<input
								ref={inputRef}
								type="text"
								value={dataToSearch}
								onChange={handleSearchText}
								placeholder="Buscar"
								className={styles.search}
							/>
						</div>
						<div className={styles.scrollDiv}>
							<li className={styles.listItemSeparator}></li>
							<li className={styles.listItem} onClick={() => selectCurrentData(extraOption)}>
								{extraOption.description}
							</li>
							{objectsInOrder?.map((item) => (
								<li key={item?.value} className={styles.listItem} onClick={() => selectCurrentData(item)}>
									{item?.description}
								</li>
							))}
						</div>
					</div>
				)}
			>
				<div className={styles.btn} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
					<span className={styles.btnText}>{selectedData !== '' ? selectedData : placeholder}</span>
					<i className={`${styles.btnIcon} fas fa-chevron-down`}></i>
				</div>
			</Popover>
		</div>
	);
};

Selector.prototype = {
	nameForm: PropTypes.string.isRequired,
	data: PropTypes.array,
	extraOption: PropTypes.object,
	placeholder: PropTypes.string.isRequired,
	onSelectOption: PropTypes.func.isRequired,
	defaultOptionValue: PropTypes.string,
};

Selector.defaultProps = {
	nameForm: '',
	data: [],
	extraOption: {},
	placeholder: '',
	onSelectOption: () => {},
	defaultOptionValue: '',
};

export default Selector;
