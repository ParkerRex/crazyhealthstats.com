
import { readRemoteFile } from 'react-papaparse';

export const parseCSV = async (filePath: string) => {
	return new Promise((resolve, reject) => {
		readRemoteFile(filePath, {
			header: true,
			download: true,
			complete: (results) => {
				resolve(results.data);
			},
			error: (error) => {
				reject(error);
			}
		});
	});
};

