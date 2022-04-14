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
				defaultValue={[]}
				id={`${propName}_filled_multi`}
				onChange={onChange}
				onBlur={onBlur}
				options={options?.map((option) => option?.name)}
				ChipProps={capitalize ? { style: { textTransform: 'capitalize' } } : {}}
				ListboxProps={
					capitalize ? { style: { textTransform: 'capitalize' } } : {}
				}
				renderTags={(value, getTagProps) =>
					value.map((option, index) => (
						<Chip {...getTagProps({ index })} label={option} size='small' />
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
						placeholder={`-- ${label.toLowerCase()} --`}
						helperText={touched && error}
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
		required = false,
		dynamic: { value, error, touched },
	}) => {
		return (
			<>
				<InputLabel htmlFor={propName} required={required}>
					{label}
				</InputLabel>
				<Autocomplete
					fullWidth
					onChange={onChange}
					onBlur={onBlur}
					options={options?.map((option) => option?.name)}
					ListboxProps={{ style: { textTransform: 'capitalize' } }}
					ChipProps={{ style: { textTransform: 'capitalize' } }}
					id={`${propName}_filled_multi`}
					renderInput={(params) => (
						<TextField
							{...params}
							id={`${propName}_input_filled_multi`}
							name={propName}
							value={value}
							variant={variant}
							defaultValue=''
							error={touched && Boolean(error)}
							placeholder={`-- ${label.toLowerCase()} --`}
							helperText={touched && error}
						/>
					)}
				/>
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
