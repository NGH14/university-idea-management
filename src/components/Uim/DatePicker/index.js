import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { InputLabel, TextField } from '@mui/material';
import enLocale from 'date-fns/locale/en-GB';

export function UimDatePicker({
	dynamic: { value, touched, error },
	required = false,
	propName,
	onChange,
	variant,
	label,
}) {
	return (
		<>
			<InputLabel required={required} htmlFor={propName}>
				{label}
			</InputLabel>
			<LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
				<DatePicker
					fullWidth
					disableFuture
					id={propName}
					value={value}
					name={propName}
					variant={variant}
					onChange={onChange}
					error={error && touched}
					helperText={error && error}
					renderInput={(params) => <TextField fullWidth {...params} />}
				/>
			</LocalizationProvider>
		</>
	);
}
