/* eslint-disable react-hooks/exhaustive-deps */
import CreateIdeaForm from 'components/Idea/CreateIdeaForm';
import * as React from 'react';
import { useEffect, useState } from 'react';

import UpdateIdeaForm from '../UpdateIdeaForm';

const ModalIdea = (props) => {
	const { onCreate, onUpdate, visible, onClose, action, exIdeaData, specifySub } =
		props;

	const renderForm = () => {
		switch (action) {
			case 'create':
				return (
					<CreateIdeaForm
						visible={visible}
						onClose={() => onClose()}
						onCreate={onCreate}
						submission={
							specifySub === true ? exIdeaData?.submission?.id : null
						}
					/>
				);
			case 'update':
				return (
					<UpdateIdeaForm
						visible={visible}
						onClose={() => onClose()}
						onUpdate={onUpdate}
						initialValue={exIdeaData}
						specifySub={specifySub ?? false}
					/>
				);
			default:
				return;
		}
	};

	return renderForm();
};

export default React.memo(ModalIdea);
