import axios from 'axios';

export const SPRITES = {
	MALE: 'male',
	FEMALE: 'female',
	HUMAN: 'human',
	IDENTICON: 'identicon',
	INITIALS: 'initials',
	BOTTTS: 'bottts',
	AVATAAARS: 'avataaars',
	JDENTICON: 'jdenticon',
	GRIDY: 'gridy',
	MICAH: 'micah',
};
const sprites = [
	'male',
	'female',
	'human',
	'identicon',
	'initials',
	'bottts',
	'avataaars',
	'jdenticon',
	'gridy',
	'micah',
];

const seed = 'Mzg4MGZkYTctYzI2Yy01ZDMyLWIzYTAtMDcyYTVjMTNiYjI0LWY0MGFiYTkwLTgyN2Q';
const diceBearUrl = (sprite) => `https://avatars.dicebear.com/api/${sprite}/${seed}.svg`;

export const stringToSvg = (image) => (
	<img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} alt='' />
);

export const DiceBear = {
	generateAvatar: async (sprite) => await axios.get(diceBearUrl(sprite)),
	randomGenerateAvatar: async () =>
		await axios.get(diceBearUrl(sprites[Math.floor(Math.random() * sprites.length)])),
};
