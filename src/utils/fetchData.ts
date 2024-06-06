export async function fetchClientData(path: string) {
	const response = await fetch(path);
	if (!response.ok) {
		throw new Error(`Failed to fetch data from ${path}`);
	}
	const data = await response.json();
	return data;
}
