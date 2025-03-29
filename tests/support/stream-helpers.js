export async function streamToArray (stream)
{
	const array = [];

	if (!stream.readable)
	{
		return array;
	}

	for await (const chunk of stream)
	{
		array.push(chunk);
	}

	return array;
}
