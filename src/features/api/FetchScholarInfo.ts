const FetchScholarInfo = async (query: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/execute?params=scholar`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if (!response.ok) {
			throw new Error('論文の取得に失敗しました');
		}

		const data = await response.json();

		return data;
	} catch (error) {
		return { 'error': error };
	}
}

export default FetchScholarInfo;