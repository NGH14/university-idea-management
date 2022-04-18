export function toReadableFileSize(bytes) {
	const thresh = 1000;
	const dp = 1;

	if (Math.abs(bytes) < thresh) {
		return bytes + ' B';
	}

	const units = ['kB', 'MB'];

	let u = -1;
	const r = 10 ** dp;

	do {
		bytes /= thresh;
		++u;
	} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

	return bytes.toFixed(dp) + ' ' + units[u];
}
