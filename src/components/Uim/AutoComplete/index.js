import {
	Autocomplete,
	Chip,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

export const UimAutoComplete = {
	Tag: ({
		capitalize,
		label,
		onBlur,
		options,
		propName,
		variant,
		onChange,
		defaultValue,
		required = false,
		dynamic: { value, error, touched },
	}) => (
		<>
			<InputLabel htmlFor={propName} required={required}>
				{label}
			</InputLabel>
			<Autocomplete
				multiple
				fullWidth
				onChange={onChange}
				onBlur={onBlur}
				id={`${propName}_filled_multi`}
				defaultValue={defaultValue ?? []}
				options={options?.map((option) => option?.name)}
				ChipProps={capitalize ? { style: { textTransform: 'capitalize' } } : {}}
				ListboxProps={{
					style: {
						textTransform: capitalize ? 'capitalize' : 'none',
					},
				}}
				renderTags={(value, getTagProps) =>
					value.map((option, index) => (
						<Chip
							{...getTagProps({ index })}
							label={option}
							size='small'
							style={{ backgroundColor: '#8b8c9480' }}
						/>
					))
				}
				renderInput={(params) => (
					<TextField
						{...params}
						id={`${propName}_input_filled_multi`}
						name={propName}
						value={value}
						variant={variant}
						defaultValue=''
						error={touched && Boolean(error)}
						placeholder={
							value == null || value?.length === 0
								? `-- ${label.toLowerCase()} --`
								: ''
						}
					/>
				)}
				renderValue={
					value !== ''
						? undefined
						: () => (
								<placeholder>
									<em
										style={{
											textTransform: 'lowercase',
											opacity: 0.6,
											fontSize: 14,
										}}
									>
										-- {label} --
									</em>
								</placeholder>
						  )
				}
			/>
			<FormHelperText error>{touched && error}</FormHelperText>
		</>
	),
	Select: ({
		label,
		onBlur,
		options,
		propName,
		variant,
		onChange,
		getOptionLabel,
		defaultValue = null,
		required = false,
		dynamic: { value, error, touched },
	}) => {
		console.log(123123, defaultValue);
		return (
			<>
				<InputLabel htmlFor={propName} required={required}>
					{label}
				</InputLabel>
				<Autocomplete
					fullWidth
					id={`${propName}_filled_multi`}
					onBlur={onBlur}
					onChange={onChange}
					ChipProps={{ style: { textTransform: 'capitalize' } }}
					ListboxProps={{ style: { textTransform: 'capitalize' } }}
					defaultValue={defaultValue}
					options={options}
					getOptionLabel={getOptionLabel}
					renderInput={(params) => (
						<TextField
							{...params}
							id={`${propName}_input_filled_multi`}
							name={propName}
							value={value ?? ''}
							variant={variant}
							error={touched && Boolean(error)}
							placeholder={`-- ${label.toLowerCase()} --`}
						/>
					)}
				/>
				<FormHelperText error>{touched && error}</FormHelperText>
			</>
		);
	},
	DropDown: ({
		label,
		onBlur,
		options,
		propName,
		onChange,
		variant,
		required = false,
		dynamic: { value, error, touched },
	}) => (
		<>
			<InputLabel htmlFor={propName} required={required}>
				{label}
			</InputLabel>
			<Select
				select
				fullWidth
				displayEmpty
				variant={variant}
				labelId={propName}
				id={propName}
				name={propName}
				value={value ?? ''}
				onBlur={onBlur}
				onChange={onChange}
				error={touched && Boolean(error)}
				MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}
				style={
					value != null ? { textTransform: 'capitalize' } : { color: '#959596' }
				}
				renderValue={
					value !== ''
						? undefined
						: () => (
								<placeholder>
									<em
										style={{
											textTransform: 'lowercase',
											opacity: 0.6,
											fontSize: 14,
										}}
									>
										-- {label} --
									</em>
								</placeholder>
						  )
				}
			>
				{options?.map((option) => (
					<MenuItem
						style={{ textTransform: 'capitalize' }}
						value={option?.name}
					>
						{option?.name}
					</MenuItem>
				))}
			</Select>
			<FormHelperText error>{touched && error}</FormHelperText>
		</>
	),
};
