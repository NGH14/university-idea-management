import { axioc, sleep, toastMessages } from 'common';
import { toast } from 'react-toastify';

export const CrudRequests = {
	create: ({ entityName, path, value, renderSuccess }) =>
		toast.promise(
			axioc.post(path, value).then(() => sleep(700)),
			{
				pending: toastMessages.WAIT,
				error: toastMessages.errs.added(entityName),
				success: {
					render() {
						renderSuccess();
						return toastMessages.succs.added(entityName);
					},
				},
			},
		),
	update: ({ entityName, path, value, renderSuccess }) =>
		toast.promise(
			axioc
				.put(`${path}/${value?.id}`, {
					name: value?.name,
				})
				.then(() => sleep(700)),
			{
				pending: toastMessages.WAIT,
				error: toastMessages.errs.edited(entityName),
				success: {
					render() {
						renderSuccess();
						return toastMessages.succs.edited(entityName);
					},
				},
			},
		),
	delete: ({ entityName, path, id, renderSuccess }) =>
		toast.promise(
			axioc.delete(`${path}/${id}`).then(() => sleep(700)),
			{
				pending: toastMessages.WAIT,
				error: toastMessages.errs.added(entityName),
				success: {
					render() {
						renderSuccess();
						return toastMessages.errs.deleted(entityName);
					},
				},
			},
		),
};
