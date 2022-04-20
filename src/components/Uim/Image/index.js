import imgPlaceholder from 'assets/images/placeholder.jpg';
import React from 'react';

export const UimImage = React.memo(function Image({ src, alt, className }) {
	return (
		<img
			alt={alt}
			className={className}
			src={src}
			onError={({ currentTarget }) => {
				currentTarget.onerror = null;
				currentTarget.src = imgPlaceholder;
			}}
		/>
	);
});
