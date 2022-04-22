import { RSA } from 'common/env';
import * as forge from 'node-forge';

const rsa = forge.pki.publicKeyFromPem(RSA.PUBLIC_KEY);

export const RsaHelper = {
	encryptPayload: (str) => window.btoa(rsa.encrypt(str)),
};
